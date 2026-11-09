// Builds apps-script/Index.html from the English homepage for the Google Apps Script web app.
// Run after scripts/build.mjs:  node scripts/build-apps-script.mjs
// Removes what only makes sense on the public site (search tags, language switch, links to other pages)
// and keeps the tool itself unchanged.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let s = readFileSync(join(ROOT, 'index.html'), 'utf8');

const drop = (re, what) => {
  const before = s.length;
  s = s.replace(re, '');
  if (s.length === before) throw new Error('Apps Script build: could not find ' + what);
};

drop(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/, 'structured data');
drop(/<link rel="canonical"[^>]*>\n?/, 'canonical link');
s = s.replace(/<link rel="(?:alternate|icon|apple-touch-icon|manifest)"[^>]*>\n?/g, '');
s = s.replace(/<meta (?:name|property)="(?:description|keywords|robots|author|application-name|theme-color|og:[^"]*|twitter:[^"]*)"[^>]*>\n?/g, '');
s = s.replace(/<meta name="viewport"[^>]*>\n?/, ''); // Apps Script sets this in Code.gs
drop(/\s*<a class="langflip"[\s\S]*?<\/a>/, 'language switch');
drop(/\s*<nav class="more"[\s\S]*?<\/nav>/, 'page links');
drop(/\s*<a class="lang"[^>]*>[^<]*<\/a>/, 'footer language link');
s = s.replace(/<title>[^<]*<\/title>/, '<title>No BS QR</title>');

// Apps Script templates treat "<?" as code, so keep it out of the file even though we serve it raw.
s = s.split("'<?xml").join("'<'+'?xml");

if (!s.includes('<html lang="en-GB">')) throw new Error('Apps Script build: Code.gs expects <html lang="en-GB">');
writeFileSync(join(ROOT, 'apps-script/Index.html'), s);
console.log('wrote apps-script/Index.html', Math.round(s.length / 1024) + ' KB');
