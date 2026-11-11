// Shared HTML building blocks: page shell, moon drawing, festive motifs.
'use strict';
const { T } = require('./i18n');
const { SKINS } = require('./festivals');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let CFG = {};
const setConfig = c => { CFG = c; };
const cfg = () => CFG;
// Site path for a page. path like '/karva-chauth/' ; lang 'en'|'hi'
const url = (lang, path) => CFG.base + (lang === 'hi' ? '/hi' : '') + path;
const abs = (lang, path) => CFG.origin + url(lang, path);
const asset = p => CFG.base + '/assets/' + p + '?v=' + CFG.version;

/* ---------- Moon drawing (phase angle in degrees: 0 new, 180 full) ---------- */
function moonSvg(angle, { size = 150, cls = 'moon-art moon-glow', id = 'm' } = {}) {
  const ph = ((angle % 360) + 360) % 360 / 360;
  const r = 86, cx = 100, cy = 100;
  const k = Math.cos(2 * Math.PI * ph), rx = Math.abs(k) * r;
  const waxing = ph < 0.5, crescent = k > 0;
  const d = waxing
    ? `M${cx},${cy - r} A${r},${r} 0 0 1 ${cx},${cy + r} A${rx.toFixed(2)},${r} 0 0 ${crescent ? 0 : 1} ${cx},${cy - r}Z`
    : `M${cx},${cy - r} A${r},${r} 0 0 0 ${cx},${cy + r} A${rx.toFixed(2)},${r} 0 0 ${crescent ? 1 : 0} ${cx},${cy - r}Z`;
  return `<svg class="${cls}" viewBox="0 0 200 200" width="${size}" height="${size}" aria-hidden="true">
<defs><radialGradient id="${id}g" cx="40%" cy="38%" r="70%"><stop offset="0" stop-color="#FFF6D6"/><stop offset="1" stop-color="#F5D27A"/></radialGradient></defs>
<circle cx="100" cy="100" r="86" fill="var(--moon-dark)"/>
<path d="${d}" fill="url(#${id}g)"/>
<g fill="#000" opacity=".07"><circle cx="72" cy="78" r="14"/><circle cx="122" cy="62" r="9"/><circle cx="118" cy="122" r="17"/><circle cx="80" cy="134" r="8"/></g>
</svg>`;
}
function phaseKey(angle) {
  const a = ((angle % 360) + 360) % 360;
  if (a < 12 || a >= 348) return 'phaseNew';
  if (a < 80) return 'phaseWaxC'; if (a < 100) return 'phaseFQ'; if (a < 168) return 'phaseWaxG';
  if (a < 192) return 'phaseFull'; if (a < 260) return 'phaseWanG'; if (a < 280) return 'phaseLQ'; return 'phaseWanC';
}

