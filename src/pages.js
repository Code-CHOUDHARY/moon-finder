// Page generators.
'use strict';
const S = require('./astro');
const { T, fmtTime, fmtDate, fmtShort, fmtDateTime, tithiName, pakshaName, MONTH_EN, MONTH_HI, WD_EN, WD_HI } = require('./i18n');
const U = require('./ui');
const { cityTimes } = require('./data');
const { SHOP, shopUrl } = require('./shop');
const { esc, url, abs, page, moonSvg, phaseKey, motif, skin, countdown, adSlot, breadcrumbs, faqHtml, faqLd, shareButtons } = U;

let C; // context, set by init()
const init = ctx => { C = ctx; };

const nm = (o, lang) => (o && (o[lang] || o.en)) || '';
const year = key => key.slice(0, 4);
const CITY_KEYS = ['moonrise', 'avoid', 'holi', 'crescent', 'eclipse', 'chhath', 'bonfire'];
const hasCityPages = f => !f.noCityPages && CITY_KEYS.includes(f.key);
const fpath = f => `/${f.slug}/`;
const fcpath = (f, c) => `/${f.slug}/${c.slug}/`;
// Regional festivals (with a `states` list) only get city pages inside those states, plus the major cities.
const cityBySlug = slug => C.cities.find(c => c.slug === slug);
const fcOk = (f, c) => { if (!hasCityPages(f)) return false; if (!f.states) return true; const x = c.state ? c : cityBySlug(c.slug); return !!x && (!!x.major || f.states.includes(x.state)); };
const cpath = c => `/moonrise/${c.slug}/`;
const DELHI = () => C.cities[0];
// Festivals can name a home city (e.g. Chennai for Pongal) used for the headline time; Delhi otherwise.
const cityFor = f => (f && f.city && C.cities.find(c => c.slug === f.city)) || DELHI();
const NAK_EN = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
const NAK_HI = ['अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद', 'उत्तरा भाद्रपद', 'रेवती'];
const SIGN_EN = ['Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'];
const SIGN_HI = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'];
const nakLine = (f, o, lang) => `${(lang === 'hi' ? NAK_HI : NAK_EN)[f.nakshatra]} ${lang === 'hi' ? 'नक्षत्र' : 'nakshatra'}: ${fmtDateTime(o.nakStart, lang)} → ${fmtDateTime(o.nakEnd, lang)}`;
const sankrantiLine = (f, o, lang) => `${lang === 'hi' ? `सूर्य का निरयण ${SIGN_HI[f.sign]} में प्रवेश` : `Sun enters sidereal ${SIGN_EN[f.sign]}`}: ${fmtDateTime(o.sankranti, lang)}`;
const refLine = (o, lang) => `${lang === 'hi' ? 'श्रावण पूर्णिमा' : 'Shravana Purnima'}: ${fmtDate(o.refKey, lang, { year: false })}`;
// Extra facts for South Indian rule types (shown under the answer and in date tables)
const extraNote = (f, o, lang) => o.nakStart ? nakLine(f, o, lang) : o.sankranti ? sankrantiLine(f, o, lang) : o.refKey ? refLine(o, lang) : '';

// cache city times
const ctCache = new Map();
function ct(f, o, c) {
  const k = f.slug + o.key + c.slug;
  if (!ctCache.has(k)) ctCache.set(k, cityTimes(f, o, c));
  return ctCache.get(k);
}
const nextOcc = f => (C.occ[f.slug] || []).find(o => (o.holiKey || o.key) >= C.today) || null;
const upcomingOccs = (f, n) => (C.occ[f.slug] || []).filter(o => (o.holiKey || o.key) >= C.today).slice(0, n);

function occLabel(f, o, lang) {
  if (o.ekName) return `${o.ekName[lang === 'hi' ? 1 : 0]} ${T[lang].ekadashiName}`;
  if (f.series === 'purnima') return `${lang === 'hi' ? o.month.nameHi : o.month.name}${o.month.adhika ? ' (' + T[lang].adhika + ')' : ''} ${lang === 'hi' ? 'पूर्णिमा' : 'Purnima'}`;
  if (f.series === 'amavasya') return `${lang === 'hi' ? o.month.nameHi : o.month.name} ${lang === 'hi' ? 'अमावस्या' : 'Amavasya'}${o.tag ? ' · ' + T[lang][o.tag] : ''}`;
  if (f.series === 'sankashti') return `${nm(f.name, lang)}${o.tag ? ' · ' + T[lang].angaraki : ''}`;
  if (f.type === 'eclipse') return T[lang].eclipseKind[o.eclipse.kind];
  return nm(f.name, lang);
}

