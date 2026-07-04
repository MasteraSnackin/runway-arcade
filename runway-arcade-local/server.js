import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { existsSync, statSync, createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(body));
}

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requested = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  return join(root, requested === "/" ? "index.html" : requested);
}

const server = createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  const pathname = new URL(req.url, `http://localhost:${port}`).pathname;

  if (pathname === "/api/xero/status") {
    sendJson(res, 200, {
      connected: false,
      organisation: "Demo Company (UK)",
      detail: "Local mirror demo fallback",
      counts: {
        accounts: 3,
        bills: 6,
        contacts: 8,
        invoices: 5,
        transactions: 0
      }
    });
    return;
  }

  if (pathname === "/api/xero/live-dataset") {
    sendJson(res, 200, {
      connected: false,
      organisation: "Demo Company (UK)",
      fallbackReason: "Local mirror demo fallback",
      warnings: [],
      bankBalancesAvailable: false,
      bankBalancesEstimated: false,
      estimatedBaselineCents: 0,
      counts: {
        accounts: 3,
        bills: 6,
        invoices: 5,
        transactions: 0
      }
    });
    return;
  }

  if (pathname.startsWith("/__l5e/trackevents") || pathname.startsWith("/__l5e/replay")) {
    res.writeHead(202, { "content-type": "application/json; charset=utf-8" });
    res.end("{}");
    return;
  }

  let filePath = resolvePath(req.url);
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, "index.html");
  }

  const ext = extname(filePath);
  res.writeHead(200, {
    "cache-control": ext === ".html" ? "no-store" : "public, max-age=3600",
    "content-type": mimeTypes[ext] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Runway Arcade local mirror running at http://localhost:${port}`);
});