/* ---------- Festive motifs (simple inline SVG) ---------- */
const MOTIFS = {
  chalni: `<svg viewBox="0 0 100 100"><circle cx="50" cy="44" r="34" fill="none" stroke="#FFD36E" stroke-width="6"/><g fill="#FFD36E">${Array.from({ length: 25 }, (_, i) => `<circle cx="${30 + (i % 5) * 10}" cy="${24 + Math.floor(i / 5) * 10}" r="2.2"/>`).join('')}</g><rect x="46" y="76" width="8" height="22" rx="3" fill="#FFD36E"/></svg>`,
  modak: `<svg viewBox="0 0 100 100"><path d="M50 10 C58 30 82 48 80 68 C78 86 22 86 20 68 C18 48 42 30 50 10Z" fill="#FFE2A8"/><path d="M50 12 L50 82 M38 30 L34 80 M62 30 L66 80" stroke="#E2A04B" stroke-width="3" fill="none"/></svg>`,
  grahan: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="#C24A2A"/><circle cx="62" cy="44" r="36" fill="#000" opacity=".45"/></svg>`,
  crescent: `<svg viewBox="0 0 100 100"><path d="M62 12 A40 40 0 1 0 62 88 A32 32 0 1 1 62 12Z" fill="#FFE2A8"/><path d="M80 22 l3 9 9 0 -7 6 3 9 -8 -6 -8 6 3 -9 -7 -6 9 0z" fill="#FFE2A8"/></svg>`,
  fullmoon: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#FFF3CC"/><circle cx="38" cy="40" r="7" fill="#E9D9A6"/><circle cx="60" cy="62" r="9" fill="#E9D9A6"/></svg>`,
  diya: `<svg viewBox="0 0 100 100"><path d="M50 18 C60 34 58 46 50 50 C42 46 40 34 50 18Z" fill="#FFC23D"/><path d="M14 60 Q50 92 86 60 Z" fill="#E07A1F"/><rect x="40" y="52" width="20" height="8" rx="3" fill="#7A3B0C"/></svg>`,
  gulal: `<svg viewBox="0 0 100 100"><circle cx="34" cy="40" r="22" fill="#FF4FA3"/><circle cx="64" cy="36" r="18" fill="#2BB5E8"/><circle cx="56" cy="66" r="20" fill="#FFD23F"/><circle cx="30" cy="70" r="12" fill="#6CD36C"/></svg>`,
  rakhi: `<svg viewBox="0 0 100 100"><path d="M0 50 H100" stroke="#FACC15" stroke-width="5"/><circle cx="50" cy="50" r="20" fill="#E8590C"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${50 + 26 * Math.cos(i * Math.PI / 4)}" cy="${50 + 26 * Math.sin(i * Math.PI / 4)}" r="8" fill="#FACC15"/>`).join('')}<circle cx="50" cy="50" r="8" fill="#FFF"/></svg>`,
  leaf: `<svg viewBox="0 0 100 100"><path d="M20 90 C20 40 50 15 90 10 C85 55 60 85 20 90Z" fill="#4CAF50"/><path d="M22 88 C40 60 60 40 86 14" stroke="#1F6B2B" stroke-width="3" fill="none"/></svg>`,
  // Pongal pot boiling over, with a sugarcane stick
  pot: `<svg viewBox="0 0 100 100"><path d="M82 92 L70 8" stroke="#3E9B4F" stroke-width="6" stroke-linecap="round"/><path d="M73 30 l-8 -6 M76 52 l-8 -6" stroke="#2E7D3A" stroke-width="3"/><ellipse cx="44" cy="34" rx="22" ry="8" fill="#FFF7E0"/><path d="M28 30 q-4 -10 6 -12 q4 -10 14 -4 q10 -6 14 6 q6 4 0 10z" fill="#FFF7E0"/><path d="M20 40 H68 C74 64 64 88 44 88 C24 88 14 64 20 40Z" fill="#C8642A"/><path d="M20 48 H68" stroke="#F6C744" stroke-width="5"/><circle cx="44" cy="66" r="6" fill="#F6C744"/></svg>`,
  // Pookalam: concentric flower rings
  pookalam: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#F7B500"/>${Array.from({ length: 12 }, (_, i) => `<circle cx="${50 + 34 * Math.cos(i * Math.PI / 6)}" cy="${50 + 34 * Math.sin(i * Math.PI / 6)}" r="7" fill="#E8590C"/>`).join('')}<circle cx="50" cy="50" r="24" fill="#FFF3CC"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${50 + 14 * Math.cos(i * Math.PI / 4)}" cy="${50 + 14 * Math.sin(i * Math.PI / 4)}" r="5" fill="#C2187A"/>`).join('')}<circle cx="50" cy="50" r="6" fill="#1E6B34"/></svg>`,
  // Vel (Murugan's spear)
  vel: `<svg viewBox="0 0 100 100"><path d="M50 6 C66 24 66 40 50 52 C34 40 34 24 50 6Z" fill="#FFD36E"/><path d="M50 16 C58 28 58 36 50 44 C42 36 42 28 50 16Z" fill="#E2621B"/><rect x="46" y="50" width="8" height="46" rx="3" fill="#FFD36E"/><rect x="40" y="54" width="20" height="5" rx="2" fill="#E2621B"/></svg>`,
};
const skin = s => SKINS[s] || SKINS.purnima;
const skinStyle = s => `--skin-a:${skin(s).a};--skin-b:${skin(s).b}`;
const motif = s => MOTIFS[skin(s).motif] || '';

const TORAN = `<svg class="toran" viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="tp" width="40" height="26" patternUnits="userSpaceOnUse"><path d="M0 2 Q20 8 40 2" stroke="#E8A33B" stroke-width="1.5" fill="none"/><path d="M10 5 q4 9 0 16 q-4 -7 0 -16z" fill="#3E9B4F"/><circle cx="30" cy="12" r="6" fill="#F59E0B"/><circle cx="30" cy="12" r="3" fill="#FFD36E"/></pattern></defs><rect width="400" height="26" fill="url(#tp)"/></svg>`;
const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="#FFD36E"/><circle cx="26" cy="15" r="15" fill="#1B1440"/><path d="M8 30 q12 6 24 0" stroke="#F59E0B" stroke-width="2.5" fill="none"/></svg>`;

/* ---------- Components ---------- */
function countdown(date, lang) {
  return `<span class="chip countdown" data-ts="${date.getTime()}" data-lang="${lang}"></span>`;
}
function adSlot() {
  if (!CFG.adsClient || !CFG.adsSlot) return '';
  return `<div class="ad"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(CFG.adsClient)}" data-ad-slot="${esc(CFG.adsSlot)}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
}
function breadcrumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${items.map(([label, href]) => href ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`).join(' › ')}</nav>`;
}
function faqHtml(faqs) { return faqs.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(''); }
function faqLd(faqs) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
}
function shareButtons(text, href, lang) {
  const t = T[lang];
  return `<div class="btn-row"><a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(text + ' ' + href)}">${esc(t.share)}</a><button class="btn ghost" type="button" data-copy="${esc(href)}">${esc(t.copyLink)}</button></div>`;
}

