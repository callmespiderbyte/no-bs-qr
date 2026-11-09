# No BS QR: Google Apps Script setup

Runs No BS QR as a private web app inside the HYROX Google Workspace. Only people signed in with a HYROX account can open it.

## Files

- `Code.gs`: serves the page and passes deep links (`?type=`, `?format=`, `?open=`) on to it.
- `Index.html`: the full generator, built from the site's `index.html`.
- `appsscript.json`: manifest. Runs as the owner, access limited to your Google Workspace domain.

## Set it up (about 5 minutes, once)

1. Go to script.google.com while signed in with your HYROX account and click **New project**. Name it "No BS QR".
2. **Code.gs:** replace the starter code with the contents of `Code.gs`.
3. **Index.html:** click **+** next to Files › **HTML**, name it `Index` (Apps Script adds .html), and paste in `Index.html`.
4. **Manifest:** Project Settings (gear icon) › tick **Show "appsscript.json" manifest file in editor**. Back in the editor, replace `appsscript.json` with the provided one.
5. **Deploy:** **Deploy › New deployment** › type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone within HYROX**
   - Click **Deploy**, approve the one-time authorisation prompt if asked, and copy the **Web app URL** (ends in `/exec`).
6. Share that URL with the team. Bookmark it.

## Deep links

Add these to the `/exec` URL to open the tool ready to go:

- `?type=wifi` (also `vcard`, `event`, `email`, `whatsapp`, `sms`, `tel`, `geo`, `text`)
- `?format=svg` (or `png`, `jpg`, `webp`, `pdf`)
- `?open=logo` opens the logo panel, `?open=border` turns the border on

Combine with `&`, for example `…/exec?type=wifi&format=pdf`.

## Updating later

1. Make changes in `src/template.html` (or `scripts/pages.mjs`), then run `node scripts/build.mjs` and `node scripts/build-apps-script.mjs`.
2. Paste the new `apps-script/Index.html` over the old one in the Apps Script editor.
3. **Deploy › Manage deployments** › pencil icon › Version: **New version** › **Deploy**. The URL stays the same.

## Differences from nobs-qr.vercel.app

- English only. No language switch and no links to the other use-case pages.
- No search engine tags; the page is private anyway.
- If the browser blocks clipboard access inside Google's frame, Copy shows a message; Download always works.
- Everything still runs in the browser. Nothing you type or upload reaches the Apps Script project or Google Drive.
