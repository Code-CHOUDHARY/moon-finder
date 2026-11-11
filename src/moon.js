// Pages about the moon itself: the moon today, full moon dates, new moon dates.
'use strict';
const S = require('./astro');
const { T, fmtTime, fmtDate, tithiName, pakshaName } = require('./i18n');
const U = require('./ui');
const P = require('./pages');
const { esc, url, abs, page, adSlot, breadcrumbs, faqHtml, faqLd, phaseKey, shareButtons } = U;

const C = () => P.ctx();
const L = (lang, en, hi) => (lang === 'hi' ? hi : en);
const delhi = () => C().cities[0];
// Traditional English full-moon names by month
const MOON_NAMES = ['Wolf Moon', 'Snow Moon', 'Worm Moon', 'Pink Moon', 'Flower Moon', 'Strawberry Moon', 'Buck Moon', 'Sturgeon Moon', 'Corn Moon', "Hunter's Moon", 'Beaver Moon', 'Cold Moon'];

const moreLinks = lang => `<section class="section"><h2>${L(lang, 'More about the moon', 'चाँद के बारे में और')}</h2><div class="pills">
<a href="${url(lang, '/moon-today/')}">${L(lang, 'Moon today', 'आज का चाँद')}</a>
<a href="${url(lang, '/full-moon/')}">${L(lang, 'Full moon dates', 'पूर्णिमा की तारीखें')}</a>
<a href="${url(lang, '/new-moon/')}">${L(lang, 'New moon dates', 'अमावस्या की तारीखें')}</a>
<a href="${url(lang, '/moonrise/')}">${L(lang, 'Moonrise in your city', 'आपके शहर में चंद्रोदय')}</a>
<a href="${url(lang, '/chandra-grahan/')}">${L(lang, 'Lunar eclipse', 'चंद्र ग्रहण')}</a>
<a href="${url(lang, '/calendar/')}">${esc(T[lang].calendarTitle)}</a>
<a href="${url('en', '/moon-finder/')}">📷 ${esc(T[lang].findMoon)}</a></div></section>`;

