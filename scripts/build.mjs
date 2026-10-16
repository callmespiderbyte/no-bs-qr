// Builds every page of the site from src/template.html and scripts/pages.mjs.
// Run from the repo root:  node scripts/build.mjs
// Output (committed, so Vercel needs no build step):
//   index.html, <slug>/index.html, de/index.html, sitemap.xml, and the page list in llms.txt

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, PAGES, STRINGS } from './pages.mjs';
import { DE_UI } from './de-ui.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE = readFileSync(join(ROOT, 'src/template.html'), 'utf8');
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlOf = (p) => SITE + '/' + (p.slug ? p.slug + '/' : '');
const pathOf = (p) => '/' + (p.slug ? p.slug + '/' : '');
const home = PAGES.find((p) => p.slug === '');
const de = PAGES.find((p) => p.slug === 'de');
const enPages = PAGES.filter((p) => p.lang === 'en');

// Translate the interface. Only text nodes, attribute values and JS strings are touched.
function translateUI(html, dict) {
  const start = html.indexOf('<body>');
  let head = html.slice(0, start), body = html.slice(start);
  for (const [en, to] of dict) {
    const forms = [[`>${en}<`, `>${to}<`], [`>${en}<span`, `>${to}<span`], [`> ${en}<`, `> ${to}<`], [`="${en}"`, `="${to}"`], [`'${en}'`, `'${to}'`]];
    let hit = false;
    for (const [a, b] of forms) {
      if (body.includes(a)) { body = body.split(a).join(b); hit = true; }
    }
    if (!hit) throw new Error(`German UI: "${en}" not found in the template. Update scripts/de-ui.mjs.`);
  }
  return head + body;
}

function alternates(p) {
  if (p !== home && p !== de) return '';
  return [
    `<link rel="alternate" hreflang="en" href="${urlOf(home)}">`,
    `<link rel="alternate" hreflang="de" href="${urlOf(de)}">`,
    `<link rel="alternate" hreflang="x-default" href="${urlOf(home)}">`,
  ].join('\n');
}

function headMeta(p, t) {
  const ogTitle = p === home ? 'No BS QR: Free QR Code Generator' : `${p.h1} | No BS QR`;
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}">`,
    `<meta name="keywords" content="${esc(p.keywords)}">`,
    `<meta property="og:title" content="${esc(ogTitle)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${urlOf(p)}">`,
    `<meta property="og:locale" content="${t.locale}">`,
    `<meta name="twitter:title" content="${esc(ogTitle)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<link rel="canonical" href="${urlOf(p)}">`,
    alternates(p),
  ].filter(Boolean).join('\n');
}

function header(p) {
  const join = p.leadJoin ?? ' ';
  return [
    `          <h1 class="vh">${esc(p.h1)}: No BS QR</h1>`,
    `          <p class="eyebrow" aria-hidden="true">${esc(p.eyebrow)}</p>`,
    `          <p class="lead"><span class="ln">${esc(p.lead[0])}</span>${join}<span class="ln">${esc(p.lead[1])}</span></p>`,
    `          <p class="sub"><span>${esc(p.sub[0])}</span> <span>${esc(p.sub[1])}</span></p>`,
  ].join('\n');
}

