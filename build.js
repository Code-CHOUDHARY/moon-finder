#!/usr/bin/env node
// Builds the whole static site into ./dist
'use strict';
const fs = require('fs');
const path = require('path');
const S = require('./src/astro');
const { computeAll, FESTIVALS } = require('./src/data');
const { CITIES, ALIASES } = require('./src/cities');
const U = require('./src/ui');
const P = require('./src/pages');
const ST = require('./src/static');

const t0 = Date.now();
// Settings: environment variables win; otherwise site.config.json (public IDs only — never put secrets there).
const fileCfg = fs.existsSync(path.join(__dirname, 'site.config.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'site.config.json'), 'utf8')) : {};
const pick = (envName, key) => (process.env[envName] || fileCfg[key] || '').trim();
const env = {
  SITE_URL: pick('SITE_URL', 'siteUrl'), BUILD_DATE: process.env.BUILD_DATE, REPO_URL: process.env.REPO_URL,
  ADSENSE_CLIENT: pick('ADSENSE_CLIENT', 'adsenseClient'), ADSENSE_SLOT: pick('ADSENSE_SLOT', 'adsenseSlot'),
  GA_ID: pick('GA_ID', 'gaId'), CF_BEACON_TOKEN: pick('CF_BEACON_TOKEN', 'cloudflareBeaconToken'), GSC_VERIFY: pick('GSC_VERIFY', 'googleSiteVerification'),
  CONTACT_EMAIL: pick('CONTACT_EMAIL', 'contactEmail'), AMAZON_TAG: pick('AMAZON_TAG', 'amazonTag'),
};
const siteUrl = new URL((env.SITE_URL || 'https://fullmoonfinder.com').replace(/\/+$/, '') + '/');
const now = env.BUILD_DATE ? new Date(env.BUILD_DATE + 'T06:00:00+05:30') : new Date();
const today = S.dayKey(now);
const y0 = Number(today.slice(0, 4));
const config = {
  origin: siteUrl.origin,
  base: siteUrl.pathname.replace(/\/$/, ''),
  adsClient: env.ADSENSE_CLIENT || '', adsSlot: env.ADSENSE_SLOT || '',
  gaId: env.GA_ID || '', cfToken: env.CF_BEACON_TOKEN || '', gscVerify: env.GSC_VERIFY || '',
  contactEmail: env.CONTACT_EMAIL || '', amazonTag: env.AMAZON_TAG || '', repoUrl: env.REPO_URL || 'https://github.com/Code-CHOUDHARY/moon-finder',
  policyDate: '9 November 2026',
  version: today.replace(/-/g, ''),
  buildLabel: today,
};
U.setConfig(config);

const OUT = path.join(__dirname, 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
const urls = [];
function write(p, html, { lang = 'en', index = true } = {}) {
  const rel = (lang === 'hi' ? '/hi' : '') + p;
  const file = path.join(OUT, rel.endsWith('/') ? rel + 'index.html' : rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (index) urls.push(config.origin + config.base + rel);
}

// ---------- Data ----------
const from = new Date(`${y0}-01-01T00:00:00+05:30`), to = new Date(`${y0 + 1}-12-31T23:59:59+05:30`);
const data = computeAll(from, to);
const monthList = [];
for (const y of [y0, y0 + 1]) for (let m = 0; m < 12; m++) monthList.push([String(y), m]);
P.init({ today, now, occ: data.occ, months: data.months, festivals: FESTIVALS, cities: CITIES, aliases: ALIASES, years: [String(y0), String(y0 + 1)], monthList });
console.log(`Data ready in ${Date.now() - t0} ms (today ${today})`);

// ---------- Pages ----------
for (const lang of ['en', 'hi']) {
  write('/', P.home(lang), { lang });
  write('/festivals/', P.festivalsIndex(lang), { lang });
  write('/moonrise/', P.citiesIndex(lang), { lang });
  write('/calendar/', P.calendarIndex(lang), { lang });
  for (const f of FESTIVALS) {
    write(P.fpath(f), P.festivalPage(f, lang), { lang });
    if (P.hasCityPages(f) && P.nextOcc(f)) for (const c of CITIES.filter(c => P.fcOk(f, c))) write(P.fcpath(f, c), P.festCityPage(f, c, lang), { lang });
    if (f.type === 'series') for (const y of [String(y0), String(y0 + 1)]) write(`/calendar/${f.slug}-${y}/`, P.seriesYearPage(f, y, lang), { lang });
  }
  for (const c of CITIES) write(P.cpath(c), P.cityPage(c, lang), { lang });
  for (const [y, m] of monthList) write(P.monthPath(y, m), P.monthPage(y, m, lang), { lang });
  for (const st of P.states()) for (const [y, m] of monthList) write(P.stateMonthPath(st, y, m), P.monthPage(y, m, lang, st), { lang });
  console.log(`${lang}: pages done (${Date.now() - t0} ms)`);
}
write('/learn/', ST.learnIndex());
for (const a of ST.ARTICLES) write(`/learn/${a.slug}/`, ST.learnPage(a));
for (const [s, html] of ST.legalPages()) write(`/${s}/`, html);
write('/moon-finder/', ST.finderPage());
write('/404.html', ST.notFound(), { index: false });

// ---------- Assets ----------
const A = path.join(OUT, 'assets');
fs.mkdirSync(A, { recursive: true });
for (const f of ['style.css', 'finder.js', 'icon.svg', 'og.png']) if (fs.existsSync(path.join(__dirname, 'assets', f))) fs.copyFileSync(path.join(__dirname, 'assets', f), path.join(A, f));
// Every place for the city picker and 'near me': [slug, lat, lng, hasFestivalPages, English, Hindi, state]; aliases: [English, Hindi, state, slug]
const cityJs = 'window.MF_CITIES=' + JSON.stringify(CITIES.map(c => [c.slug, c.lat, c.lng, c.top ? 1 : 0, c.name.en, c.name.hi, c.state, c.major ? 1 : 0])) + ';\nwindow.MF_ALIASES=' + JSON.stringify(ALIASES.map(a => [a.name.en, a.name.hi, a.state, a.slug])) + ';\n';
fs.writeFileSync(path.join(A, 'app.js'), cityJs + fs.readFileSync(path.join(__dirname, 'assets', 'app.src.js'), 'utf8'));

// ---------- Site files ----------
const root = config.origin + config.base;
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${root}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
if (config.adsClient) fs.writeFileSync(path.join(OUT, 'ads.txt'), `google.com, ${config.adsClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
if (!siteUrl.hostname.endsWith('github.io') && config.base === '') fs.writeFileSync(path.join(OUT, 'CNAME'), siteUrl.hostname + '\n');
fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), JSON.stringify({
  name: 'Moon Finder', short_name: 'Moon Finder', start_url: config.base + '/', display: 'standalone', background_color: '#1B1440', theme_color: '#1B1440',
  icons: [{ src: config.base + '/assets/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
}));
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log(`Built ${urls.length} pages into dist/ in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