// The headline answer for a festival occurrence in a city.
function answer(f, o, city, lang) {
  const t = T[lang], cn = nm(city.name, lang), x = ct(f, o, city);
  const A = { label: '', big: '—', date: fmtDate(o.key, lang), meta: [], target: x.primary || S.istMidnight(o.key) };
  switch (f.key) {
    case 'moonrise':
      A.label = t.timeFor(t.moonrise, cn); A.big = fmtTime(x.primary);
      if (x.primary && S.dayKey(x.primary) !== o.key) A.meta.push(fmtDateTime(x.primary, lang));
      if (o.tithiStart) A.meta.push(`${t.tithiStarts}: ${fmtDateTime(o.tithiStart, lang)} · ${t.tithiEnds}: ${fmtDateTime(o.tithiEnd, lang)}`);
      break;
    case 'tithi':
      A.label = t.timeFor(t.moonrise, cn); A.big = fmtTime(x.primary);
      if (o.tithiStart) A.meta.push(`${t.tithiStarts}: ${fmtDateTime(o.tithiStart, lang)} · ${t.tithiEnds}: ${fmtDateTime(o.tithiEnd, lang)}`);
      A.target = o.tithiStart && o.tithiStart > C.now ? o.tithiStart : A.target;
      break;
    case 'avoid':
      A.label = `${t.avoidUntil} (${cn})`; A.big = fmtTime(x.primary);
      A.meta.push(`${t.moonriseMorning}: ${fmtTime(x.morningRise, lang)}`);
      A.target = S.istMidnight(o.key);
      break;
    case 'holi':
      A.label = `${t.holikaDahan} – ${t.afterSunset} (${cn})`; A.big = fmtTime(x.primary, lang);
      A.date = fmtDate(o.key, lang);
      A.meta.push(`${lang === 'hi' ? 'भद्रा समाप्त' : 'Bhadra ends'}: ${fmtDateTime(o.bhadraEnd, lang)} – ${lang === 'hi' ? 'दहन सूर्यास्त के बाद और भद्रा समाप्त होने पर' : 'light the fire after sunset, once Bhadra is over'}`);
      A.meta.push(`${t.holiDay}: ${fmtDate(o.holiKey, lang)}`);
      A.meta.push(`${t.tithiStarts}: ${fmtDateTime(o.tithiStart, lang)} · ${t.tithiEnds}: ${fmtDateTime(o.tithiEnd, lang)}`);
      break;
    case 'amavasya':
      A.label = `${t.sunset} (${cn}) – ${lang === 'hi' ? 'प्रदोष काल आरंभ' : 'Pradosh Kaal begins'}`; A.big = fmtTime(x.primary, lang);
      A.meta.push(t.noMoon);
      if (o.tithiStart) A.meta.push(`${t.tithiStarts}: ${fmtDateTime(o.tithiStart, lang)} · ${t.tithiEnds}: ${fmtDateTime(o.tithiEnd, lang)}`);
      break;
    case 'crescent': {
      A.label = `${t.lookWest} (${cn})`; A.big = `${fmtTime(x.primary, lang)} – ${fmtTime(x.moonset, lang)}`;
      if (f.type === 'islamic') { A.meta.push(`${t.sightingEvening}: ${fmtDate(x.evening, lang)}`); A.meta.push(`${t.predicted}: ${nm(f.lunar, lang)} = ${fmtDate(o.key, lang)}`); }
      else A.meta.push(`${t.sunset} ${fmtTime(x.primary, lang)} · ${t.moonset} ${fmtTime(x.moonset, lang)}`);
      if (f.type === 'islamic') A.date = fmtDate(o.key, lang);
      break;
    }
    case 'eclipse': {
      const e = o.eclipse;
      A.label = `${t.eclipseKind[e.kind]} – ${t.eclipsePeak}`; A.big = fmtTime(e.peak, lang);
      A.meta.push(`${cn}: ${x.status === 'visible' ? t.eclipseVisible : x.status === 'partly' ? t.eclipsePartly : t.eclipseNot}`);
      const s = e.kind === 'penumbral' ? e.penumbralStart : e.partialStart, en = e.kind === 'penumbral' ? e.penumbralEnd : e.partialEnd;
      A.meta.push(`${t.eclipseStart}: ${fmtDateTime(s, lang)} · ${t.eclipseEnd}: ${fmtDateTime(en, lang)}`);
      A.target = s;
      break;
    }
    // Chhath: sunset on the Shashthi day (Sandhya Arghya), then the next sunrise (Usha Arghya)
    case 'chhath':
      A.label = `${lang === 'hi' ? 'संध्या अर्घ्य' : 'Sandhya Arghya'} – ${t.sunset} (${cn})`; A.big = fmtTime(x.primary, lang);
      A.meta.push(`${lang === 'hi' ? 'उषा अर्घ्य' : 'Usha Arghya'} – ${t.sunrise}: ${fmtDateTime(x.nextSunrise, lang)}`);
      if (o.tithiStart) A.meta.push(`${t.tithiStarts}: ${fmtDateTime(o.tithiStart, lang)} · ${t.tithiEnds}: ${fmtDateTime(o.tithiEnd, lang)}`);
      break;
    // Lohri: the bonfire is lit after sunset
    case 'bonfire':
      A.label = `${lang === 'hi' ? 'अलाव का समय' : 'Bonfire time'} – ${t.afterSunset} (${cn})`; A.big = fmtTime(x.primary, lang);
      A.meta.push(`${t.sunset} ${fmtTime(x.primary, lang)} · ${t.moonrise} ${fmtTime(x.moonrise, lang)}`);
      if (o.sankranti) A.meta.push(sankrantiLine(f, o, lang));
      break;
    case 'sankranti':
      A.label = lang === 'hi' ? 'तारीख' : 'Date'; A.big = fmtDate(o.key, lang, { year: false });
      A.big = fmtDate(o.key, lang); A.date = `${t.sunrise} (${cn}): ${fmtTime(x.primary, lang)}`;
      A.target = S.istMidnight(o.key);
      break;
    case 'date': case 'night':
      A.label = nm(f.lunar, lang); A.big = fmtDate(o.key, lang, { year: false });
      A.meta.push(`${t.predicted}. ${f.key === 'night' ? (lang === 'hi' ? 'रात शुरू: ' : 'Night begins: ') + fmtDate(S.addDays(o.key, -1), lang) + ' ' + t.afterSunset : ''}`);
      break;
  }
  const extra = extraNote(f, o, lang);
  if (extra) A.meta.push(extra);
  return A;
}
// Short value for tables
function cell(f, o, city, lang) {
  const x = ct(f, o, city), t = T[lang];
  switch (f.key) {
    case 'eclipse': return x.status === 'visible' ? `<span class="chip good">${t.eclipseVisible}</span>` : x.status === 'partly' ? `<span class="chip warn">${t.eclipsePartly}</span>` : `<span class="chip bad">${t.eclipseNot}</span>`;
    case 'crescent': return `${fmtTime(x.primary, lang)} → ${fmtTime(x.moonset, lang)}`;
    case 'chhath': return `${fmtTime(x.primary, lang)} → ${fmtTime(x.nextSunrise, lang)}`;
    default: return fmtTime(x.primary, lang);
  }
}
const cellHeader = (f, lang) => {
  const t = T[lang];
  return { moonrise: t.moonrise, tithi: t.moonrise, sankranti: t.sunrise, chhath: `${t.sunset} → ${t.sunrise}`, bonfire: t.sunset, avoid: t.moonset, holi: t.sunset, amavasya: t.sunset, crescent: `${t.sunset} → ${t.moonset}`, eclipse: lang === 'hi' ? 'दृश्यता' : 'Visibility' }[f.key] || t.time;
};

function hero({ f, lang, crumbs, eyebrow, h1, sub, A, angle, picker, extraBtn = '' }) {
  return `<section class="hero"${f ? ` style="--skin-a:${skin(f.skin).a};--skin-b:${skin(f.skin).b}"` : ''}>
<div class="motif" aria-hidden="true">${f ? motif(f.skin) : ''}</div>
<div class="wrap"><div>
${crumbs || ''}
${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ''}
<h1>${esc(h1)}</h1>
${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
${A ? `<div class="answer">
  <div class="label">${esc(A.label)}</div>
  <div class="big">${esc(A.big)}</div>
  <div class="date">${esc(A.date)}</div>
  ${A.target ? countdown(A.target, lang) : ''}
  ${A.meta.filter(Boolean).map(m => `<div class="meta">${esc(m)}</div>`).join('')}
</div>` : ''}
${picker || ''}
${extraBtn}
</div>
${angle !== undefined ? moonSvg(angle) : ''}
</div></section>`;
}

// City picker. The HTML lists only the major cities (works without JavaScript); assets/app.js then fills in every
// district, grouped by state, from one shared file, so ~800 options are not repeated on every page.
function cityPicker(lang, target, current) {
  const t = T[lang];
  const only = target.f && target.f.states ? ` data-states="${esc(target.f.states.join('|'))}"` : '';
  const tpl = url(lang, target.path({ slug: '__CITY__' }));
  const list = C.cities.filter(c => c.major || (current && c.slug === current.slug));
  const opts = list.slice().sort((a, b) => nm(a.name, lang).localeCompare(nm(b.name, lang), lang)).map(c => `<option value="${url(lang, target.path(c))}"${current && current.slug === c.slug ? ' selected' : ''}>${esc(nm(c.name, lang))}</option>`).join('');
  return `<div class="picker"><select aria-label="${esc(t.pickCity)}" data-nav data-tpl="${esc(tpl)}" data-lang="${lang}" data-current="${current ? esc(current.slug) : ''}"${only}><option value="">${esc(t.pickCity)}</option>${opts}</select>
<button class="btn ghost" type="button" data-near="${esc(tpl)}" data-top="1"${only}>📍 ${esc(t.nearMe)}</button></div>`;
}
// Every place (cities + districts, plus districts that share a city's page) grouped by state.
function placesByState() {
  const by = {};
  for (const c of C.cities) (by[c.state] = by[c.state] || []).push({ name: c.name, slug: c.slug, state: c.state });
  for (const a of C.aliases) (by[a.state] = by[a.state] || []).push({ name: a.name, slug: a.slug, state: a.state, alias: true });
  return by;
}
function stateLinks(lang, path, open = false, keep = null) {
  const by = placesByState();
  if (keep) for (const st of Object.keys(by)) { by[st] = by[st].filter(keep); if (!by[st].length) delete by[st]; }
  return Object.keys(by).sort().map(st => `<details class="faq"${open ? ' open' : ''}><summary>${esc(st)} (${by[st].length})</summary><div class="pills">${by[st].slice().sort((a, b) => nm(a.name, lang).localeCompare(nm(b.name, lang), lang)).map(c => `<a href="${url(lang, path({ slug: c.slug }))}">${esc(nm(c.name, lang))}</a>`).join('')}</div></details>`).join('');
}
const placeCount = () => C.cities.length + C.aliases.length;

// Affiliate shopping links (only when an Amazon Associates tag is configured).
function shopBlock(f, lang) {
  const tag = U.cfg().amazonTag, items = SHOP[f.slug];
  if (!tag || !items) return '';
  const hi = lang === 'hi';
  return `<section class="section"><h2>${hi ? 'त्योहार की खरीदारी' : 'Festival shopping'}</h2>
<div class="shop">${items.map(([en, h, q]) => `<a class="card shop-item" href="${esc(shopUrl(q, tag))}" target="_blank" rel="sponsored nofollow noopener">${esc(hi ? h : en)} <span aria-hidden="true">→</span></a>`).join('')}</div>
<p class="muted small">${hi ? 'ये Amazon के एफ़िलिएट लिंक हैं। Amazon एसोसिएट के रूप में हम योग्य खरीदारी से कमाई करते हैं, आपके लिए कीमत वही रहती है।' : 'These are Amazon affiliate links. As an Amazon Associate we earn from qualifying purchases, at no extra cost to you.'}</p></section>`;
}

