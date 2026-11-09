/**
 * No BS QR as a Google Apps Script web app.
 * Serves Index.html, and passes deep links (?type=wifi, ?format=svg, ?open=logo)
 * on to the page, because the page runs in Google's frame and cannot see the URL itself.
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  var clean = function (v) { return String(v || '').toLowerCase().replace(/[^a-z-]/g, '').slice(0, 20); };
  var attrs = '';
  if (p.type) attrs += ' data-default-type="' + clean(p.type) + '"';
  if (p.format) attrs += ' data-default-format="' + clean(p.format) + '"';
  if (p.open) attrs += ' data-default-open="' + clean(p.open) + '"';

  var html = HtmlService.createHtmlOutputFromFile('Index').getContent()
    .replace('<html lang="en-GB">', '<html lang="en-GB"' + attrs + '>');

  return HtmlService.createHtmlOutput(html)
    .setTitle('No BS QR')
    .setFaviconUrl('https://nobs-qr.vercel.app/favicon-32.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}