/* ---------- Moon today ---------- */
function moonToday(lang) {
  const t = T[lang], k = C().today, city = delhi(), cn = P.nm(city.name, lang);
  const at = S.istAt(k, 20), angle = S.phaseAngle(at), ill = Math.round(S.illumination(at) * 100);
  const sr = S.sunrise(k, city), T0 = S.tithiAt(sr), nak = (lang === 'hi' ? P.NAK_HI : P.NAK_EN)[S.nakshatraAt(sr)];
  const rise = S.moonriseWithinDay(k, city), set = S.moonsetWithinDay(k, city);
  const full = S.nextPhase(C().now, 180), nw = S.nextPhase(C().now, 0);
  const phase = t[phaseKey(angle)], tithi = `${pakshaName(T0, lang)} ${tithiName(T0, lang)}`;
  const daysTo = d => Math.round((Date.parse(S.dayKey(d)) - Date.parse(k)) / S.DAY_MS);
  const A = {
    label: L(lang, 'Moon phase today', 'आज चाँद की कला'), big: `${phase} · ${ill}%`, date: fmtDate(k, lang), target: full,
    meta: [`${L(lang, 'Tithi', 'तिथि')}: ${tithi} · ${L(lang, 'Nakshatra', 'नक्षत्र')}: ${nak}`, `${t.moonrise} ${fmtTime(rise, lang)} · ${t.moonset} ${fmtTime(set, lang)} (${cn})`,
      `${L(lang, 'Next full moon', 'अगली पूर्णिमा')}: ${fmtDate(S.dayKey(full), lang, { year: false })} · ${L(lang, 'Next new moon', 'अगली अमावस्या')}: ${fmtDate(S.dayKey(nw), lang, { year: false })}`],
  };
  const crumbs = breadcrumbs([[t.navToday, url(lang, '/')], [L(lang, 'Moon today', 'आज का चाँद')]]);
  let body = P.hero({ lang, crumbs, eyebrow: t.moonTonight, h1: L(lang, 'Moon today: phase, moonrise time and tithi', 'आज का चाँद: कला, चंद्रोदय का समय और तिथि'), A, angle,
    picker: P.cityPicker(lang, { top: false, path: c => P.cpath(c) }),
    extraBtn: `<div class="btn-row"><a class="btn" href="${url('en', '/moon-finder/')}">📷 ${esc(t.findMoon)}</a></div>` });
  body += `<div class="wrap">${adSlot()}`;
  const cities = C().cities.filter(c => c.major).slice(0, 30);
  body += `<section class="section"><h2>${L(lang, 'Moonrise and moonset today in major cities', 'बड़े शहरों में आज चंद्रोदय और चंद्रास्त')}</h2><p class="muted small">${esc(fmtDate(k, lang))} · ${esc(t.allTimesIST)}</p>
<div class="table-wrap"><table><thead><tr><th>${esc(t.city)}</th><th>${esc(t.moonrise)}</th><th>${esc(t.moonset)}</th></tr></thead><tbody>
${cities.map(c => `<tr><td><a href="${url(lang, P.cpath(c))}">${esc(P.nm(c.name, lang))}</a></td><td class="t">${esc(fmtTime(S.moonriseWithinDay(k, c), lang))}</td><td>${esc(fmtTime(S.moonsetWithinDay(k, c), lang))}</td></tr>`).join('')}
</tbody></table></div><p style="margin-top:10px"><a href="${url(lang, '/moonrise/')}">${esc(t.allCities)} →</a></p></section>`;
  const days = Array.from({ length: 30 }, (_, i) => S.addDays(k, i));
  body += `<section class="section"><h2>${L(lang, 'Moon phase for the next 30 days', 'अगले 30 दिन चाँद की कला')}</h2>
<div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th><th>${L(lang, 'Phase', 'कला')}</th><th>${L(lang, 'Lit', 'रोशन')}</th><th>${L(lang, 'Tithi', 'तिथि')}</th><th>${esc(t.moonrise)} (${esc(cn)})</th></tr></thead><tbody>
${days.map(d => { const a = S.istAt(d, 20), an = S.phaseAngle(a), Td = S.tithiAt(S.sunrise(d, city)); return `<tr${d === k ? ' class="hl"' : ''}><td>${esc(fmtDate(d, lang, { year: false }))}</td><td>${esc(t[phaseKey(an)])}</td><td>${Math.round(S.illumination(a) * 100)}%</td><td>${esc(pakshaName(Td, lang) + ' ' + tithiName(Td, lang))}</td><td class="t">${esc(fmtTime(S.moonriseWithinDay(d, city), lang))}</td></tr>`; }).join('')}
</tbody></table></div><p class="muted small" style="margin-top:10px">${L(lang, 'Phase and lit percentage are for 8 PM IST; tithi is the one running at sunrise.', 'कला और रोशन प्रतिशत रात 8 बजे (IST) के हैं; तिथि सूर्योदय के समय की है।')}</p></section>`;
  const faq = [
    [L(lang, 'What is the moon phase today?', 'आज चाँद की कौन-सी कला है?'), L(lang, `Today (${fmtDate(k, 'en')}) the moon is a ${phase}, about ${ill}% lit. The tithi at sunrise is ${tithi}.`, `आज (${fmtDate(k, 'hi')}) चाँद ${phase} है, लगभग ${ill}% रोशन। सूर्योदय पर तिथि ${tithi} है।`)],
    [L(lang, 'Is it a full moon tonight?', 'क्या आज पूर्णिमा है?'), daysTo(full) === 0 ? L(lang, `Yes. The moon is full today at ${fmtTime(full, 'en')} IST.`, `हाँ। आज ${fmtTime(full, 'hi')} (IST) पर पूर्णिमा है।`) : L(lang, `No. The next full moon is on ${fmtDate(S.dayKey(full), 'en')} at ${fmtTime(full, 'en')} IST, ${daysTo(full)} days from now.`, `नहीं। अगली पूर्णिमा ${fmtDate(S.dayKey(full), 'hi')} को ${fmtTime(full, 'hi')} (IST) पर है, यानी ${daysTo(full)} दिन बाद।`)],
    [L(lang, 'What time will the moon rise today?', 'आज चाँद कितने बजे निकलेगा?'), L(lang, `In ${cn} the moon rises at ${fmtTime(rise, 'en')} and sets at ${fmtTime(set, 'en')} today. The time changes from city to city; pick your city above for the exact time.`, `${cn} में आज चंद्रोदय ${fmtTime(rise, 'hi')} और चंद्रास्त ${fmtTime(set, 'hi')} पर है। हर शहर में समय अलग होता है; सटीक समय के लिए ऊपर अपना शहर चुनें।`)],
  ];
  body += `<section class="section"><h2>${esc(t.faqs)}</h2>${faqHtml(faq)}</section>`;
  body += shareButtons(L(lang, `🌙 Moon today: ${phase}, ${ill}% lit. Moonrise in ${cn} ${fmtTime(rise, lang)}.`, `🌙 आज का चाँद: ${phase}, ${ill}% रोशन। ${cn} में चंद्रोदय ${fmtTime(rise, lang)}।`), abs(lang, '/moon-today/'), lang);
  body += moreLinks(lang) + `</div>`;
  return page({
    lang, path: '/moon-today/', body, navActive: 'today', ld: [faqLd(faq)],
    title: L(lang, `Moon Today (${fmtDate(k, 'en', { weekday: false })}): Phase, Moonrise Time & Tithi`, `आज का चाँद (${fmtDate(k, 'hi', { weekday: false })}): कला, चंद्रोदय समय और तिथि`),
    desc: L(lang, `Today's moon is a ${phase}, ${ill}% lit. Moonrise and moonset times for Indian cities, today's tithi and nakshatra, and the moon phase for the next 30 days.`, `आज चाँद ${phase} है, ${ill}% रोशन। भारत के शहरों में चंद्रोदय और चंद्रास्त का समय, आज की तिथि और नक्षत्र, और अगले 30 दिन की चंद्र कला।`),
  });
}