/* ===================== Festival page ===================== */
function festivalPage(f, lang) {
  const t = T[lang];
  const o = nextOcc(f);
  const city = cityFor(f);
  const fName = nm(f.name, lang);
  const yr = o ? year(o.holiKey || o.key) : '';
  const A = o ? answer(f, o, city, lang) : null;
  const angle = o ? S.phaseAngle(f.key === 'eclipse' ? o.eclipse.peak : S.istAt(o.key, 20)) : 180;
  const cityPages = hasCityPages(f);
  const crumbs = breadcrumbs([[t.navToday, url(lang, '/')], [t.navFestivals, url(lang, '/festivals/')], [fName]]);
  const picker = cityPages ? cityPicker(lang, { top: true, f, path: c => fcpath(f, c) }) : '';
  let body = hero({ f, lang, crumbs, eyebrow: nm(f.lunar, lang), h1: `${fName} ${yr}`, sub: f.alt ? nm(f.alt, lang) : '', A, angle, picker });
  body += `<div class="wrap">`;
  body += adSlot();

  // City table
  if (o && f.key !== 'date' && f.key !== 'night' && !(f.key === 'sankranti' && !cityPages)) {
    const cities = cityPages ? C.cities.filter(c => c.major) : C.cities.slice(0, 20);
    body += `<section class="section"><h2>${esc(f.key === 'moonrise' || f.key === 'tithi' ? t.topCities : `${cellHeader(f, lang)} – ${t.majorCities}`)}</h2>
<p class="muted small">${esc(fmtDate(o.key, lang))} · ${esc(t.allTimesIST)}</p>
<input class="filter" type="search" placeholder="${esc(t.filterCities)}" data-filter="#ct">
<div class="table-wrap"><table id="ct"><thead><tr><th>${esc(t.city)}</th><th>${esc(cellHeader(f, lang))}</th></tr></thead><tbody>
${cities.map(c => `<tr><td>${fcOk(f, c) ? `<a href="${url(lang, fcpath(f, c))}">${esc(nm(c.name, lang))}</a>` : esc(nm(c.name, lang))}</td><td class="t">${cell(f, o, c, lang)}</td></tr>`).join('')}
</tbody></table></div></section>`;
  }

  if (o && cityPages && !f.states) body += `<section class="section"><h2>${lang === 'hi' ? 'हर ज़िले का समय' : 'Every district'}</h2><p class="muted small">${lang === 'hi' ? `भारत के सभी ${placeCount()} ज़िले और शहर, राज्य के अनुसार।` : `All ${placeCount()} districts and cities of India, by state.`}</p>${stateLinks(lang, c => fcpath(f, c))}</section>`;
  if (o && cityPages && f.states) body += `<section class="section"><h2>${lang === 'hi' ? 'हर ज़िले का समय' : 'Every district'}</h2><p class="muted small">${lang === 'hi' ? 'जिन राज्यों में यह पर्व मुख्य रूप से मनाया जाता है, वहाँ के सभी ज़िले।' : 'All districts in the states where this festival is mainly observed.'}</p>${stateLinks(lang, c => fcpath(f, c), false, p => f.states.includes(p.state || (cityBySlug(p.slug) || {}).state))}</section>`;

  // Eclipse details
  if (f.type === 'eclipse' && o) body += eclipseDetails(o.eclipse, lang);

  // Series: upcoming list
  if (f.type === 'series') body += seriesUpcoming(f, lang);

  body += `<section class="section prose"><h2>${esc(t.about)}</h2><p class="lead">${esc(nm(f.intro, lang))}</p>
<h3>${esc(t.rituals)}</h3><ul class="ritual">${f.rituals[lang].map(r => `<li>${esc(r)}</li>`).join('')}</ul></section>`;
  body += shopBlock(f, lang);
  body += adSlot();

  if (f.type !== 'series') body += allDatesTable(f, lang);
  body += `<section class="section"><h2>${esc(t.faqs)}</h2>${faqHtml(f.faqs[lang])}</section>`;
  if (o && A) body += shareButtons(`${fName}: ${A.big} – ${A.label}, ${A.date}`, abs(lang, fpath(f)), lang);
  body += relatedFestivals(f, lang);
  body += `</div>`;

  const ld = [faqLd(f.faqs[lang])];
  if (o) {
    const pageUrl = abs(lang, fpath(f));
    ld.push({
      '@context': 'https://schema.org', '@type': 'Event', name: `${fName} ${yr}`, startDate: o.key, endDate: o.key,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: 'India', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
      description: nm(f.intro, lang).slice(0, 300),
      image: [`${U.cfg().origin}${U.cfg().base}/assets/og.png`],
      url: pageUrl,
      // Festivals are free and open to everyone: a zero-price offer is how Google expects free events to be marked.
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: pageUrl },
    });
  }
  return page({
    lang, path: fpath(f), title: f.type === 'eclipse' ? (lang === 'hi' ? `चंद्र ग्रहण ${yr} कब है: तारीख, समय और भारत में कहाँ दिखेगा` : `Lunar Eclipse ${yr} in India: Chandra Grahan Date, Time & Visibility`) : t.titleFestival(fName, yr), desc: o ? t.descFestival(fName, fmtDate(o.key, lang)) : nm(f.intro, lang).slice(0, 150),
    body, ld, navActive: 'festivals', skinName: f.skin,
  });
}

function eclipseDetails(e, lang) {
  const t = T[lang];
  const rows = [[t.penumbralStart, e.penumbralStart], [t.eclipseStart, e.partialStart], [t.totalityStart, e.totalStart], [t.eclipsePeak, e.peak], [t.totalityEnd, e.totalEnd], [t.eclipseEnd, e.partialEnd], [t.penumbralEnd, e.penumbralEnd]].filter(r => r[1]);
  return `<section class="section"><h2>${esc(t.eclipseKind[e.kind])}</h2><div class="table-wrap"><table><tbody>${rows.map(([l, d]) => `<tr${l === t.eclipsePeak ? ' class="hl"' : ''}><td>${esc(l)}</td><td class="t">${esc(fmtDateTime(d, lang))}</td></tr>`).join('')}</tbody></table></div>
<p class="muted small">${lang === 'hi' ? `ग्रहण का समय पूरे भारत में एक ही है; दिखना इस पर निर्भर है कि आपके शहर में चाँद क्षितिज के ऊपर है या नहीं। अधिकतम ग्रास: ${Math.round(e.obscuration * 100)}%।` : `Eclipse times are the same across India; whether you see it depends on the moon being above your horizon. Maximum obscuration: ${Math.round(e.obscuration * 100)}%.`}</p></section>`;
}

function seriesUpcoming(f, lang) {
  const t = T[lang];
  const list = upcomingOccs(f, 14);
  const city = DELHI();
  const years = [...new Set((C.occ[f.slug] || []).map(o => year(o.key)))];
  const showTime = ['moonrise', 'crescent'].includes(f.key);
  return `<section class="section"><h2>${esc(t.upcoming)}: ${esc(nm(f.name, lang))}</h2>
<div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th><th>${esc(t.notes)}</th>${showTime ? `<th>${esc(cellHeader(f, lang))} (${esc(nm(city.name, lang))})</th>` : `<th>${esc(t.tithiStarts)}</th><th>${esc(t.tithiEnds)}</th>`}</tr></thead><tbody>
${list.map(o => `<tr><td>${esc(fmtDate(o.key, lang))}</td><td>${esc(occLabel(f, o, lang))}</td>${showTime ? `<td class="t">${cell(f, o, city, lang)}</td>` : `<td>${o.tithiStart ? esc(fmtDateTime(o.tithiStart, lang)) : ''}</td><td>${o.tithiEnd ? esc(fmtDateTime(o.tithiEnd, lang)) : ''}</td>`}</tr>`).join('')}
</tbody></table></div>
<div class="pills" style="margin-top:12px">${years.map(y => `<a href="${url(lang, `/calendar/${f.slug}-${y}/`)}">${esc(nm(f.name, lang))} ${y}</a>`).join('')}</div></section>`;
}

