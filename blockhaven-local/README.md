# Blockhaven Local Mirror

This folder is a local mirror of the Lovable preview bundle for `Blockhaven`.

The original editable Lovable/Git source was not exposed by the preview link. The files here are the deployed HTML, CSS and JavaScript assets fetched from the preview after its token-based auth flow.

Current mirrored preview:

```text
https://lovable.dev/preview/TYhH7O7Qgaw7vADijhV1XLv7wyAKD9E1
```

Current deployed revision is recorded in `mirror-info.json`.

Run locally:

```sh
npm start
```

Then open `http://localhost:4173`.

Check the Lovable preview for a newer deployed bundle and refresh this mirror:

```sh
npm run sync
```

To sync a different Lovable preview:

```sh
npm run sync -- https://lovable.dev/preview/preview-id
```

The sync command records the deployed preview revision in `mirror-info.json` and removes Lovable preview-only badge and telemetry scripts from the local HTML.