/* ---------- Full moon / new moon lists ---------- */
function phaseList(kind) {
  const [y0, y1] = C().years;
  const list = C().months.map(m => (kind === 'full' ? { at: m.tithi[15], m } : { at: m.end, m })).filter(x => { const y = S.dayKey(x.at).slice(0, 4); return y === y0 || y === y1; });
  const seen = {};
  for (const x of list) {
    x.key = S.dayKey(x.at);
    const ym = x.key.slice(0, 7);
    x.blue = kind === 'full' && !!seen[ym]; seen[ym] = true;
  }
  return list;
}
function phasePage(kind, lang) {
  const t = T[lang], full = kind === 'full', city = delhi(), cn = P.nm(city.name, lang);
  const path = full ? '/full-moon/' : '/new-moon/';
  const list = phaseList(kind), next = list.find(x => x.at > C().now) || list[list.length - 1];
  const hindu = x => `${lang === 'hi' ? x.m.nameHi : x.m.name}${x.m.adhika ? ' (' + t.adhika + ')' : ''} ${full ? L(lang, 'Purnima', 'पूर्णिमा') : L(lang, 'Amavasya', 'अमावस्या')}`;
  const eng = x => (x.blue ? 'Blue Moon' : MOON_NAMES[Number(x.key.slice(5, 7)) - 1]);
  const word = full ? L(lang, 'full moon', 'पूर्णिमा') : L(lang, 'new moon', 'अमावस्या');
  const Word = full ? L(lang, 'Full moon', 'पूर्णिमा') : L(lang, 'New moon', 'अमावस्या');
  const y = C().today.slice(0, 4);
  const riseOf = x => S.moonrise(x.key, city, 12);
  const A = {
    label: L(lang, `Next ${word}`, `अगली ${word}`), big: fmtDate(next.key, lang, { year: false }), date: L(lang, `Exact at ${fmtTime(next.at, lang)} IST, ${next.key.slice(0, 4)}`, `सटीक समय ${fmtTime(next.at, lang)} (IST), ${next.key.slice(0, 4)}`), target: next.at,
    meta: [hindu(next) + (full && lang === 'en' ? ` · ${eng(next)}` : ''), full ? `${t.moonrise} (${cn}): ${fmtTime(riseOf(next), lang)}` : t.noMoon],
  };
  const crumbs = breadcrumbs([[t.navToday, url(lang, '/')], [L(lang, 'Moon today', 'आज का चाँद'), url(lang, '/moon-today/')], [Word]]);
  let body = P.hero({ lang, crumbs, eyebrow: full ? L(lang, 'Purnima calendar', 'पूर्णिमा कैलेंडर') : L(lang, 'Amavasya calendar', 'अमावस्या कैलेंडर'),
    h1: full ? L(lang, `Full moon ${y}: when is the next full moon?`, `पूर्णिमा ${y}: अगली पूर्णिमा कब है?`) : L(lang, `New moon ${y}: when is the next new moon?`, `अमावस्या ${y}: अगली अमावस्या कब है?`), A, angle: full ? 180 : 0,
    picker: full ? P.cityPicker(lang, { top: true, path: c => `/purnima/${c.slug}/` }) : '' });
  body += `<div class="wrap">${adSlot()}`;
  for (const yy of C().years) {
    const rows = list.filter(x => x.key.startsWith(yy));
    body += `<section class="section"><h2>${L(lang, `${Word} dates ${yy}`, `${yy} में ${word} की तारीखें`)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(t.date)}</th><th>${L(lang, 'Exact time (IST)', 'सटीक समय (IST)')}</th><th>${L(lang, 'Name', 'नाम')}</th>${full ? `<th>${esc(t.moonrise)} (${esc(cn)})</th>` : ''}</tr></thead><tbody>
${rows.map(x => `<tr${x === next ? ' class="hl"' : ''}><td>${esc(fmtDate(x.key, lang, { year: false }))}</td><td class="t">${esc(fmtTime(x.at, lang))}</td><td>${esc(hindu(x))}${full ? `<br><span class="muted small">${esc(eng(x))}</span>` : ''}</td>${full ? `<td>${esc(fmtTime(riseOf(x), lang))}</td>` : ''}</tr>`).join('')}
</tbody></table></div></section>`;
  }
  body += `<p class="muted small">${full
    ? L(lang, 'The date is the day on which the moon is exactly full in Indian time. The Purnima fast or festival can be observed a day earlier when the tithi starts the previous evening; see the Purnima page for the observed dates.', 'तारीख वह दिन है जब भारतीय समय के अनुसार चाँद ठीक पूर्ण होता है। जब तिथि पिछली शाम शुरू हो जाती है तो पूर्णिमा का व्रत या पर्व एक दिन पहले हो सकता है; मनाई जाने वाली तारीखों के लिए पूर्णिमा पेज देखें।')
    : L(lang, 'The date is the day of the exact new moon in Indian time. Amavasya observances follow the tithi and can fall a day earlier; see the Amavasya page for the observed dates.', 'तारीख भारतीय समय के अनुसार ठीक अमावस्या का दिन है। अमावस्या के कर्म तिथि के अनुसार होते हैं और एक दिन पहले पड़ सकते हैं; मनाई जाने वाली तारीखों के लिए अमावस्या पेज देखें।')}</p>
<div class="pills">${C().years.map(yy => `<a href="${url(lang, `/calendar/${full ? 'purnima' : 'amavasya'}-${yy}/`)}">${full ? L(lang, 'Purnima', 'पूर्णिमा') : L(lang, 'Amavasya', 'अमावस्या')} ${yy}</a>`).join('')}<a href="${url(lang, full ? '/purnima/' : '/amavasya/')}">${full ? L(lang, 'Purnima: moonrise in your city', 'पूर्णिमा: आपके शहर में चंद्रोदय') : L(lang, 'About Amavasya', 'अमावस्या के बारे में')}</a></div>${adSlot()}`;
  const nd = fmtDate(next.key, lang), nt = fmtTime(next.at, lang);
  const faq = full ? [
    [L(lang, 'When is the next full moon?', 'अगली पूर्णिमा कब है?'), L(lang, `The next full moon is on ${nd} at ${nt} IST (${hindu(next)}).`, `अगली पूर्णिमा ${nd} को ${nt} (IST) पर है (${hindu(next)})।`)],
    [L(lang, 'How often is there a full moon?', 'पूर्णिमा कितने दिन में आती है?'), L(lang, 'About every 29.5 days, so most years have 12 full moons and some have 13.', 'लगभग हर 29.5 दिन में, इसलिए ज़्यादातर वर्षों में 12 और कुछ में 13 पूर्णिमा होती हैं।')],
    [L(lang, 'What time does the full moon rise?', 'पूर्णिमा का चाँद कितने बजे निकलता है?'), L(lang, `Close to sunset. On ${nd} the moon rises in ${cn} at ${fmtTime(riseOf(next), lang)}; choose your city above for the local time.`, `सूर्यास्त के आस-पास। ${nd} को ${cn} में चंद्रोदय ${fmtTime(riseOf(next), lang)} पर है; अपने शहर का समय देखने के लिए ऊपर शहर चुनें।`)],
  ] : [
    [L(lang, 'When is the next new moon?', 'अगली अमावस्या कब है?'), L(lang, `The next new moon is on ${nd} at ${nt} IST (${hindu(next)}).`, `अगली अमावस्या ${nd} को ${nt} (IST) पर है (${hindu(next)})।`)],
    [L(lang, 'Can you see the moon on a new moon night?', 'क्या अमावस्या की रात चाँद दिखता है?'), L(lang, 'No. At new moon the moon is close to the Sun in the sky and its lit side faces away from the Earth. A thin crescent appears in the west one or two evenings later.', 'नहीं। अमावस्या पर चाँद आसमान में सूर्य के पास होता है और उसका रोशन हिस्सा पृथ्वी से दूसरी ओर होता है। एक-दो शाम बाद पश्चिम में पतला चाँद दिखता है।')],
  ];
  body += `<section class="section"><h2>${esc(t.faqs)}</h2>${faqHtml(faq)}</section>${moreLinks(lang)}</div>`;
  return page({
    lang, path, body, navActive: 'calendar', ld: [faqLd(faq)],
    title: full ? L(lang, `Full Moon ${y}: Next Full Moon Date & Time in India (Purnima)`, `पूर्णिमा ${y}: अगली पूर्णिमा कब है – तारीख और समय`) : L(lang, `New Moon ${y}: Next New Moon Date & Time in India (Amavasya)`, `अमावस्या ${y}: अगली अमावस्या कब है – तारीख और समय`),
    desc: L(lang, `The next ${word} is on ${nd} at ${nt} IST. All ${word} dates for ${C().years.join(' and ')} with exact times${full ? ', Purnima names and moonrise' : ' and Amavasya names'}.`, `अगली ${word} ${nd} को ${nt} (IST) पर है। ${C().years.join(' और ')} की सभी ${word} तारीखें, सटीक समय${full ? ', नाम और चंद्रोदय' : ' और नाम'} सहित।`),
  });
}

module.exports = { moonToday, fullMoon: lang => phasePage('full', lang), newMoon: lang => phasePage('new', lang) };
