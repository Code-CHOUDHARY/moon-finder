#!/usr/bin/env node
// Fetches one product (photo, title, link) per festival shopping item from Amazon's Creators API (the replacement for
// the retired Product Advertising API 5.0) and writes .cache/products.json for build.js. Amazon's Associates rules allow
// product images only from its API, and the data may be kept for at most 24 hours, so this runs before every build.
//
// Credentials come ONLY from environment variables (GitHub: Settings → Secrets and variables → Actions → Secrets):
//   AMAZON_CREATORS_CLIENT_ID, AMAZON_CREATORS_CLIENT_SECRET   (v3.x credentials from Associates Central → Creators API)
// Never put them in site.config.json or in code. The Associates tag comes from AMAZON_TAG or site.config.json.
// Without credentials, or if the API fails, the site still builds and the shop shows text links.
'use strict';
const fs = require('fs');
const path = require('path');
const S = require('../src/astro');
const { computeAll } = require('../src/data');
const { SHOP } = require('../src/shop');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, '.cache', 'products.json');
// India is served by the EU Login with Amazon endpoint (credential version 3.2).
const TOKEN_URL = process.env.AMAZON_CREATORS_TOKEN_URL || 'https://api.amazon.co.uk/auth/o2/token';
const API = 'https://creatorsapi.amazon/catalog/v1/searchItems';
const MARKETPLACE = 'www.amazon.in';
const DAYS_AHEAD = 60;      // only festivals coming up soon, to stay well inside the API's request limits
const GAP_MS = 1100;        // stay at about one request per second

const clientId = (process.env.AMAZON_CREATORS_CLIENT_ID || '').trim();
const clientSecret = (process.env.AMAZON_CREATORS_CLIENT_SECRET || '').trim();
const cfgFile = path.join(ROOT, 'site.config.json');
const fileCfg = fs.existsSync(cfgFile) ? JSON.parse(fs.readFileSync(cfgFile, 'utf8')) : {};
const tag = (process.env.AMAZON_TAG || fileCfg.amazonTag || '').trim();

// One access token (valid for an hour) covers the whole run.
async function getToken() {
  const res = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret, scope: 'creatorsapi::default' }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) throw new Error(`token ${res.status} ${json.error || ''}`);
  return json.access_token;
}

async function search(token, keywords) {
  const body = JSON.stringify({ keywords, partnerTag: tag, marketplace: MARKETPLACE, itemCount: 1, resources: ['images.primary.medium', 'itemInfo.title'] });
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(API, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'x-marketplace': MARKETPLACE }, body });
    if (res.status === 429) { await sleep(2000 * (attempt + 1)); continue; }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`${res.status} ${(json.errors && json.errors[0] && json.errors[0].code) || json.message || ''}`);
    const it = json.searchResult && json.searchResult.items && json.searchResult.items[0];
    const img = it && it.images && it.images.primary && it.images.primary.medium;
    if (!it || !img) return null;
    return { asin: it.asin, url: it.detailPageURL, img: img.url, w: img.width, h: img.height, title: (it.itemInfo && it.itemInfo.title && it.itemInfo.title.displayValue) || '' };
  }
  throw new Error('429 TooManyRequests');
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  if (!clientId || !clientSecret || !tag) {
    console.log('Products: AMAZON_CREATORS_CLIENT_ID / AMAZON_CREATORS_CLIENT_SECRET / Amazon tag not set – shop shows text links only.');
    fs.rmSync(OUT, { force: true });
    return;
  }
  const now = process.env.BUILD_DATE ? new Date(process.env.BUILD_DATE + 'T06:00:00+05:30') : new Date();
  const today = S.dayKey(now), until = S.dayKey(new Date(now.getTime() + DAYS_AHEAD * 864e5));
  const { occ } = computeAll(new Date(now.getTime() - 864e5), new Date(now.getTime() + (DAYS_AHEAD + 1) * 864e5));
  const slugs = Object.keys(SHOP).filter(s => (occ[s] || []).some(o => (o.holiKey || o.key) >= today && o.key <= until));
  const queries = [...new Set(slugs.flatMap(s => SHOP[s].map(i => i[2])))];
  console.log(`Products: ${queries.length} searches for ${slugs.join(', ') || 'no upcoming festivals'}`);
  const items = {};
  let failed = 0, inARow = 0;
  if (queries.length) {
    const token = await getToken();
    for (const q of queries) {
      try { const p = await search(token, q); if (p) items[q] = p; inARow = 0; }
      catch (e) {
        failed++; inARow++;
        console.warn(`Products: "${q}" failed (${e.message})`);
        // Bad or not-yet-approved access, or the API is down: stop instead of hammering it.
        if (/^(401|403)/.test(e.message) || inARow >= 3) { console.warn('Products: stopping early'); break; }
      }
      await sleep(GAP_MS);
    }
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), items }, null, 1));
  console.log(`Products: ${Object.keys(items).length} found, ${failed} failed → ${path.relative(ROOT, OUT)}`);
})().catch(e => { console.warn('Products: skipped –', e.message); fs.rmSync(OUT, { force: true }); }); // never fail the site build over shop photos