function allDatesTable(f, lang) {
  const t = T[lang];
  const list = C.occ[f.slug] || [];
  if (!list.length) return f.type === 'eclipse' ? `<p>${esc(t.noEclipse)}</p>` : '';
  return `<section class="section"><h2>${esc(t.allDates)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th><th>${esc(t.notes)}</th></tr></thead><tbody>
${list.map(o => `<tr${o === nextOcc(f) ? ' class="hl"' : ''}><td>${esc(fmtDate(f.type === 'holi' ? o.holiKey : o.key, lang))}</td><td>${esc(f.type === 'eclipse' ? `${T[lang].eclipseKind[o.eclipse.kind]} · ${fmtTime(o.eclipse.peak, lang)}` : f.type === 'holi' ? `${t.holikaDahan}: ${fmtDate(o.key, lang, { year: false })}` : f.type === 'islamic' ? `${t.predicted} · ${t.sightingEvening}: ${fmtDate(o.sightingEvening, lang, { year: false })}` : extraNote(f, o, lang) ? extraNote(f, o, lang) : o.tithiStart ? `${tithiName(f.tithi, lang)}: ${fmtDateTime(o.tithiStart, lang)} → ${fmtDateTime(o.tithiEnd, lang)}` : '')}</td></tr>`).join('')}
</tbody></table></div></section>`;
}

function festCard(f, o, lang) {
  const k = o.holiKey || o.key;
  const days = Math.round((Date.parse(k) - Date.parse(C.today)) / 86400000);
  const when = days === 0 ? T[lang].today : days === 1 ? T[lang].tomorrow : (lang === 'hi' ? `${days} दिन बाकी` : `in ${days} days`);
  return `<a class="card fest-card" href="${url(lang, fpath(f))}" style="--a:${skin(f.skin).a};--b:${skin(f.skin).b}"><span class="dot">${motif(f.skin)}</span><span><span class="n">${esc(occLabel(f, o, lang))}</span><br><span class="d">${esc(fmtDate(k, lang))}</span><br><span class="in">${esc(when)}</span></span></a>`;
}

function relatedFestivals(f, lang) {
  const others = upcomingAll(lang).filter(x => x.f.slug !== f.slug).slice(0, 6);
  return `<section class="section"><h2>${esc(T[lang].related)}</h2><div class="grid">${others.map(x => festCard(x.f, x.o, lang)).join('')}</div></section>`;
}

// Upcoming occurrences across festivals (annual festivals + next Sankashti/Purnima/Eclipse)
function upcomingAll() {
  const out = [];
  for (const f of C.festivals) {
    if (['amavasya', 'ekadashi', 'chandra-darshan'].includes(f.series)) continue;
    const o = nextOcc(f);
    if (o) out.push({ f, o, k: o.holiKey || o.key });
  }
  // Drop a series entry (e.g. "Kartika Purnima") when an annual festival falls on the same day.
  const annualDays = new Set(out.filter(x => x.f.type !== 'series' && x.f.type !== 'eclipse').map(x => x.k));
  return out.filter(x => x.f.type !== 'series' || !annualDays.has(x.k))
    .sort((a, b) => a.k < b.k ? -1 : a.k > b.k ? 1 : a.f.priority - b.f.priority);
}

/* ===================== Festival × city ===================== */
function festCityPage(f, city, lang) {
  const t = T[lang];
  const o = nextOcc(f);
  const fName = nm(f.name, lang), cn = nm(city.name, lang);
  const A = answer(f, o, city, lang);
  const yr = year(o.holiKey || o.key);
  const angle = S.phaseAngle(f.key === 'eclipse' ? o.eclipse.peak : S.istAt(o.key, 20));
  const crumbs = breadcrumbs([[t.navFestivals, url(lang, '/festivals/')], [fName, url(lang, fpath(f))], [cn]]);
  const h1 = f.key === 'moonrise' || f.key === 'crescent' ? (lang === 'hi' ? `${fName} ${yr}: ${cn} में चाँद कब निकलेगा?` : `${fName} ${yr}: Moon time in ${cn}`) : `${fName} ${yr} – ${cn}`;
  const picker = cityPicker(lang, { top: true, f, path: c => fcpath(f, c) }, city);
  let body = hero({ f, lang, crumbs, eyebrow: nm(f.lunar, lang), h1, A, angle, picker });
  body += `<div class="wrap">${adSlot()}`;

  // Upcoming occurrences in this city
  const ups = (f.type === 'series' ? upcomingOccs(f, 12) : (C.occ[f.slug] || []).filter(x => x.key >= S.addDays(C.today, -400)));
  body += `<section class="section"><h2>${esc(f.type === 'series' ? t.upcoming : t.allDates)} – ${esc(cn)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th>${f.type === 'series' ? `<th>${esc(t.notes)}</th>` : ''}<th>${esc(cellHeader(f, lang))}</th></tr></thead><tbody>
${ups.map(x => `<tr${x === o ? ' class="hl"' : ''}><td>${esc(fmtDate(x.key, lang))}</td>${f.type === 'series' ? `<td>${esc(occLabel(f, x, lang))}</td>` : ''}<td class="t">${cell(f, x, city, lang)}</td></tr>`).join('')}
</tbody></table></div></section>`;

  // Nearby cities
  const near = C.cities.filter(c => fcOk(f, c) && c.slug !== city.slug).map(c => ({ c, d: (c.lat - city.lat) ** 2 + ((c.lng - city.lng) * Math.cos(city.lat * Math.PI / 180)) ** 2 })).sort((a, b) => a.d - b.d).slice(0, 6).map(x => x.c);
  body += `<section class="section"><h2>${esc(t.nearby)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(t.city)}</th><th>${esc(cellHeader(f, lang))}</th></tr></thead><tbody>
${near.map(c => `<tr><td><a href="${url(lang, fcpath(f, c))}">${esc(nm(c.name, lang))}</a></td><td class="t">${cell(f, o, c, lang)}</td></tr>`).join('')}
</tbody></table></div><p style="margin-top:10px"><a href="${url(lang, fpath(f))}">${esc(t.seeAllCities)} →</a></p></section>`;

  body += `<section class="section prose"><h2>${esc(t.about)}</h2><p>${esc(nm(f.intro, lang))}</p><h3>${esc(t.rituals)}</h3><ul class="ritual">${f.rituals[lang].map(r => `<li>${esc(r)}</li>`).join('')}</ul>
<p class="muted small">${lang === 'hi' ? `${cn} (${esc(city.state)}) के निर्देशांक: ${city.lat.toFixed(2)}°N, ${city.lng.toFixed(2)}°E। समतल क्षितिज मानकर गणना; ऊँची इमारतों या पहाड़ों के पीछे चाँद कुछ मिनट बाद दिख सकता है।` : `Calculated for ${cn}, ${city.state} (${city.lat.toFixed(2)}°N, ${city.lng.toFixed(2)}°E) with a flat horizon. Behind buildings or hills the moon can appear a few minutes later.`}</p></section>`;
  body += shopBlock(f, lang);
  body += `<section class="section"><h2>${esc(t.faqs)}</h2>${faqHtml(f.faqs[lang])}</section>`;
  body += shareButtons(t.whatsappText(fName, cn, `${A.big} (${A.date})`), abs(lang, fcpath(f, city)), lang);
  body += `<div class="btn-row"><a class="btn" href="${url('en', '/moon-finder/')}?lat=${city.lat}&lng=${city.lng}">📷 ${esc(t.findMoon)}</a></div>`;
  body += `</div>`;
  const noMoon = !['moonrise', 'crescent'].includes(f.key);
  return page({
    lang, path: fcpath(f, city),
    title: noMoon ? t.titleFestCityNoMoon(fName, yr, cn) : t.titleFestCity(fName, yr, cn),
    desc: t.descFestCity(fName, fmtDate(o.key, lang), cn, A.big), body, ld: [faqLd(f.faqs[lang])], navActive: 'festivals', skinName: f.skin,
  });
}