/* ---------- Moon and Sun tools (top menu + home page grid) ---------- */
function tools(lang) {
  const hi = lang === 'hi', L = (en, h) => (hi ? h : en);
  return [
    ['🌙', L('Moon today', 'आज का चाँद'), L('Phase, rise time, rashi', 'कला, चंद्रोदय, राशि'), url(lang, '/moon-today/')],
    ['📅', L('Tithi today', 'आज की तिथि'), L('Aaj ki tithi, nakshatra, panchang', 'तिथि, नक्षत्र, पंचांग'), url(lang, '/tithi-today/')],
    ['🌅', L('Sunrise and sunset', 'सूर्योदय और सूर्यास्त'), L('Today\'s times for every city', 'हर शहर का आज का समय'), url(lang, '/sun-today/')],
    ['🌕', L('Full moon dates', 'पूर्णिमा की तारीखें'), L('Next Purnima, date and time', 'अगली पूर्णिमा, तारीख और समय'), url(lang, '/full-moon/')],
    ['🌑', L('New moon dates', 'अमावस्या की तारीखें'), L('Next Amavasya, date and time', 'अगली अमावस्या, तारीख और समय'), url(lang, '/new-moon/')],
    ['🌘', L('Lunar eclipse', 'चंद्र ग्रहण'), L('Chandra Grahan dates and visibility', 'ग्रहण की तारीख और दृश्यता'), url(lang, '/chandra-grahan/')],
    ['📷', L('Live moon tracker', 'लाइव मून ट्रैकर'), L('Find the moon with your camera', 'कैमरे से चाँद खोजें'), url('en', '/moon-finder/')],
    ['🪐', L('3D solar system', '3D सौर मंडल'), L('Planets, Moon orbit, your place on Earth', 'ग्रह, चाँद की कक्षा, पृथ्वी पर आपकी जगह'), url('en', '/solar-system/')],
  ];
}
const toolLinks = lang => tools(lang).map(([i, n, , href]) => `<a href="${href}">${i} ${esc(n)}</a>`).join('');
const toolCards = lang => `<div class="tool-grid">${tools(lang).map(([i, n, d, href]) => `<a class="card tool-card" href="${href}"><span class="ti" aria-hidden="true">${i}</span><span><span class="n">${esc(n)}</span><br><span class="d">${esc(d)}</span></span></a>`).join('')}</div>`;

