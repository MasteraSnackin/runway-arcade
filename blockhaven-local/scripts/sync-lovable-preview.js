#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const defaultPreviewUrl = "https://lovable.dev/preview/TYhH7O7Qgaw7vADijhV1XLv7wyAKD9E1";
const previewUrl = normalisePreviewUrl(
  process.argv[2] ?? process.env.LOVABLE_PREVIEW_URL ?? defaultPreviewUrl
);
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const tempDir = mkdtempSync(join(tmpdir(), "lovable-preview-sync-"));
const cookiesPath = join(tempDir, "cookies.txt");
const previewHeadersPath = join(tempDir, "preview-headers.txt");
const htmlPath = join(tempDir, "app.html");

function curl(args, options = {}) {
  return execFileSync("curl", ["--silent", "--show-error", "--fail", ...args], {
    encoding: options.encoding ?? "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "inherit"]
  });
}

function normalisePreviewUrl(rawValue) {
  const value = String(rawValue).trim();
  const prefix = "https://lovable.dev/preview/";
  const start = value.indexOf(prefix);
  if (start === -1) {
    throw new Error("Expected a Lovable preview URL.");
  }

  const remaining = value.slice(start);
  const duplicateStart = remaining.indexOf(prefix, prefix.length);
  const candidate = duplicateStart === -1 ? remaining.split(/\s/)[0] : remaining.slice(0, duplicateStart);
  return candidate.replace(/[),.;]+$/, "");
}

function readHeaders(filePath) {
  return readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function headerValue(headers, name) {
  const prefix = `${name.toLowerCase()}:`;
  const line = headers.find((item) => item.toLowerCase().startsWith(prefix));
  return line ? line.slice(line.indexOf(":") + 1).trim() : "";
}

function resolvePreviewTarget() {
  curl(["-D", previewHeadersPath, "-o", "/dev/null", previewUrl]);

  const location = headerValue(readHeaders(previewHeadersPath), "location");
  if (!location) {
    throw new Error("Lovable preview did not return a redirect location.");
  }

  const redirectUrl = new URL(location);
  const encodedPreviewUrl = new URLSearchParams(redirectUrl.hash.slice(1)).get("preview_url");
  if (!encodedPreviewUrl) {
    throw new Error("Lovable redirect did not include a preview_url fragment.");
  }

  const appUrl = new URL(decodeURIComponent(encodedPreviewUrl));
  const token = appUrl.searchParams.get("__lovable_token");
  if (!token) {
    throw new Error("Lovable app URL did not include an auth token.");
  }

  const projectId = appUrl.hostname.match(/^id-preview--(.+)\.lovable\.app$/)?.[1] ?? "unknown";
  return { appOrigin: appUrl.origin, projectId, token };
}

function sanitiseHtml(html) {
  return html
    .replace(/<script\s+defer\s+src="\/__l5e\/events\.js"[^>]*><\/script>/g, "")
    .replace(/<script[^>]+src="https:\/\/cdn\.gpteng\.co\/lovable\.js"[^>]*><\/script>/g, "")
    .replace(/<style>\s*@font-face[\s\S]*?#lovable-badge[\s\S]*?<\/style>\s*/g, "")
    .replace(/<aside\s+id="lovable-badge"[\s\S]*?<\/script>\s*(?=<\/body>)/g, "");
}

function referencedAssets(html) {
  return [
    ...new Set(
      [...html.matchAll(/(?:href|src)="\/(assets\/[^"?#]+)/g)].map((match) => match[1])
    )
  ].sort();
}

function downloadFile(url, destination) {
  mkdirSync(dirname(destination), { recursive: true });
  curl(["-b", cookiesPath, url, "-o", destination], { stdio: ["ignore", "ignore", "inherit"] });
}

try {
  const { appOrigin, projectId, token } = resolvePreviewTarget();
  const authUrl = `${appOrigin}/?__lovable_token=${encodeURIComponent(token)}&__lovable_badge=share-preview`;

  const revisionHeaders = curl(["-I", authUrl])
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const revision = headerValue(revisionHeaders, "x-lovable-project-revision") || "unknown";

  curl(["-c", cookiesPath, authUrl, "-o", join(tempDir, "auth.html")]);
  curl(["-b", cookiesPath, `${appOrigin}/?__lovable_badge=share-preview`, "-o", htmlPath]);

  const html = sanitiseHtml(readFileSync(htmlPath, "utf8"));
  const assets = referencedAssets(html);
  if (assets.length === 0) {
    throw new Error("No bundled assets were found in the Lovable HTML.");
  }

  const assetsDir = join(projectRoot, "assets");
  rmSync(assetsDir, { recursive: true, force: true });
  mkdirSync(assetsDir, { recursive: true });

  for (const asset of assets) {
    downloadFile(`${appOrigin}/${asset}`, join(projectRoot, asset));
  }
  downloadFile(`${appOrigin}/favicon.ico`, join(projectRoot, "favicon.ico"));

  writeFileSync(join(projectRoot, "index.html"), html);
  writeFileSync(
    join(projectRoot, "mirror-info.json"),
    `${JSON.stringify(
      {
        sourcePreviewUrl: previewUrl,
        projectId,
        revision,
        updatedAt: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
        note: "Local mirror of the deployed Lovable preview bundle; editable source was not exposed by the preview link."
      },
      null,
      2
    )}\n`
  );

  console.log(`Synced Lovable preview revision ${revision}`);
  console.log(`Downloaded ${assets.length} asset files`);
} finally {
  if (existsSync(tempDir)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
}
