# Local Development and Deployment

## Purpose

This document explains how to work with the current project files and how the production build should be run once an editable source tree exists.

## Current Workspace State

Observed files:

- `docs/` contains the MVP documentation pack.
- `materials/` contains submission, pitch, demo, handover, copy and provenance material.
- `runway-arcade-local/` contains a local mirror of the deployed Lovable preview bundle.

The local mirror is useful for demo review, but it is not the original editable source.

Current mirror provenance:

- Preview URL: `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`
- Project ID: `868fe2dc-e74f-4b2b-a3ec-03cebe4a540b`
- Deployed revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`
- Synced locally: `2026-07-04T15:01:19Z`

## Run the Local Preview Mirror

From the workspace root:

```sh
cd runway-arcade-local
npm start
```

Then open:

```text
http://localhost:4173
```

The mirror is expected to serve prebuilt HTML, CSS, and JavaScript assets.

The local server also returns read-only demo fallback JSON for:

- `/api/xero/status`
- `/api/xero/live-dataset`

These stubs prevent the static mirror from treating `index.html` as a failed JSON API response. They do not connect to Xero and do not write data.

## Sync The Lovable Preview Mirror

From the mirror folder:

```sh
npm run sync -- https://lovable.dev/preview/preview-id
```

The sync command accepts a Lovable preview URL, follows the tokenised preview redirect, downloads the current deployed assets, removes Lovable preview-only badge/telemetry snippets, replaces the local `assets/` folder, and writes `mirror-info.json`.

## Recommended Editable App Setup

If rebuilding or continuing the MVP in source form, create a normal application workspace rather than editing minified bundle assets.

Suggested commands will depend on the chosen stack. For a React/TypeScript implementation:

```sh
npm create vite@latest runway-arcade -- --template react-ts
cd runway-arcade
npm install
npm run dev
```

Then migrate the feature areas from the documentation:

- dashboard
- scenarios
- finance domain
- co-pilot
- approvals
- audit
- evidence
- Xero adapter

## Environment Variables

Production or live Xero development should use server-side environment variables.

```text
APP_BASE_URL=
DATABASE_URL=
SESSION_SECRET=
ENCRYPTION_KEY=
XERO_CLIENT_ID=
XERO_CLIENT_SECRET=
XERO_REDIRECT_URI=
XERO_SCOPES=
AI_MODEL=
AI_API_KEY=
LOG_LEVEL=
```

Do not expose these in frontend build-time variables unless they are explicitly public.

## Local Modes

| Mode | Description | Required Services |
| --- | --- | --- |
| Demo fixtures | Uses local scenario data only. | Web app. |
| Demo plus API | Uses local API and fixture adapter. | Web app, API. |
| Live Xero read | Uses OAuth tenant connection. | Web app, API, database, Xero app. |
| Production write | Future mode only. | Full approval, audit, and scope controls. |

## Development Scripts

Recommended scripts for the editable source project:

```json
{
  "scripts": {
    "dev": "run web and api locally",
    "build": "build all deployable packages",
    "test": "run unit and integration tests",
    "test:calculations": "run finance calculation tests",
    "test:evidence": "run evidence leakage tests",
    "lint": "run lint checks",
    "typecheck": "run TypeScript checks",
    "preview": "serve production build locally"
  }
}
```

## Smoke Test

Before any demo or deploy:

1. Open the app.
2. Load `cash_squeeze` scenario.
3. Confirm total cash is GBP 86,420.
4. Confirm runway is 8.6 weeks.
5. Click `Run cash radar`.
6. Confirm tool calls and evidence cards render.
7. Approve one simulated action.
8. Confirm audit event appears.
9. Export CSV.
10. Confirm no UI claims that a real Xero write occurred.

## Deployment Requirements

Minimum production environment:

- HTTPS only.
- Server-side OAuth callback route.
- Encrypted token storage.
- Persistent database.
- Secret management.
- Structured logs with redaction.
- Error reporting without raw financial payloads.
- Automated build, test, and deploy pipeline.

## Deployment Steps

1. Run tests.
2. Build web and API artefacts.
3. Run database migrations.
4. Deploy backend.
5. Deploy frontend.
6. Verify health endpoint.
7. Run smoke test.
8. Verify OAuth redirect URI matches deployment URL.
9. Verify Xero rate-limit and insufficient-scope handling.
10. Monitor logs after release.

## Rollback Plan

Rollback should be prepared before enabling live Xero mode.

1. Disable live Xero connection or writes with a feature flag.
2. Revert frontend to previous stable build.
3. Revert backend to previous stable build.
4. Do not delete audit records.
5. Preserve failed write events for investigation.
6. Notify users if any live data action was affected.

## Feature Flags

Recommended flags:

```text
ENABLE_LIVE_XERO_READS=false
ENABLE_XERO_WRITES=false
ENABLE_AI_COPILOT=true
ENABLE_AUDIT_EXPORT=true
ENABLE_EVIDENCE_PINNING=true
ENABLE_DEMO_SCENARIOS=true
```

Production default should keep `ENABLE_XERO_WRITES=false` until a separate approval.

## Known Local Limitations

- The local preview mirror may not support source-level edits.
- The current docs do not prove the production stack.
- Live Xero testing requires a Xero developer app and demo company or tenant.
- Exact scopes must be verified before creating the OAuth authorisation URL.
