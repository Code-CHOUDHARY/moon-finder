// UI strings and IST formatting for English and Hindi.
'use strict';
const { IST_MS } = require('./astro');

const T = {
  en: {
    siteName: 'Moon Finder', tagline: 'Moonrise times for every Indian festival',
    navToday: 'Today', navFestivals: 'Festivals', navCalendar: 'Calendar', navCities: 'Cities', navFinder: 'Find the Moon', otherLang: 'हिंदी',
    moonrise: 'Moonrise', moonset: 'Moonset', sunrise: 'Sunrise', sunset: 'Sunset', date: 'Date', day: 'Day', city: 'City', state: 'State', notes: 'Notes', time: 'Time',
    pickCity: 'Pick your city', nearMe: 'Use my location', searchCity: 'Search your city…', allCities: 'All cities',
    in: 'in', today: 'Today', tomorrow: 'Tomorrow', started: 'Started', ago: 'ago', countdownTo: 'Starts',
    tithiStarts: 'Tithi begins', tithiEnds: 'Tithi ends', lunarMonth: 'Hindu month', paksha: 'Paksha',
    shukla: 'Shukla', krishna: 'Krishna', adhika: 'Adhika',
    about: 'About this festival', rituals: 'How it is observed', faqs: 'Questions people ask',
    allDates: 'All dates', related: 'More festivals', share: 'Share on WhatsApp', copyLink: 'Copy link',
    upcoming: 'Upcoming festivals', nextFestival: 'Next festival', findMoon: 'Find the moon in the sky now',
    moonTonight: 'The moon today', lit: 'lit', phaseNew: 'New Moon', phaseWaxC: 'Waxing Crescent', phaseFQ: 'First Quarter', phaseWaxG: 'Waxing Gibbous', phaseFull: 'Full Moon', phaseWanG: 'Waning Gibbous', phaseLQ: 'Last Quarter', phaseWanC: 'Waning Crescent',
    next7: 'Moonrise and moonset for the next 7 days', festivalsInCity: 'Festival moon times in', citiesTitle: 'Moonrise time in your city',
    eclipseVisible: 'Visible', eclipsePartly: 'Partly visible', eclipseNot: 'Not visible', eclipseKind: { total: 'Total lunar eclipse', partial: 'Partial lunar eclipse', penumbral: 'Penumbral lunar eclipse' },
    eclipseStart: 'Eclipse begins', eclipsePeak: 'Maximum eclipse', eclipseEnd: 'Eclipse ends', totalityStart: 'Totality begins', totalityEnd: 'Totality ends', penumbralStart: 'Penumbral phase begins', penumbralEnd: 'Penumbral phase ends',
    noEclipse: 'No lunar eclipse in the coming years is listed yet.',
    sightingEvening: 'Expected moon-sighting evening', predicted: 'Predicted for India', lookWest: 'Look west after sunset',
    holikaDahan: 'Holika Dahan', holiDay: 'Holi (colours)', afterSunset: 'after sunset',
    avoidUntil: 'Avoid seeing the moon until', moonriseMorning: 'Moon rises (morning)',
    noMoon: 'No moon in the night sky (Amavasya)',
    calendarTitle: 'Moon & festival calendar', monthlyCal: 'Monthly moon calendar', yearly: 'Yearly lists',
    learn: 'Learn', more: 'More', disclaimerShort: 'Times are calculated for each city\'s centre and a flat horizon. Festival dates follow common North Indian panchang rules; regional calendars and moon-sighting committees can differ by a day.',
    updated: 'Updated', allTimesIST: 'All times in IST', topCities: 'Moonrise in major cities', majorCities: 'Major cities', filterCities: 'Filter cities…',
    nearby: 'Nearby cities', backTo: 'Back to', seeAllCities: 'See all cities', viewFestival: 'Full details',
    angaraki: 'Angaraki', somvati: 'Somvati', shani: 'Shani',
    visibleNow: 'Up now', ekadashiName: 'Ekadashi',
    whatsappText: (f, c, t) => `${f} ${c ? 'in ' + c : ''}: ${t}`,
    timeFor: (what, city) => `${what} in ${city}`,
    titleFestival: (n, y) => `${n} ${y}: Date, Moonrise Time in Your City`,
    titleFestCity: (n, y, c) => `${n} ${y} Moonrise Time in ${c} – Chand Kab Niklega`,
    titleFestCityNoMoon: (n, y, c) => `${n} ${y} in ${c}: Date and Timings`,
    titleCity: c => `Moon Rise Time in ${c} Today – Moonrise, Moonset | Aaj Chand Kab Niklega`,
    h1City: c => `Moonrise & Moonset Time in ${c} Today`,
    titleSeriesYear: (n, y) => `${n} ${y} Dates – Full List with Timings`,
    titleMonth: (m, y) => `Moon Calendar ${m} ${y} – Phases, Tithi and Moonrise`,
    descFestival: (n, d) => `${n} falls on ${d}. See the exact moonrise time for your city, tithi timings, rituals and FAQs.`,
    descFestCity: (n, d, c, t) => `${n} on ${d}: moon time in ${c} is ${t} (IST). Countdown, nearby cities and how to observe the fast.`,
    descCity: c => `Moon rise time in ${c} today, moonset time, moon phase and live moon position, the next 7 days and festival moon times. Aaj ${c} mein chand kab niklega.`,
  },
  hi: {
    siteName: 'मून फ़ाइंडर', tagline: 'हर भारतीय त्योहार पर चंद्रोदय का समय',
    navToday: 'आज', navFestivals: 'त्योहार', navCalendar: 'कैलेंडर', navCities: 'शहर', navFinder: 'चाँद खोजें', otherLang: 'English',
    moonrise: 'चंद्रोदय', moonset: 'चंद्रास्त', sunrise: 'सूर्योदय', sunset: 'सूर्यास्त', date: 'तारीख', day: 'दिन', city: 'शहर', state: 'राज्य', notes: 'टिप्पणी', time: 'समय',
    pickCity: 'अपना शहर चुनें', nearMe: 'मेरी लोकेशन से', searchCity: 'अपना शहर खोजें…', allCities: 'सभी शहर',
    in: 'बाकी', today: 'आज', tomorrow: 'कल', started: 'शुरू हो चुका', ago: 'पहले', countdownTo: 'शुरू',
    tithiStarts: 'तिथि आरंभ', tithiEnds: 'तिथि समाप्त', lunarMonth: 'हिंदू मास', paksha: 'पक्ष',
    shukla: 'शुक्ल', krishna: 'कृष्ण', adhika: 'अधिक',
    about: 'त्योहार के बारे में', rituals: 'कैसे मनाते हैं', faqs: 'अक्सर पूछे जाने वाले सवाल',
    allDates: 'सभी तारीखें', related: 'अन्य त्योहार', share: 'WhatsApp पर शेयर करें', copyLink: 'लिंक कॉपी करें',
    upcoming: 'आने वाले त्योहार', nextFestival: 'अगला त्योहार', findMoon: 'अभी आसमान में चाँद खोजें',
    moonTonight: 'आज का चाँद', lit: 'रोशन', phaseNew: 'अमावस्या', phaseWaxC: 'बढ़ता अर्धचंद्र', phaseFQ: 'शुक्ल अष्टमी (आधा चाँद)', phaseWaxG: 'बढ़ता चाँद', phaseFull: 'पूर्णिमा', phaseWanG: 'घटता चाँद', phaseLQ: 'कृष्ण अष्टमी (आधा चाँद)', phaseWanC: 'घटता अर्धचंद्र',
    next7: 'अगले 7 दिन का चंद्रोदय और चंद्रास्त', festivalsInCity: 'त्योहारों पर चाँद का समय –', citiesTitle: 'आपके शहर में चंद्रोदय का समय',
    eclipseVisible: 'दिखेगा', eclipsePartly: 'आंशिक रूप से दिखेगा', eclipseNot: 'नहीं दिखेगा', eclipseKind: { total: 'पूर्ण चंद्र ग्रहण', partial: 'आंशिक चंद्र ग्रहण', penumbral: 'उपच्छाया चंद्र ग्रहण' },
    eclipseStart: 'ग्रहण आरंभ', eclipsePeak: 'परमग्रास', eclipseEnd: 'ग्रहण समाप्त', totalityStart: 'पूर्णता आरंभ', totalityEnd: 'पूर्णता समाप्त', penumbralStart: 'उपच्छाया आरंभ', penumbralEnd: 'उपच्छाया समाप्त',
    noEclipse: 'आने वाले वर्षों का कोई चंद्र ग्रहण अभी सूची में नहीं है।',
    sightingEvening: 'चाँद दिखने की संभावित शाम', predicted: 'भारत के लिए अनुमान', lookWest: 'सूर्यास्त के बाद पश्चिम में देखें',
    holikaDahan: 'होलिका दहन', holiDay: 'होली (रंग)', afterSunset: 'सूर्यास्त के बाद',
    avoidUntil: 'इस समय तक चाँद न देखें', moonriseMorning: 'चंद्रोदय (सुबह)',
    noMoon: 'रात में चाँद नहीं दिखेगा (अमावस्या)',
    calendarTitle: 'चाँद और त्योहार कैलेंडर', monthlyCal: 'मासिक चंद्र कैलेंडर', yearly: 'वार्षिक सूचियाँ',
    learn: 'जानें', more: 'और', disclaimerShort: 'समय हर शहर के केंद्र और समतल क्षितिज के लिए गणना किए गए हैं। त्योहार की तारीखें उत्तर भारतीय पंचांग के सामान्य नियमों पर आधारित हैं; क्षेत्रीय पंचांग और चाँद कमेटियों में एक दिन का अंतर हो सकता है।',
    updated: 'अपडेट', allTimesIST: 'सभी समय IST में', topCities: 'बड़े शहरों में चंद्रोदय', majorCities: 'बड़े शहर', filterCities: 'शहर खोजें…',
    nearby: 'आस-पास के शहर', backTo: 'वापस', seeAllCities: 'सभी शहर देखें', viewFestival: 'पूरी जानकारी',
    angaraki: 'अंगारकी', somvati: 'सोमवती', shani: 'शनि',
    visibleNow: 'अभी आसमान में', ekadashiName: 'एकादशी',
    whatsappText: (f, c, t) => `${f} ${c ? c + ' में' : ''}: ${t}`,
    timeFor: (what, city) => `${city} में ${what}`,
    titleFestival: (n, y) => `${n} ${y}: तारीख और आपके शहर में चंद्रोदय का समय`,
    titleFestCity: (n, y, c) => `${n} ${y}: ${c} में चाँद कब निकलेगा – चंद्रोदय समय`,
    titleFestCityNoMoon: (n, y, c) => `${n} ${y} ${c} में: तारीख और समय`,
    titleCity: c => `${c} में आज चाँद कब निकलेगा – चंद्रोदय और चंद्रास्त का समय`,
    h1City: c => `${c} में आज चंद्रोदय और चंद्रास्त का समय`,
    titleSeriesYear: (n, y) => `${n} ${y} की तारीखें – पूरी सूची और समय`,
    titleMonth: (m, y) => `चंद्र कैलेंडर ${m} ${y} – चाँद की कलाएँ, तिथि और चंद्रोदय`,
    descFestival: (n, d) => `${n} ${d} को है। अपने शहर में चंद्रोदय का सटीक समय, तिथि, पूजा विधि और सवाल-जवाब देखें।`,
    descFestCity: (n, d, c, t) => `${n} ${d} को: ${c} में चाँद का समय ${t} (IST)। काउंटडाउन, आस-पास के शहर और व्रत की जानकारी।`,
    descCity: c => `आज ${c} में चाँद कितने बजे निकलेगा: चंद्रोदय और चंद्रास्त का समय, चाँद की कला, अगले 7 दिन और त्योहारों पर चाँद का समय।`,
  },
};

