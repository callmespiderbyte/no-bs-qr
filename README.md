# No BS QR: free QR code generator

A free QR code generator with no shitty branding, no hidden fees, no sign-up and no expiry.

A single-page QR code maker for links, plain text, email and Wi-Fi. It exports clean square-module codes as SVG, PNG, JPG, WEBP or PDF, and bundles several formats into one .zip.

## Private by design

- Everything runs in your browser. Your content is never uploaded.
- Nothing is stored. No cookies, no local storage, no analytics, no accounts.
- The only network requests are the open-source libraries and fonts the page loads (cdnjs and Google Fonts).

## Features

- Content types: link, text, email and Wi-Fi, plus contact card (vCard), calendar event, phone call, SMS, WhatsApp and location
- Optional UTM tracking on links, so scans show up in your own analytics without any redirect or third-party counter
- Optional logo in the centre (read locally, never uploaded), with error correction locked to H so it still scans
- Background and code colour, each with a transparent option, plus tonal presets
- Padding: none, slim, standard, roomy or an exact pixel value
- Error correction L, M, Q or H
- SVG as a single merged vector path, raster exports from 512 to 4096 px, vector PDF
- Multi-format download as a .zip

## Live

Deployed on Vercel from the `main` branch. Every push goes live automatically.

## Use it

Open `index.html` in any modern browser. No build step, no server.

To host it, import this repo on Vercel (no build settings needed) or drop `index.html` on any static host. `vercel.json` adds strict security headers.

## Built with

- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT)
- [JSZip](https://github.com/Stuk/jszip) (MIT or GPLv3)
- [jsPDF](https://github.com/parallax/jsPDF) (MIT)
- Bodoni Moda and Martian Mono via Google Fonts (SIL Open Font License)

## Licence

MIT. Use it, fork it, ship it.

Vibe-coded by [Jomiro Eming Design Lab](https://jomiro.de).
