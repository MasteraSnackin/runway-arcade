# Project Provenance And Update Log

## Summary

This workspace was built from Lovable preview links shared in the chat. The links exposed deployed preview bundles, not original editable project source. The local app is therefore a mirror used for review, documentation and rebuild planning.

## Current State

- Current preview: `https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm`
- Current local folder: `runway-arcade-local/`
- Current local URL: `http://localhost:4173/`
- Current revision: `d6b609f0030ef666ff7958e08c7838e3cfc3ee20`
- Current asset files:
  - `assets/index-Bugp4WXB.js`
  - `assets/routes-BHZThtw9.js`
  - `assets/styles-HrK71RAl.css`

## Timeline

### Initial Local Mirror

The first preview shared was:

```text
https://lovable.dev/preview/8MIGZbXsIhyYDnbqNN0H8AoLjBzeUR22
```

A local mirror was created in:

```text
runway-arcade-local/
```

The mirror included:

- downloaded deployed HTML
- downloaded CSS and JavaScript bundle assets
- favicon
- `server.js`
- `package.json`
- `mirror-info.json`
- `README.md`

The local app was verified at:

```text
http://localhost:4173/
```

### First Update Check

The upstream Lovable project revision was checked and an update was found:

```text
07f65fb94fbfb62d09d16c4925aa5bb8f8cd7c36
```

The local mirror was refreshed and stale hashed assets were pruned.

### Sync Script Added

A repeatable sync script was added:

```text
runway-arcade-local/scripts/sync-lovable-preview.js
```

It:

- accepts a Lovable preview URL
- follows the tokenised preview redirect
- reads the deployed revision
- downloads current assets
- removes Lovable preview-only badge/telemetry snippets
- writes `mirror-info.json`

### Current Preview Update

The user later shared the updated preview URL duplicated without a separator:

```text
https://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozmhttps://lovable.dev/preview/9PwGxwRjJf0sZ7tbEsUsruPWSBJYRozm
```

The sync script was updated to normalise that input and extract the first valid Lovable preview URL.

The mirror was synced to:

```text
d6b609f0030ef666ff7958e08c7838e3cfc3ee20
```

The local server was restarted and verified at:

```text
http://localhost:4173/
```

The in-app browser verification confirmed:

- page title loaded
- Runway Arcade heading present
- Xero co-pilot content present
- scenario tabs present
- MAYDAY controls present
- no Lovable badge present
- no browser warnings or errors after reload

### Local Fallback Stub

The current deployed bundle fetches `/api/xero/status` and `/api/xero/live-dataset`. In a pure static mirror those paths returned `index.html`, which made the UI show JSON parse errors. The local `server.js` now returns read-only demo fallback JSON for those two endpoints so the app presents a clean `Using demo fallback` state without implying a live Xero connection.

## Known Unknowns

- Original Lovable source is still unavailable.
- Production stack is inferred, not confirmed.
- Live Xero OAuth is not connected in the local mirror.
- Xero write capability is not part of the MVP and should remain disabled until separately approved.

## Recommended Next Action

For real development, use this workspace as a specification and demo artefact. Continue either by exporting the original Lovable/Git source or by rebuilding from:

- `docs/19-lovable-rebuild-pack.md`
- `docs/12-implementation-plan.md`
- `materials/technical-handover.md`