/* ===================== City page ===================== */
function cityPage(city, lang) {
  const t = T[lang];
  const cn = nm(city.name, lang);
  const key = C.today;
  const now = S.istAt(key, 20);
  const angle = S.phaseAngle(now);
  const rise = S.moonriseWithinDay(key, city), set = S.moonsetWithinDay(key, city);
  const ill = Math.round(S.illumination(now) * 100);
  const crumbs = breadcrumbs([[t.navToday, url(lang, '/')], [t.navCities, url(lang, '/moonrise/')], [cn]]);
  const sunR = S.sunrise(key, city), sunS = S.sunset(key, city);
  const A = { label: t.timeFor(t.moonrise, cn), big: fmtTime(rise, lang), date: fmtDate(key, lang), meta: [`${t.moonset}: ${fmtTime(set, lang)}`, `${t.sunrise}: ${fmtTime(sunR, lang)} · ${t.sunset}: ${fmtTime(sunS, lang)}`, `${t[phaseKey(angle)]} · ${ill}% ${t.lit}`], target: rise || S.istMidnight(key) };
  const picker = cityPicker(lang, { top: false, path: c => cpath(c) }, city);
  let body = hero({ lang, crumbs, eyebrow: t.moonTonight, h1: t.h1City(cn), A, angle, picker,
    extraBtn: `<div class="btn-row"><a class="btn" href="${url('en', '/moon-finder/')}?lat=${city.lat}&lng=${city.lng}">📷 ${esc(t.findMoon)}</a></div>` });
  body += `<div class="wrap">${adSlot()}`;
  const days = Array.from({ length: 7 }, (_, i) => S.addDays(key, i));
  body += `<section class="section"><h2>${esc(t.next7)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th><th>${esc(t.moonrise)}</th><th>${esc(t.moonset)}</th><th>${esc(t.sunrise)}</th><th>${esc(t.sunset)}</th><th>${lang === 'hi' ? 'तिथि' : 'Tithi'}</th></tr></thead><tbody>
${days.map(d => { const sr = S.sunrise(d, city); const T0 = S.tithiAt(sr); return `<tr${d === key ? ' class="hl"' : ''}><td>${esc(fmtDate(d, lang, { year: false }))}</td><td class="t">${esc(fmtTime(S.moonriseWithinDay(d, city), lang))}</td><td>${esc(fmtTime(S.moonsetWithinDay(d, city), lang))}</td><td>${esc(fmtTime(sr, lang))}</td><td>${esc(fmtTime(S.sunset(d, city), lang))}</td><td>${esc(pakshaName(T0, lang) + ' ' + tithiName(T0, lang))}</td></tr>`; }).join('')}
</tbody></table></div><p class="muted small">${esc(t.allTimesIST)}. ${lang === 'hi' ? '"—" का मतलब है कि उस तारीख को चाँद उदय या अस्त नहीं होता (यह आधी रात के पार चला जाता है)।' : '"—" means the moon does not rise or set on that calendar date (the event moves past midnight).'}</p></section>`;

  // WhatsApp share: today's moonrise for this place (the site is rebuilt every morning, so the text stays current)
  const shareText = lang === 'hi'
    ? `🌙 ${cn} में आज (${fmtDate(key, lang, { year: false })}) चंद्रोदय: ${fmtTime(rise, lang)} · चंद्रास्त: ${fmtTime(set, lang)} · ${t[phaseKey(angle)]}, ${ill}% ${t.lit}। अगले 7 दिन का समय:`
    : `🌙 Moonrise in ${cn} today (${fmtDate(key, lang, { year: false })}): ${fmtTime(rise, lang)} · Moonset: ${fmtTime(set, lang)} · ${t[phaseKey(angle)]}, ${ill}% ${t.lit}. Next 7 days:`;
  body += shareButtons(shareText, abs(lang, cpath(city)), lang);

  // Festivals in this city
  const ups = upcomingAll().filter(x => x.f.key !== 'date' && x.f.key !== 'night' && (!x.f.states || x.f.states.includes(city.state))).slice(0, 10);
  body += `<section class="section"><h2>${esc(t.festivalsInCity)} ${esc(cn)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(t.navFestivals)}</th><th>${esc(t.date)}</th><th>${esc(t.time)}</th></tr></thead><tbody>
${ups.map(({ f, o }) => { const link = fcOk(f, city) ? url(lang, fcpath(f, city)) : url(lang, fpath(f)); return `<tr><td><a href="${link}">${esc(occLabel(f, o, lang))}</a></td><td>${esc(fmtDate(o.holiKey || o.key, lang, { year: false }))}</td><td class="t">${f.key === 'eclipse' ? cell(f, o, city, lang) : `${esc(cellHeader(f, lang))}: ${cell(f, o, city, lang)}`}</td></tr>`; }).join('')}
</tbody></table></div></section>`;
  body += `<section class="section prose"><p class="muted">${lang === 'hi' ? `${cn}, ${esc(city.state)} (${city.lat.toFixed(2)}°N, ${city.lng.toFixed(2)}°E) के लिए गणना। चंद्रोदय वह समय है जब चाँद का ऊपरी किनारा समतल क्षितिज पर आता है। यह पेज रोज़ अपडेट होता है।` : `Calculated for ${cn}, ${city.state} (${city.lat.toFixed(2)}°N, ${city.lng.toFixed(2)}°E). Moonrise is when the top edge of the moon touches a flat horizon. This page is updated every day.`}</p></section>`;
  // Questions in the words people type into search
  const dToday = fmtDate(key, lang, { weekday: false }), rT = fmtTime(rise, lang), sT = fmtTime(set, lang), srT = fmtTime(sunR, lang), ssT = fmtTime(sunS, lang);
  const cityFaq = lang === 'hi' ? [
    [`आज ${cn} में चाँद कितने बजे निकलेगा?`, rise ? `आज (${dToday}) ${cn} में चाँद ${rT} पर निकलेगा${set ? ` और ${sT} पर अस्त होगा` : ''} (IST)।` : `आज (${dToday}) की तारीख में ${cn} में चंद्रोदय नहीं है; चाँद आधी रात के बाद निकलता है। ऊपर अगले 7 दिन का समय देखें।`],
    [`आज ${cn} में सूर्योदय और सूर्यास्त कितने बजे है?`, `आज (${dToday}) ${cn} में सूर्योदय ${srT} और सूर्यास्त ${ssT} पर है (IST)।`],
    [`आज ${cn} में चाँद कैसा दिखेगा?`, `आज चाँद ${t[phaseKey(angle)]} है, लगभग ${ill}% रोशन।`],
    [`${cn} में अभी चाँद किस दिशा में है?`, 'ऊपर "अभी आसमान में चाँद खोजें" दबाएँ: लाइव फ़ाइंडर चाँद की दिशा और ऊँचाई बताता है और कैमरे से आसमान में दिखाता है।'],
  ] : [
    [`What time will the moon rise in ${cn} today?`, rise ? `Today (${dToday}) the moon rises in ${cn} at ${rT}${set ? ` and sets at ${sT}` : ''} (IST).` : `There is no moonrise in ${cn} on today's date (${dToday}); the moon rises after midnight. See the next 7 days above.`],
    [`Aaj ${cn} mein chand kab niklega?`, rise ? `Aaj (${dToday}) ${cn} mein chand ${rT} par niklega${set ? ` aur ${sT} par ast hoga` : ''}.` : `Aaj ki tareekh mein ${cn} mein chandroday nahin hai; chand aadhi raat ke baad niklega.`],
    [`What time is sunrise and sunset in ${cn} today?`, `Today (${dToday}) sunrise in ${cn} is at ${srT} and sunset is at ${ssT} (IST).`],
    [`What does the moon look like today in ${cn}?`, `Today's moon is a ${t[phaseKey(angle)]}, about ${ill}% lit.`],
    [`Where is the moon right now in ${cn}?`, 'Tap "Find the moon in the sky now" above: the live moon finder shows the moon\'s direction and height from your location and points to it with your camera.'],
  ];
  body += `<div class="wrap"><section class="section"><h2>${esc(t.faqs)}</h2>${faqHtml(cityFaq)}</section></div>`;
  return page({ lang, path: cpath(city), title: t.titleCity(cn), desc: t.descCity(cn), body, navActive: 'cities', ld: [faqLd(cityFaq)] });
}

function citiesIndex(lang) {
  const t = T[lang];
  let body = hero({ lang, eyebrow: t.navCities, h1: t.citiesTitle, sub: t.tagline, angle: S.phaseAngle(S.istAt(C.today, 20)), picker: cityPicker(lang, { top: false, path: c => cpath(c) }) });
  body += `<div class="wrap">${adSlot()}<p class="muted">${lang === 'hi' ? `भारत के सभी ${placeCount()} ज़िले और शहर, राज्य के अनुसार।` : `All ${placeCount()} districts and cities of India, by state.`}</p>${stateLinks(lang, c => cpath(c))}`;
  body += `</div>`;
  return page({ lang, path: '/moonrise/', title: lang === 'hi' ? `आज चाँद कब निकलेगा: हर शहर का चंद्रोदय समय – ${t.siteName}` : `Moon Rise Time Today in Your City – All ${placeCount()} Places | ${t.siteName}`, desc: lang === 'hi' ? `भारत के सभी ${placeCount()} ज़िलों और शहरों में आज चंद्रोदय और चंद्रास्त का समय, चाँद की कला और अगले 7 दिन।` : `Today's moon rise and moonset time for all ${placeCount()} districts and cities of India, with moon phase and the next 7 days.`, body, navActive: 'cities' });
}