/* ---------- Page shell ---------- */
function page({ lang = 'en', path, title, desc, body, alt, ld = [], noindex = false, navActive = '', skinName = '' }) {
  const t = T[lang];
  const canonical = abs(lang, path);
  const altLang = lang === 'en' ? 'hi' : 'en';
  const altHref = alt === false ? null : url(altLang, alt || path);
  const hreflang = alt === false ? '' : `<link rel="alternate" hreflang="${lang}" href="${canonical}"><link rel="alternate" hreflang="${altLang}" href="${abs(altLang, alt || path)}"><link rel="alternate" hreflang="x-default" href="${abs('en', lang === 'en' ? path : (alt || path))}">`;
  const nav = [['today', '/', t.navToday], ['festivals', '/festivals/', t.navFestivals], ['calendar', '/calendar/', t.navCalendar], ['cities', '/moonrise/', t.navCities]];
  const ads = CFG.adsClient ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(CFG.adsClient)}" crossorigin="anonymous"></script>` : '';
  const ga = CFG.gaId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(CFG.gaId)}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(CFG.gaId)}');</script>` : '';
  const cf = CFG.cfToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${esc(CFG.cfToken)}"}'></script>` : '';
  const adsMeta = CFG.adsClient ? `<meta name="google-adsense-account" content="${esc(CFG.adsClient)}">` : '';
  const verify = CFG.gscVerify ? `<meta name="google-site-verification" content="${esc(CFG.gscVerify)}">` : '';
  return `<!doctype html>
<html lang="${lang}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${canonical}">
${hreflang}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${CFG.origin}${CFG.base}/assets/og.png"><meta property="og:locale" content="${lang === 'hi' ? 'hi_IN' : 'en_IN'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1B1440">
<link rel="icon" href="${CFG.base}/favicon.ico" sizes="48x48"><link rel="icon" href="${CFG.base}/assets/favicon-96.png" type="image/png" sizes="96x96"><link rel="icon" href="${CFG.base}/assets/icon-192.png" type="image/png" sizes="192x192"><link rel="icon" href="${CFG.base}/assets/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${CFG.base}/assets/apple-touch-icon.png">
<link rel="manifest" href="${CFG.base}/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700&family=Yatra+One&display=swap">
<link rel="stylesheet" href="${asset('style.css')}">
<script>try{var s=localStorage.getItem('mf-theme');if(s==='dark'||(!s&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.dataset.theme='dark'}catch(e){}</script>
${verify}${adsMeta}${ads}${ga}
${ld.map(x => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`).join('\n')}
</head>
<body${skinName ? ` style="${skinStyle(skinName)}"` : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head">
  <div class="bar">
    <a class="logo" href="${url(lang, '/')}">${LOGO}<span>${esc(t.siteName)}</span></a>
    <nav class="nav" aria-label="Main">${nav.map(([k, p, l]) => `<a href="${url(lang, p)}"${navActive === k ? ' aria-current="page"' : ''}>${esc(l)}</a>`).join('')}<details class="menu"><summary${navActive === 'finder' || navActive === 'moon' ? ' aria-current="page"' : ''}>${lang === 'hi' ? 'चाँद और सूर्य' : 'Moon & Sun'} <span aria-hidden="true">▾</span></summary><div class="menu-panel"><div class="menu-inner">${toolLinks(lang)}</div></div></details>${altHref ? `<a href="${altHref}" lang="${altLang}" hreflang="${altLang}">${esc(t.otherLang)}</a>` : ''}</nav>
    <button class="icon-btn" id="themeBtn" type="button" aria-label="Dark mode">◐</button>
  </div>
  ${TORAN}
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="cols">
      <div><h3>${esc(t.siteName)}</h3><p class="small">${esc(t.tagline)}.</p></div>
      <div><h3>${esc(t.navFestivals)}</h3><ul>
        <li><a href="${url(lang, '/karva-chauth/')}">${lang === 'hi' ? 'करवा चौथ' : 'Karva Chauth'}</a></li>
        <li><a href="${url(lang, '/sankashti-chaturthi/')}">${lang === 'hi' ? 'संकष्टी चतुर्थी' : 'Sankashti Chaturthi'}</a></li>
        <li><a href="${url(lang, '/purnima/')}">${lang === 'hi' ? 'पूर्णिमा' : 'Purnima'}</a></li>
        <li><a href="${url(lang, '/eid-al-fitr/')}">${lang === 'hi' ? 'ईद का चाँद' : 'Eid moon'}</a></li>
        <li><a href="${url(lang, '/chandra-grahan/')}">${lang === 'hi' ? 'चंद्र ग्रहण' : 'Lunar eclipse'}</a></li></ul></div>
      <div><h3>${esc(t.more)}</h3><ul>
        <li><a href="${url(lang, '/calendar/')}">${esc(t.navCalendar)}</a></li>
        <li><a href="${url(lang, '/moon-today/')}">${lang === 'hi' ? 'आज का चाँद' : 'Moon today'}</a></li>
        <li><a href="${url(lang, '/sun-today/')}">${lang === 'hi' ? 'सूर्योदय और सूर्यास्त' : 'Sunrise and sunset'}</a></li>
        <li><a href="${url(lang, '/tithi-today/')}">${lang === 'hi' ? 'आज की तिथि' : 'Tithi today'}</a></li>
        <li><a href="${url(lang, '/full-moon/')}">${lang === 'hi' ? 'पूर्णिमा की तारीखें' : 'Full moon dates'}</a></li>
        <li><a href="${url('en', '/solar-system/')}">${lang === 'hi' ? '3D सौर मंडल' : '3D solar system'}</a></li>
        <li><a href="${url(lang, '/hindi-calendar/')}">${lang === 'hi' ? 'हिंदी कैलेंडर' : 'Hindi calendar'}</a></li>
        <li><a href="${url('en', '/learn/')}">${esc(t.learn)}</a></li>
        <li><a href="${url('en', '/about/')}">About</a></li>
        <li><a href="${url('en', '/contact/')}">Contact</a></li>
        <li><a href="${url('en', '/privacy/')}">Privacy Policy</a></li>
        <li><a href="${url('en', '/disclaimer/')}">Disclaimer</a></li></ul></div>
    </div>
    <p class="fine">${esc(t.disclaimerShort)} ${esc(t.allTimesIST)}. ${esc(t.updated)}: ${esc(CFG.buildLabel)}. Astronomy by <a href="https://github.com/cosinekitty/astronomy">Astronomy Engine</a> (MIT).</p>
  </div>
</footer>
<script src="${asset('app.js')}" defer></script>
</body>
</html>`;
}

module.exports = { tools, toolCards, esc, setConfig, cfg, url, abs, asset, moonSvg, phaseKey, MOTIFS, motif, skin, skinStyle, countdown, adSlot, breadcrumbs, faqHtml, faqLd, shareButtons, page };
