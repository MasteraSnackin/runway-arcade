# Technical Handover

## Current State

The workspace contains a local mirror of a Lovable deployed preview, not the original source tree.

Current mirror:

- Folder: `runway-arcade-local/`
- URL: `http://localhost:4173/`
- Preview: `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`
- Revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`
- Project ID: `868fe2dc-e74f-4b2b-a3ec-03cebe4a540b`

## Important Files

| File | Purpose |
| --- | --- |
| `runway-arcade-local/index.html` | Mirrored deployed HTML from Lovable, sanitised to remove preview badge/telemetry snippets. |
| `runway-arcade-local/assets/` | Current hashed CSS and JavaScript bundle assets. |
| `runway-arcade-local/server.js` | Small static server for local review. |
| `runway-arcade-local/scripts/sync-lovable-preview.js` | Repeatable sync command for Lovable preview URLs. |
| `runway-arcade-local/mirror-info.json` | Current preview URL, project ID, revision and sync timestamp. |
| `docs/` | Product and technical specification pack. |
| `materials/` | Collateral and handover material. |

## Local Commands

Run:

```sh
cd runway-arcade-local
npm start
```

Sync current preview:

```sh
cd runway-arcade-local
npm run sync -- https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm
```

## Source Limitation

The Lovable preview link exposes a tokenised deployed app, not editable Git or project source. The local mirror therefore contains minified or bundled artefacts. Avoid making product changes directly inside the bundle unless the change is a temporary demo patch.

The static server includes read-only local fallback responses for `/api/xero/status` and `/api/xero/live-dataset`. These exist only so the mirrored deployed bundle can render a clean demo fallback state without a live Xero backend.

Preferred continuation paths:

1. Export or recover the original Lovable/Git source.
2. Rebuild using `docs/19-lovable-rebuild-pack.md`.
3. Build a clean React/TypeScript source tree using the product and technical docs as specifications.

## Recommended Production Architecture

- Frontend: React + TypeScript dashboard.
- Backend: server-side API for Xero OAuth, token storage, finance helpers, AI orchestration and audit.
- Data layer: persistent database for organisations, approvals, audit events and token metadata.
- Xero adapter: interface that can read invoices, bills, contacts, payments, bank accounts and reports.
- AI layer: bounded tool registry with deterministic finance tools and evidence rendering.
- Safety layer: explicit approval state machine before any write-capable action.

## Implementation Priorities

1. Recreate source-level application shell.
2. Port fixture data and scenario switching.
3. Implement shared finance calculation helpers.
4. Implement evidence card renderer with a whitelist of display fields.
5. Implement approval queue and append-only audit trail.
6. Add Xero OAuth read adapter.
7. Add AI tool orchestration server-side.
8. Only then consider write-capable actions behind additional approval, roles, scopes and audit controls.

## Risks To Track

- Users may mistake simulation for real action.
- A live Xero implementation could request broader scopes than needed.
- AI responses could overstate certainty unless evidence and assumptions are shown.
- Calculations could diverge if dashboard and co-pilot use separate logic.
- The mirror could become stale if Lovable preview revisions change.

## Verification Completed In This Chat

- Local sync succeeded for the current preview.
- Local server restarted at `http://localhost:4173/`.
- In-app browser reload confirmed the current app renders.
- Runway Arcade heading, Xero co-pilot content, scenario tabs and MAYDAY controls were present.
- Local Xero fallback stubs removed the previous static-mirror JSON parse warnings.
- No browser warnings or errors were observed after the latest reload.