/* ===================== Home ===================== */
function home(lang) {
  const t = T[lang];
  const ups = upcomingAll();
  const nx = ups[0];
  const city = DELHI();
  const angle = S.phaseAngle(S.istAt(C.today, 20));
  const rise = S.moonriseWithinDay(C.today, city);
  const A = nx ? answer(nx.f, nx.o, cityFor(nx.f), lang) : null;
  if (A) A.label = `${t.nextFestival}: ${occLabel(nx.f, nx.o, lang)} · ${A.label}`;
  let body = hero({ f: nx && nx.f, lang, eyebrow: `${t[phaseKey(angle)]} · ${Math.round(S.illumination(S.istAt(C.today, 20)) * 100)}% ${t.lit} · ${t.moonrise} ${nm(city.name, lang)} ${fmtTime(rise, lang)}`, h1: t.tagline, A, angle,
    picker: cityPicker(lang, { top: false, path: c => cpath(c) }),
    extraBtn: `<div class="btn-row"><a class="btn" href="${url('en', '/moon-finder/')}">📷 ${esc(t.findMoon)}</a>${nx ? `<a class="btn ghost" href="${url(lang, fpath(nx.f))}">${esc(t.viewFestival)} →</a>` : ''}</div>` });
  body += `<div class="wrap">${adSlot()}`;
  body += `<section class="section"><h2>${esc(t.upcoming)}</h2><div class="grid">${ups.slice(0, 12).map(x => festCard(x.f, x.o, lang)).join('')}</div>
<p style="margin-top:12px"><a href="${url(lang, '/festivals/')}">${esc(t.navFestivals)} →</a></p></section>`;
  body += `<section class="section"><h2>${esc(t.citiesTitle)}</h2><div class="pills">${C.cities.slice(0, 24).map(c => `<a href="${url(lang, cpath(c))}">${esc(nm(c.name, lang))}</a>`).join('')}<a href="${url(lang, '/moonrise/')}">${esc(t.allCities)} →</a></div></section>`;
  const yr = C.today.slice(0, 4);
  body += `<section class="section"><h2>${esc(t.calendarTitle)}</h2><div class="pills">
${['purnima', 'amavasya', 'ekadashi', 'sankashti-chaturthi'].map(s => { const f = C.festivals.find(x => x.slug === s); return `<a href="${url(lang, `/calendar/${s}-${yr}/`)}">${esc(nm(f.name, lang))} ${yr}</a>`; }).join('')}
<a href="${url(lang, monthPath(C.today.slice(0, 4), Number(C.today.slice(5, 7)) - 1))}">${esc(t.monthlyCal)}</a></div></section>`;
  body += `<section class="section"><h2>${lang === 'hi' ? 'आज का चाँद, पूर्णिमा और अमावस्या' : 'Moon today, full moon and new moon'}</h2><div class="pills"><a href="${url(lang, '/moon-today/')}">${lang === 'hi' ? 'आज का चाँद' : 'Moon today'}</a><a href="${url(lang, '/tithi-today/')}">${lang === 'hi' ? 'आज की तिथि' : 'Tithi today'}</a><a href="${url('en', '/moon-finder/')}">${lang === 'hi' ? 'लाइव मून ट्रैकर' : 'Live moon tracker'}</a><a href="${url(lang, '/full-moon/')}">${lang === 'hi' ? 'अगली पूर्णिमा कब है' : 'Next full moon'}</a><a href="${url(lang, '/new-moon/')}">${lang === 'hi' ? 'अगली अमावस्या कब है' : 'Next new moon'}</a><a href="${url(lang, '/chandra-grahan/')}">${lang === 'hi' ? 'चंद्र ग्रहण' : 'Lunar eclipse'}</a><a href="${url('en', '/solar-system/')}">🪐 ${lang === 'hi' ? '3D सौर मंडल और चाँद' : '3D solar system and Moon'}</a></div></section>`;
  body += `<section class="section"><h2>${lang === 'hi' ? `हर राज्य का कैलेंडर ${yr}` : `Calendars of every state ${yr}`}</h2>${require('./regional').calLinks(lang)}</section>`;
  body += `<section class="section prose"><h2>${lang === 'hi' ? 'मून फ़ाइंडर क्या है?' : 'What is Moon Finder?'}</h2><p>${lang === 'hi' ? 'मून फ़ाइंडर (fullmoonfinder.com) आज का चाँद, अगली पूर्णिमा और अमावस्या, और भारत के हर ज़िले के लिए चंद्रोदय, चंद्रास्त और त्योहारों पर चाँद का समय बताता है – करवा चौथ, संकष्टी चतुर्थी, शरद पूर्णिमा, ईद का चाँद, चंद्र ग्रहण और भी बहुत कुछ। यहाँ हिंदी, मराठी, गुजराती, कन्नड़, तेलुगु, तमिल, मलयालम, बंगाली और अन्य राज्यों के कैलेंडर भी हैं। कैमरा फ़ाइंडर से आप फ़ोन को आसमान की ओर करके चाँद ढूँढ सकते हैं।' : 'Moon Finder (fullmoonfinder.com) shows the moon today, the next full moon and new moon, and moonrise, moonset and festival moon times for every district of India – Karva Chauth, Sankashti Chaturthi, Sharad Purnima, the Eid moon, lunar eclipses and more. It also has Hindi, Marathi, Gujarati, Kannada, Telugu, Tamil, Malayalam, Bengali and other state calendars. The camera finder points you to the moon when you hold your phone up to the sky.'}</p>
<p><a href="${url('en', '/learn/')}">${esc(t.learn)} →</a></p></section>`;
  body += `</div>`;
  return page({ lang, path: '/', title: lang === 'hi' ? 'मून फ़ाइंडर – आज का चाँद, पूर्णिमा और चंद्रोदय का समय | Full Moon Finder' : 'Moon Finder Online – Live Moon Today, Moonrise Time & Full Moon Finder', desc: lang === 'hi' ? 'आज का चाँद, अगली पूर्णिमा और करवा चौथ, संकष्टी, ईद व चंद्र ग्रहण पर आपके शहर में चाँद कब निकलेगा। भारत के हर ज़िले का चंद्रोदय समय और हर राज्य का कैलेंडर।' : 'See the moon today, the next full moon and the moonrise time in your city for Karva Chauth, Sankashti, Purnima and Eid. Every district of India.', body, navActive: 'today',
    ld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Moon Finder', alternateName: ['Full Moon Finder', 'fullmoonfinder.com', 'मून फ़ाइंडर'], url: abs(lang, '/'), inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN' },
      { '@context': 'https://schema.org', '@type': 'Organization', name: 'Moon Finder', alternateName: 'Full Moon Finder', url: abs('en', '/'), logo: `${U.cfg().origin}${U.cfg().base}/assets/logo.png` }] });
}

function festivalsIndex(lang) {
  const t = T[lang];
  const ups = upcomingAll();
  const series = C.festivals.filter(f => f.type === 'series');
  let body = hero({ lang, eyebrow: t.navFestivals, h1: lang === 'hi' ? 'त्योहारों पर चाँद का समय' : 'Festival moon times', sub: t.tagline, angle: S.phaseAngle(S.istAt(C.today, 20)) });
  body += `<div class="wrap">${adSlot()}<section class="section"><h2>${esc(t.upcoming)}</h2><div class="grid">${ups.map(x => festCard(x.f, x.o, lang)).join('')}</div></section>
<section class="section"><h2>${lang === 'hi' ? 'हर महीने' : 'Every month'}</h2><div class="grid">${series.map(f => { const o = nextOcc(f); return o ? festCard(f, o, lang) : ''; }).join('')}</div></section></div>`;
  return page({ lang, path: '/festivals/', title: `${lang === 'hi' ? 'सभी त्योहार – तारीख और चंद्रोदय समय' : 'All festivals – dates and moonrise times'} | ${t.siteName}`, desc: lang === 'hi' ? 'हिंदू और इस्लामी त्योहारों की तारीखें और आपके शहर में चाँद का समय।' : 'Dates and city-wise moon times for Hindu and Islamic festivals in India.', body, navActive: 'festivals' });
}