const MONTH_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_HI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
const WD_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WD_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const TITHI_EN = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'];
const TITHI_HI = ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा'];

function ist(d) { const x = new Date(d.getTime() + IST_MS); return { y: x.getUTCFullYear(), m: x.getUTCMonth(), d: x.getUTCDate(), h: x.getUTCHours(), mi: x.getUTCMinutes(), wd: x.getUTCDay() }; }

function fmtTime(d, lang) {
  if (!d) return '—';
  const p = ist(d);
  const mm = String(p.mi).padStart(2, '0');
  if (lang === 'hi') {
    const h12 = ((p.h + 11) % 12) + 1;
    const part = p.h < 4 ? 'रात' : p.h < 12 ? 'सुबह' : p.h < 16 ? 'दोपहर' : p.h < 19 ? 'शाम' : 'रात';
    return `${part} ${h12}:${mm}`;
  }
  const h12 = ((p.h + 11) % 12) + 1;
  return `${h12}:${mm} ${p.h < 12 ? 'AM' : 'PM'}`;
}
// key 'YYYY-MM-DD'
function fmtDate(key, lang, opts = {}) {
  const [y, m, d] = key.split('-').map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  if (lang === 'hi') return `${opts.weekday === false ? '' : WD_HI[wd] + ', '}${d} ${MONTH_HI[m - 1]}${opts.year === false ? '' : ' ' + y}`;
  return `${opts.weekday === false ? '' : WD_EN[wd] + ', '}${d} ${MONTH_EN[m - 1]}${opts.year === false ? '' : ' ' + y}`;
}
const fmtShort = (key, lang) => { const [, m, d] = key.split('-').map(Number); return `${d} ${(lang === 'hi' ? MONTH_HI : MONTH_EN)[m - 1].slice(0, lang === 'hi' ? 99 : 3)}`; };
// A date+time across days: "Thu 29 Oct, 8:14 PM"
function fmtDateTime(d, lang) {
  const p = ist(d);
  const key = `${p.y}-${String(p.m + 1).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
  const wd = (lang === 'hi' ? WD_HI : WD_EN)[p.wd];
  return `${lang === 'hi' ? wd : wd.slice(0, 3)} ${fmtShort(key, lang)}, ${fmtTime(d, lang)}`;
}
function tithiName(T, lang) {
  const names = lang === 'hi' ? TITHI_HI : TITHI_EN;
  if (T === 30) return lang === 'hi' ? 'अमावस्या' : 'Amavasya';
  const paksha = T <= 15 ? T : T - 15;
  return names[paksha - 1];
}
const pakshaName = (T, lang) => (T <= 15 ? (lang === 'hi' ? 'शुक्ल' : 'Shukla') : (lang === 'hi' ? 'कृष्ण' : 'Krishna'));

module.exports = { T, MONTH_EN, MONTH_HI, WD_EN, WD_HI, fmtTime, fmtDate, fmtShort, fmtDateTime, tithiName, pakshaName, ist };