function sections(p) {
  const out = [];
  if (p.about) {
    out.push(`  <section class="faq about" aria-labelledby="abouth">
    <h2 id="abouth">${esc(p.about.h2)}</h2>
${p.about.p.map((x) => `    <p>${esc(x)}</p>`).join('\n')}
  </section>`);
  }
  out.push(`  <section class="faq howto" aria-labelledby="howh">
    <h2 id="howh">${esc(p.howto.h2)}</h2>
    <ol class="faq-grid steps">
${p.howto.steps.map(([h, t]) => `      <li><h3>${esc(h)}</h3><p>${esc(t)}</p></li>`).join('\n')}
    </ol>
  </section>`);
  out.push(`  <section class="faq" aria-labelledby="faqh">
    <h2 id="faqh">${esc(p.faqTitle)}</h2>
    <div class="faq-grid">
${p.faq.map(([q, a]) => `      <div><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join('\n')}
    </div>
  </section>`);
  return out.join('\n\n');
}

function more(p, t) {
  const links = enPages.map((x) => `<li><a href="${pathOf(x)}"${x === p ? ' aria-current="page"' : ''}${p.lang !== 'en' ? ' hreflang="en"' : ''}>${esc(x.nav)}</a></li>`);
  links.push(`<li><a href="${pathOf(de)}" hreflang="de" lang="de"${p === de ? ' aria-current="page"' : ''}>Deutsch</a></li>`);
  return `  <nav class="more" aria-labelledby="moreh">
    <h2 id="moreh">${esc(t.more)}</h2>
    <ul>
      ${links.join('\n      ')}
    </ul>
  </nav>`;
}

function langFlip(p) {
  const toDe = p.lang !== 'de';
  return toDe
    ? `<a class="langflip" href="/de/" hreflang="de" lang="de" data-from="EN" data-to="DE" title="Auf Deutsch"><canvas width="13" height="9" aria-hidden="true"></canvas><span class="cap">Deutsch</span></a>`
    : `<a class="langflip" href="/" hreflang="en" lang="en" data-from="DE" data-to="EN" title="In English"><canvas width="13" height="9" aria-hidden="true"></canvas><span class="cap">English</span></a>`;
}

function langSwitch(p) {
  return p.lang === 'de'
    ? `<a class="lang" href="/" hreflang="en" lang="en">English</a>`
    : `<a class="lang" href="/de/" hreflang="de" lang="de">Deutsch</a>`;
}

function jsonld(p, t) {
  const U = SITE + '/';
  const url = urlOf(p);
  const graph = [
    { '@type': 'WebSite', '@id': U + '#website', url: U, name: 'No BS QR', alternateName: ['No BS QR Code Generator'], inLanguage: ['en-GB', 'de'], publisher: { '@id': U + '#maker' } },
    { '@type': 'Organization', '@id': U + '#maker', name: 'Jomiro Eming Design Lab', url: 'https://jomiro.de', sameAs: ['https://github.com/callmespiderbyte'] },
    {
      '@type': 'WebApplication', '@id': U + '#app', name: 'No BS QR', url: U,
      description: 'Free QR code generator with no sign-up, no watermark and no expiry. Runs entirely in the browser, so nothing is uploaded or stored.',
      applicationCategory: 'DesignApplication', applicationSubCategory: 'QR code generator',
      operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true, inLanguage: ['en-GB', 'de'], image: U + 'og.png', screenshot: U + 'og.png',
      license: 'https://opensource.org/licenses/MIT', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      creator: { '@id': U + '#maker' },
      featureList: [
        'QR codes for links, text, email, Wi-Fi, contact cards (vCard), calendar events, phone calls, SMS, WhatsApp and map locations',
        'UTM tracking parameters for links', 'Logo in the centre with automatic high error correction',
        'Custom colours with transparent background or foreground', 'Padding presets or exact pixel padding',
        'Optional border with thickness, colour and spacing', 'Module patterns: square, pixels, dots, rounded, diamonds, stars, vertical or horizontal bars', 'Corner styles: square, rounded or circle frames with square, rounded or dot centres', 'Error correction L, M, Q or H',
        'Export to SVG, PNG, JPG, WEBP and vector PDF', 'Multi-format zip download', 'Copy to clipboard',
        'Input validation for links, emails, phone numbers and Wi-Fi passwords',
        'No sign-up, no watermark, static QR codes that never expire', 'Runs locally in the browser; nothing uploaded or stored',
      ],
    },
    { '@type': 'SoftwareSourceCode', name: 'No BS QR', codeRepository: 'https://github.com/callmespiderbyte/no-bs-qr', programmingLanguage: ['HTML', 'JavaScript'], license: 'https://opensource.org/licenses/MIT', targetProduct: { '@id': U + '#app' }, author: { '@id': U + '#maker' } },
    {
      '@type': 'WebPage', '@id': url + '#page', url, name: p.title, description: p.description, inLanguage: t.htmlLang,
      isPartOf: { '@id': U + '#website' }, about: { '@id': U + '#app' }, primaryImageOfPage: U + 'og.png',
      ...(p.slug ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}),
    },
    {
      '@type': 'HowTo', name: p.howto.h2, totalTime: 'PT1M', inLanguage: t.htmlLang, tool: { '@type': 'HowToTool', name: 'No BS QR' },
      step: p.howto.steps.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
    },
    {
      '@type': 'FAQPage', '@id': url + '#faq', inLanguage: t.htmlLang,
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
  if (p.slug) {
    graph.push({
      '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'No BS QR', item: U },
        { '@type': 'ListItem', position: 2, name: p.h1, item: url },
      ],
    });
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

function render(p) {
  const t = STRINGS[p.lang];
  let html = TEMPLATE;
  if (p.lang === 'de') html = translateUI(html, DE_UI);
  const attrs = [
    p.type && p.type !== 'url' ? ` data-default-type="${p.type}"` : '',
    p.format ? ` data-default-format="${p.format}"` : '',
    p.open ? ` data-default-open="${p.open}"` : '',
  ].join('');
  const fill = {
    LANG: t.htmlLang, HTML_ATTRS: attrs, HEAD_META: headMeta(p, t),
    OG_ALT: `<meta property="og:image:alt" content="${esc(t.ogAlt)}">`,
    JSONLD: jsonld(p, t), HEADER: header(p), SECTIONS: sections(p), MORE: more(p, t),
    LANG_FLIP: langFlip(p), BYLINE: esc(t.byline), PRIVACY: esc(t.privacy), GITHUB: esc(t.github), LANG_SWITCH: langSwitch(p),
  };
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in fill)) throw new Error(`No value for {{${k}}}`);
    return fill[k];
  });
  if (/\{\{\w+\}\}/.test(html)) throw new Error('Unfilled placeholder in ' + (p.slug || 'home'));
  return html;
}

// Pages
for (const p of PAGES) {
  const file = join(ROOT, p.slug ? join(p.slug, 'index.html') : 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(p));
  console.log('wrote', p.slug || '(home)');
}

// Sitemap, with language alternates for the English and German homepages
const alt = `
    <xhtml:link rel="alternate" hreflang="en" href="${urlOf(home)}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${urlOf(de)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(home)}"/>`;
const urls = PAGES.map((p) => `  <url>
    <loc>${urlOf(p)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === home ? '1.0' : '0.8'}</priority>${p === home || p === de ? alt : ''}
  </url>`);
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);
console.log('wrote sitemap.xml');

// Page list in llms.txt
const llmsPath = join(ROOT, 'llms.txt');
let llms = readFileSync(llmsPath, 'utf8');
const block = `<!-- pages:start -->
## Pages

${PAGES.map((p) => `- [${p.h1}](${urlOf(p)}): ${p.description}`).join('\n')}
<!-- pages:end -->`;
llms = /<!-- pages:start -->[\s\S]*<!-- pages:end -->/.test(llms)
  ? llms.replace(/<!-- pages:start -->[\s\S]*<!-- pages:end -->/, block)
  : llms.replace('## Links', block + '\n\n## Links');
writeFileSync(llmsPath, llms);
console.log('updated llms.txt');