/* ===================== Calendars ===================== */
function seriesYearPage(f, y, lang) {
  const t = T[lang];
  const list = (C.occ[f.slug] || []).filter(o => year(o.key) === y);
  const city = DELHI();
  const showTime = ['moonrise', 'crescent'].includes(f.key);
  const fName = nm(f.name, lang);
  const crumbs = breadcrumbs([[t.navCalendar, url(lang, '/calendar/')], [`${fName} ${y}`]]);
  let body = hero({ f, lang, crumbs, eyebrow: t.yearly, h1: t.titleSeriesYear(fName, y), sub: nm(f.lunar, lang), angle: f.series === 'amavasya' ? 0 : f.series === 'chandra-darshan' ? 30 : 180 });
  body += `<div class="wrap">${adSlot()}<div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th><th>${esc(t.notes)}</th>${showTime ? `<th>${esc(cellHeader(f, lang))} (${esc(nm(city.name, lang))})</th>` : ''}<th>${esc(t.tithiStarts)}</th><th>${esc(t.tithiEnds)}</th></tr></thead><tbody>
${list.map(o => `<tr${o === nextOcc(f) ? ' class="hl"' : ''}><td>${esc(fmtDate(o.key, lang))}</td><td>${esc(occLabel(f, o, lang))}</td>${showTime ? `<td class="t">${cell(f, o, city, lang)}</td>` : ''}<td>${o.tithiStart ? esc(fmtDateTime(o.tithiStart, lang)) : '—'}</td><td>${o.tithiEnd ? esc(fmtDateTime(o.tithiEnd, lang)) : '—'}</td></tr>`).join('')}
</tbody></table></div>
<p class="muted small" style="margin-top:10px">${esc(t.disclaimerShort)}</p>
<p><a href="${url(lang, fpath(f))}">${esc(fName)}: ${esc(t.viewFestival)} →</a></p>
<section class="section prose"><h2>${esc(t.about)}</h2><p>${esc(nm(f.intro, lang))}</p></section></div>`;
  return page({ lang, path: `/calendar/${f.slug}-${y}/`, title: t.titleSeriesYear(fName, y), desc: `${fName} ${y}: ${list.length} ${lang === 'hi' ? 'तारीखें, तिथि आरंभ और समाप्ति समय सहित।' : 'dates with tithi start and end times.'}`, body, navActive: 'calendar', skinName: f.skin });
}

const monthSlug = m => MONTH_EN[m].toLowerCase();
const monthPath = (y, m) => `/moon-calendar/${y}/${monthSlug(m)}/`;

/* ---------- State calendars: moonrise/tithi for the state capital, festivals observed in that state ---------- */
const STATE_HI = { 'Andaman and Nicobar': 'अंडमान और निकोबार', 'Andhra Pradesh': 'आंध्र प्रदेश', 'Arunachal Pradesh': 'अरुणाचल प्रदेश', Assam: 'असम', Bihar: 'बिहार', Chandigarh: 'चंडीगढ़', Chhattisgarh: 'छत्तीसगढ़', 'Dadra and Nagar Haveli and Daman and Diu': 'दादरा और नगर हवेली और दमन और दीव', Delhi: 'दिल्ली', Goa: 'गोवा', Gujarat: 'गुजरात', Haryana: 'हरियाणा', 'Himachal Pradesh': 'हिमाचल प्रदेश', 'Jammu and Kashmir': 'जम्मू और कश्मीर', Jharkhand: 'झारखंड', Karnataka: 'कर्नाटक', Kerala: 'केरल', Ladakh: 'लद्दाख', Lakshadweep: 'लक्षद्वीप', 'Madhya Pradesh': 'मध्य प्रदेश', Maharashtra: 'महाराष्ट्र', Manipur: 'मणिपुर', Meghalaya: 'मेघालय', Mizoram: 'मिज़ोरम', Nagaland: 'नागालैंड', Odisha: 'ओडिशा', Puducherry: 'पुडुचेरी', Punjab: 'पंजाब', Rajasthan: 'राजस्थान', Sikkim: 'सिक्किम', 'Tamil Nadu': 'तमिलनाडु', Telangana: 'तेलंगाना', Tripura: 'त्रिपुरा', 'Uttar Pradesh': 'उत्तर प्रदेश', Uttarakhand: 'उत्तराखंड', 'West Bengal': 'पश्चिम बंगाल' };
// Reference city for each state's calendar (capital, or the nearest place in the list).
const STATE_CITY = { 'Andaman and Nicobar': 'port-blair', 'Andhra Pradesh': 'vijayawada', 'Arunachal Pradesh': 'papum-pare', Assam: 'guwahati', Bihar: 'patna', Chandigarh: 'chandigarh', Chhattisgarh: 'raipur', 'Dadra and Nagar Haveli and Daman and Diu': 'daman', Delhi: 'delhi', Goa: 'panaji', Gujarat: 'gandhinagar', Haryana: 'panchkula', 'Himachal Pradesh': 'shimla', 'Jammu and Kashmir': 'srinagar', Jharkhand: 'ranchi', Karnataka: 'bengaluru', Kerala: 'thiruvananthapuram', Ladakh: 'leh', Lakshadweep: 'lakshadweep', 'Madhya Pradesh': 'bhopal', Maharashtra: 'mumbai', Manipur: 'imphal', Meghalaya: 'shillong', Mizoram: 'aizawl', Nagaland: 'kohima', Odisha: 'bhubaneswar', Puducherry: 'puducherry', Punjab: 'chandigarh', Rajasthan: 'jaipur', Sikkim: 'gangtok', 'Tamil Nadu': 'chennai', Telangana: 'hyderabad', Tripura: 'agartala', 'Uttar Pradesh': 'lucknow', Uttarakhand: 'dehradun', 'West Bengal': 'kolkata' };
const stateSlug = st => st.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let STATES_CACHE = null;
function states() {
  if (!STATES_CACHE) STATES_CACHE = [...new Set(C.cities.map(c => c.state))].sort().map(name => ({
    name, slug: stateSlug(name), hi: STATE_HI[name] || name,
    city: C.cities.find(c => c.slug === STATE_CITY[name]) || C.cities.find(c => c.state === name),
  }));
  return STATES_CACHE;
}
const stateName = (st, lang) => lang === 'hi' ? st.hi : st.name;
const stateMonthPath = (st, y, m) => `/moon-calendar/${st.slug}/${y}/${monthSlug(m)}/`;
// Is festival f observed in state st? (no `states` = all India)
const inState = (f, st) => !st || !f.states || f.states.includes(st.name);

function monthPage(y, m, lang, st = null) {
  const t = T[lang];
  const mName = (lang === 'hi' ? MONTH_HI : MONTH_EN)[m];
  const first = `${y}-${String(m + 1).padStart(2, '0')}-01`;
  const nDays = new Date(Date.UTC(Number(y), m + 1, 0)).getUTCDate();
  const startWd = S.weekday(first);
  const city = st ? st.city : DELHI();
  const cn = nm(city.name, lang);
  const path = (yy, mm) => st ? stateMonthPath(st, yy, mm) : monthPath(yy, mm);
  const festByDay = {};
  for (const f of C.festivals) {
    if (!inState(f, st)) continue;
    for (const o of C.occ[f.slug] || []) {
      if (['ekadashi', 'chandra-darshan'].includes(f.series)) continue;
      const k = o.holiKey || o.key;
      (festByDay[k] = festByDay[k] || []).push(occLabel(f, o, lang));
    }
  }
  let cells = Array.from({ length: startWd }, () => '<div class="c blank"></div>').join('');
  for (let d = 1; d <= nDays; d++) {
    const k = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const a = S.phaseAngle(S.istAt(k, 20));
    const T0 = S.tithiAt(S.sunrise(k, city));
    const fs = festByDay[k] || [];
    cells += `<div class="c${k === C.today ? ' today' : ''}"><div class="n">${d}</div>${moonSvg(a, { size: 30, cls: '', id: 'd' + d })}<div class="tt">${esc(tithiName(T0, lang))}</div><div class="tt muted">${esc(fmtTime(S.moonriseWithinDay(k, city), lang))}</div>${fs.length ? `<div class="fdot" title="${esc(fs.join(', '))}"></div><div class="tt" style="color:var(--accent);font-weight:600">${esc(fs.join(', '))}</div>` : ''}</div>`;
  }
  const monthFestList = Object.keys(festByDay).filter(k => k.startsWith(first.slice(0, 7))).sort().map(k => [k, festByDay[k].join(', ')]);
  const prev = m === 0 ? [String(Number(y) - 1), 11] : [y, m - 1];
  const next = m === 11 ? [String(Number(y) + 1), 0] : [y, m + 1];
  const inRange = (yy, mm) => C.monthList.some(([a, b]) => a === yy && b === mm);
  const wd = (lang === 'hi' ? WD_HI : WD_EN).map(w => w.slice(0, lang === 'hi' ? 2 : 3));
  const where = st ? stateName(st, lang) : (lang === 'hi' ? 'भारत' : 'India');
  const h1 = st ? (lang === 'hi' ? `${t.titleMonth(mName, y).split(' – ')[0]} – ${where}` : `${t.titleMonth(mName, y).split(' – ')[0]} – ${where}`) : t.titleMonth(mName, y);
  const crumbs = breadcrumbs([[t.navCalendar, url(lang, '/calendar/')], ...(st ? [[where, url(lang, stateMonthPath(st, y, m))]] : []), [`${mName} ${y}`]]);
  // State switcher: same month, any state (or all India)
  const opts = [`<option value="${url(lang, monthPath(y, m))}"${st ? '' : ' selected'}>${lang === 'hi' ? 'पूरा भारत (दिल्ली)' : 'All India (Delhi)'}</option>`]
    .concat(states().map(s2 => `<option value="${url(lang, stateMonthPath(s2, y, m))}"${st && st.slug === s2.slug ? ' selected' : ''}>${esc(stateName(s2, lang))}</option>`)).join('');
  const switcher = `<div class="picker"><select aria-label="${lang === 'hi' ? 'राज्य चुनें' : 'Choose your state'}" data-nav>${opts}</select></div>`;
  let body = hero({ lang, crumbs, eyebrow: t.monthlyCal, h1, sub: st ? (lang === 'hi' ? `${cn} के समय · ${where} के त्योहार` : `Times for ${cn} · festivals observed in ${where}`) : '', angle: S.phaseAngle(S.istAt(first, 20)), picker: switcher });
  body += `<div class="wrap">${adSlot()}
<div class="btn-row">${inRange(...prev) ? `<a class="btn ghost" href="${url(lang, path(...prev))}">← ${esc((lang === 'hi' ? MONTH_HI : MONTH_EN)[prev[1]])}</a>` : ''}${inRange(...next) ? `<a class="btn ghost" href="${url(lang, path(...next))}">${esc((lang === 'hi' ? MONTH_HI : MONTH_EN)[next[1]])} →</a>` : ''}</div>
<div class="mgrid">${wd.map(w => `<div class="h">${esc(w)}</div>`).join('')}${cells}</div>
${monthFestList.length ? `<h2>${esc(t.navFestivals)} – ${esc(mName)} ${y}${st ? ' · ' + esc(where) : ''}</h2><div class="table-wrap"><table><tbody>${monthFestList.map(([k, n]) => `<tr><td>${esc(fmtDate(k, lang, { year: false }))}</td><td>${esc(n)}</td></tr>`).join('')}</tbody></table></div>` : ''}
<p class="muted small" style="margin-top:10px">${lang === 'hi' ? `हर दिन: रात 8 बजे चाँद का आकार, सूर्योदय पर तिथि, ${cn} में चंद्रोदय।` : `Each day shows the moon's shape at 8 PM, the tithi at sunrise and moonrise in ${cn}.`}</p></div>`;
  const title = st ? (lang === 'hi' ? `${where} चंद्र कैलेंडर ${mName} ${y} – तिथि, चंद्रोदय और त्योहार` : `${where} Moon Calendar ${mName} ${y} – Tithi, Moonrise & Festivals`) : t.titleMonth(mName, y);
  const desc = st ? (lang === 'hi' ? `${mName} ${y} के हर दिन की चंद्र कला, तिथि, ${cn} में चंद्रोदय और ${where} के त्योहार।` : `Moon phase, tithi, moonrise in ${cn} and ${where} festivals for every day of ${mName} ${y}.`)
    : (lang === 'hi' ? `${mName} ${y} के हर दिन की चंद्र कला, तिथि, चंद्रोदय और त्योहार।` : `Moon phase, tithi, moonrise and festivals for every day of ${mName} ${y}.`);
  return page({ lang, path: path(y, m), title, desc, body, navActive: 'calendar' });
}

function calendarIndex(lang) {
  const t = T[lang];
  const years = C.years;
  const series = C.festivals.filter(f => f.type === 'series');
  let body = hero({ lang, eyebrow: t.navCalendar, h1: t.calendarTitle, angle: S.phaseAngle(S.istAt(C.today, 20)) });
  body += `<div class="wrap">${adSlot()}<h2>${esc(t.yearly)}</h2>${years.map(y => `<h3>${y}</h3><div class="pills">${series.map(f => `<a href="${url(lang, `/calendar/${f.slug}-${y}/`)}">${esc(nm(f.name, lang))} ${y}</a>`).join('')}</div>`).join('')}
<h2>${lang === 'hi' ? 'भाषा और राज्य के कैलेंडर' : 'Calendars by language and state'}</h2><p class="muted small">${lang === 'hi' ? 'हिंदी, मराठी, गुजराती, कन्नड़, तेलुगु, तमिल, मलयालम, बंगाली, ओड़िया, पंजाबी, असमिया और इस्लामी कैलेंडर – हर दिन की तिथि, मास और त्योहार।' : 'Hindi, Marathi, Gujarati, Kannada, Telugu, Tamil, Malayalam, Bengali, Odia, Punjabi, Assamese and Islamic calendars, with the date, tithi and festivals for every day.'}</p>${require('./regional').calLinks(lang)}
<h2>${lang === 'hi' ? 'चाँद' : 'The moon'}</h2><div class="pills"><a href="${url(lang, '/moon-today/')}">${lang === 'hi' ? 'आज का चाँद' : 'Moon today'}</a><a href="${url(lang, '/full-moon/')}">${lang === 'hi' ? 'पूर्णिमा की तारीखें' : 'Full moon dates'}</a><a href="${url(lang, '/new-moon/')}">${lang === 'hi' ? 'अमावस्या की तारीखें' : 'New moon dates'}</a></div>
<h2>${lang === 'hi' ? 'राज्य के अनुसार चंद्र कैलेंडर' : 'Moon calendar by state'}</h2><p class="muted small">${lang === 'hi' ? 'हर राज्य की राजधानी के समय और उस राज्य के त्योहार।' : 'Times for each state capital, with the festivals observed in that state.'}</p><div class="pills">${states().map(st => `<a href="${url(lang, stateMonthPath(st, C.today.slice(0, 4), Number(C.today.slice(5, 7)) - 1))}">${esc(stateName(st, lang))}</a>`).join('')}</div>
<h2>${esc(t.monthlyCal)}</h2>${years.map(y => `<h3>${y}</h3><div class="pills">${C.monthList.filter(([a]) => a === y).map(([a, b]) => `<a href="${url(lang, monthPath(a, b))}">${esc((lang === 'hi' ? MONTH_HI : MONTH_EN)[b])}</a>`).join('')}</div>`).join('')}</div>`;
  return page({ lang, path: '/calendar/', title: lang === 'hi' ? `कैलेंडर ${years[0]}: हिंदी, मराठी, गुजराती, तमिल और सभी राज्यों के पंचांग | ${t.siteName}` : `Calendar ${years[0]}: Hindi, Marathi, Gujarati, Tamil & All State Calendars | ${t.siteName}`, desc: lang === 'hi' ? 'हिंदी, मराठी, गुजराती, कन्नड़, तेलुगु, तमिल, मलयालम, बंगाली और अन्य कैलेंडर; पूर्णिमा, अमावस्या, एकादशी की सूचियाँ और मासिक चंद्र कैलेंडर।' : 'Hindi, Marathi, Gujarati, Kannada, Telugu, Tamil, Malayalam, Bengali and other regional calendars, plus Purnima, Amavasya and Ekadashi lists and monthly moon calendars.', body, navActive: 'calendar' });
}

module.exports = { ctx: () => C, nm, hero, occLabel, cityPicker, NAK_EN, NAK_HI, SIGN_EN, SIGN_HI, init, festivalPage, festCityPage, cityPage, citiesIndex, home, festivalsIndex, seriesYearPage, monthPage, monthPath, calendarIndex, hasCityPages, fcOk, fpath, fcpath, cpath, nextOcc, states, stateMonthPath };
