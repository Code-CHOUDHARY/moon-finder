// Astronomy + Hindu/Islamic calendar engine for Moon Finder.
// Uses astronomy-engine (MIT). All civil dates are Indian Standard Time (UTC+5:30).
'use strict';
const A = require('astronomy-engine');

const IST_MS = 330 * 60000;
const DAY_MS = 86400000;
const DELHI = { lat: 28.6139, lng: 77.209 };

/* ---------------- IST date helpers ---------------- */
// A "day key" is 'YYYY-MM-DD' in IST.
const dayKey = d => new Date(d.getTime() + IST_MS).toISOString().slice(0, 10);
const istMidnight = key => new Date(Date.parse(key + 'T00:00:00Z') - IST_MS);
const istAt = (key, h, m = 0) => new Date(istMidnight(key).getTime() + (h * 60 + m) * 60000);
const addDays = (key, n) => new Date(Date.parse(key + 'T00:00:00Z') + n * DAY_MS).toISOString().slice(0, 10);
const weekday = key => new Date(key + 'T00:00:00Z').getUTCDay(); // 0 = Sunday

/* ---------------- Basic astronomy ---------------- */
const observerCache = new Map();
function obs(loc) {
  const k = loc.lat + ',' + loc.lng;
  if (!observerCache.has(k)) observerCache.set(k, new A.Observer(loc.lat, loc.lng, 0));
  return observerCache.get(k);
}
function riseSet(body, loc, dir, from, limitDays = 1) {
  const t = A.SearchRiseSet(body, obs(loc), dir, A.MakeTime(from), limitDays);
  return t ? t.date : null;
}
const sunrise = (key, loc) => riseSet(A.Body.Sun, loc, +1, istMidnight(key));
const sunset = (key, loc) => riseSet(A.Body.Sun, loc, -1, istAt(key, 6));
// Moon events searched from a given IST hour of the day (default noon: evening festivals).
const moonrise = (key, loc, fromHour = 12) => riseSet(A.Body.Moon, loc, +1, istAt(key, fromHour));
const moonset = (key, loc, fromHour = 12) => riseSet(A.Body.Moon, loc, -1, istAt(key, fromHour));
const moonriseWithinDay = (key, loc) => { const t = riseSet(A.Body.Moon, loc, +1, istMidnight(key)); return t && dayKey(t) === key ? t : null; };
const moonsetWithinDay = (key, loc) => { const t = riseSet(A.Body.Moon, loc, -1, istMidnight(key)); return t && dayKey(t) === key ? t : null; };

const phaseAngle = d => A.MoonPhase(A.MakeTime(d)); // 0 new, 90 first quarter, 180 full
const illumination = d => A.Illumination(A.Body.Moon, A.MakeTime(d)).phase_fraction;
const tithiAt = d => Math.floor(phaseAngle(d) / 12) + 1; // 1..30
function moonAltAz(d, loc) {
  const t = A.MakeTime(d);
  const eq = A.Equator(A.Body.Moon, t, obs(loc), true, true);
  const h = A.Horizon(t, obs(loc), eq.ra, eq.dec, 'normal');
  return { alt: h.altitude, az: h.azimuth };
}
const elongation = d => A.AngleFromSun(A.Body.Moon, A.MakeTime(d));

function nextPhase(from, target) { // target degrees: 0 new, 180 full
  const t = A.SearchMoonPhase(target, A.MakeTime(from), 40);
  return t ? t.date : null;
}

/* ---------------- Lunar months (Amanta) ---------------- */
// Lahiri ayanamsa (approximation good to ~0.01 deg for this century).
const ayanamsa = d => 23.853 + (d.getTime() - Date.UTC(2000, 0, 1, 12)) / (365.25 * DAY_MS) * 0.013969;
const siderealSun = d => ((A.SunPosition(A.MakeTime(d)).elon - ayanamsa(d)) % 360 + 360) % 360;
const MONTHS = ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashvin', 'Kartika', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'];
const MONTHS_HI = ['चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्रपद', 'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'];

// Build lunar months between two dates. Each month: { start, end, index, adhika, tithi: [31 Dates] }
function lunarMonths(from, to) {
  const newMoons = [];
  let t = nextPhase(new Date(from.getTime() - 35 * DAY_MS), 0);
  while (t && t < new Date(to.getTime() + 35 * DAY_MS)) {
    newMoons.push(t);
    t = nextPhase(new Date(t.getTime() + 20 * DAY_MS), 0);
  }
  const months = [];
  for (let i = 0; i + 1 < newMoons.length; i++) {
    const start = newMoons[i], end = newMoons[i + 1];
    const sign = Math.floor(siderealSun(start) / 30);
    const nextSign = Math.floor(siderealSun(end) / 30);
    const index = (sign + 1) % 12;
    const adhika = sign === nextSign; // no sankranti inside this lunar month
    const tithi = [start];
    for (let k = 1; k < 30; k++) tithi.push(nextPhase(tithi[k - 1], k * 12));
    tithi.push(end);
    months.push({ start, end, index, adhika, name: MONTHS[index], nameHi: MONTHS_HI[index], tithi });
  }
  return months;
}

/* ---------------- Rule-based festival day selection ---------------- */
// Instant on a civil day (Delhi) used to decide whether a tithi "prevails".
function ruleInstant(rule, key) {
  switch (rule) {
    case 'sunrise': return sunrise(key, DELHI);
    case 'midday': { const a = sunrise(key, DELHI), b = sunset(key, DELHI); return new Date((a.getTime() + b.getTime()) / 2); }
    case 'sunset': return sunset(key, DELHI);
    case 'pradosh': return new Date(sunset(key, DELHI).getTime() + 48 * 60000);
    case 'moonrise': return moonrise(key, DELHI, 12) || istAt(key, 23, 59);
    // Nishita: middle of the night that follows this day (Maha Shivaratri, Krishna Janmashtami).
    case 'midnight': { const a = sunset(key, DELHI), b = sunrise(addDays(key, 1), DELHI); return new Date((a.getTime() + b.getTime()) / 2); }
    // Aparahna: fourth fifth of daytime (Vijayadashami).
    case 'aparahna': { const a = sunrise(key, DELHI), b = sunset(key, DELHI); return new Date(a.getTime() + (b - a) * 0.7); }
    default: throw new Error('rule ' + rule);
  }
}
const ruleCache = new Map();
const ruleAt = (rule, key) => { const k = rule + key; if (!ruleCache.has(k)) ruleCache.set(k, ruleInstant(rule, key)); return ruleCache.get(k); };

/* ---------------- Nakshatra & solar (sidereal) months — South Indian festivals ---------------- */
const NAK_SPAN = 360 / 27;
const siderealMoon = d => ((A.EclipticGeoMoon(A.MakeTime(d)).lon - ayanamsa(d)) % 360 + 360) % 360;
const nakshatraAt = d => Math.floor(siderealMoon(d) / NAK_SPAN); // 0 Ashwini … 26 Revati
const sunSign = d => Math.floor(siderealSun(d) / 30); // 0 Mesha … 11 Meena
// Next instant after `from` when angle fn (deg, increasing) passes `target`.
function nextAngle(fn, target, from, stepH, maxDays) {
  const g = t => ((fn(new Date(t)) - target) % 360 + 540) % 360 - 180;
  let t = from.getTime(), prev = g(t);
  for (let i = 0; i < maxDays * 24 / stepH; i++) {
    const t2 = t + stepH * 3600000, cur = g(t2);
    if (prev < 0 && cur >= 0 && cur - prev < 90) {
      let lo = t, hi = t2;
      for (let k = 0; k < 30; k++) { const mid = (lo + hi) / 2; if (g(mid) < 0) lo = mid; else hi = mid; }
      return new Date(hi);
    }
    t = t2; prev = cur;
  }
  return null;
}
// Start and end of the nakshatra running at instant d.
function nakshatraSpan(d) {
  const n = nakshatraAt(d);
  return { n, start: nextAngle(siderealMoon, n * NAK_SPAN, new Date(d.getTime() - 1.3 * DAY_MS), 1, 2), end: nextAngle(siderealMoon, ((n + 1) * NAK_SPAN) % 360, d, 1, 2) };
}
// Sankranti: Sun entering sidereal sign `sign` after `from`.
const sankranti = (sign, from) => nextAngle(siderealSun, sign * 30, from, 6, 400);
// Solar-month day rules. Tamil: a sankranti before sunset makes that day the 1st of the new month.
// Kerala: the cut-off is the end of the third fifth of daytime (madhyahna).
// Vishu style: the first sunrise after the sankranti (Vishukkani is seen at that dawn).
function solarCutoff(key, style) {
  if (style === 'kerala') { const a = sunrise(key, DELHI), b = sunset(key, DELHI); return new Date(a.getTime() + (b - a) * 0.6); }
  if (style === 'sunrise') return sunrise(key, DELHI);
  return sunset(key, DELHI);
}
const signCache = new Map();
// Solar month (sidereal sign) a civil day belongs to under the given regional rule.
function solarMonthOfDay(key, style = 'tamil') {
  const k = style + key;
  if (!signCache.has(k)) signCache.set(k, sunSign(solarCutoff(key, style)));
  return signCache.get(k);
}
// Civil day that is the 1st of solar month `sign`, for the sankranti after `from`.
function solarMonthStart(sign, from, style = 'tamil') {
  const t = sankranti(sign, from);
  const k = dayKey(t);
  return { day1: t < solarCutoff(k, style) ? k : addDays(k, 1), sankranti: t };
}
// Pick the civil day for tithi T (1..30) in lunar month m under the given rule.
function pickDay(m, T, rule) {
  const s = m.tithi[T - 1], e = m.tithi[T];
  const days = [];
  for (let k = dayKey(s); k <= dayKey(e); k = addDays(k, 1)) days.push(k);
  let best = null, bestDist = Infinity;
  for (const k of days) {
    const x = ruleAt(rule, k);
    if (x >= s && x < e) return { key: k, start: s, end: e };
    const dist = x < s ? s - x : x - e;
    if (dist < bestDist) { bestDist = dist; best = k; }
  }
  return { key: best, start: s, end: e };
}

/* ---------------- Lunar eclipses ---------------- */
function lunarEclipses(from, to) {
  const out = [];
  let e = A.SearchLunarEclipse(A.MakeTime(from));
  while (e.peak.date < to) {
    if (e.kind !== 'penumbral' || e.obscuration > 0) {
      const p = e.peak.date, m = min => new Date(p.getTime() + min * 60000);
      out.push({
        kind: e.kind, peak: p, obscuration: e.obscuration,
        penumbralStart: m(-e.sd_penum), penumbralEnd: m(e.sd_penum),
        partialStart: e.sd_partial ? m(-e.sd_partial) : null, partialEnd: e.sd_partial ? m(e.sd_partial) : null,
        totalStart: e.sd_total ? m(-e.sd_total) : null, totalEnd: e.sd_total ? m(e.sd_total) : null,
      });
    }
    e = A.NextLunarEclipse(e.peak);
  }
  return out;
}

/* ---------------- Islamic months (predicted for India) ---------------- */
const hijriFmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
function hijri(key) {
  const parts = hijriFmt.formatToParts(new Date(key + 'T12:00:00Z'));
  const g = t => Number(parts.find(p => p.type === t).value);
  return { y: g('year'), m: g('month'), d: g('day') };
}
// Crescent likely visible at Delhi on the evening of `key`?
function crescentCheck(key, loc = DELHI) {
  const ss = sunset(key, loc);
  const ms = moonset(key, loc, 12);
  const lag = ms ? (ms - ss) / 60000 : -1;
  const el = elongation(ss);
  const alt = moonAltAz(ss, loc).alt;
  const prevNew = nextPhase(new Date(ss.getTime() - 32 * DAY_MS), 0);
  let nm = prevNew; while (true) { const n2 = nextPhase(new Date(nm.getTime() + 20 * DAY_MS), 0); if (n2 > ss) break; nm = n2; }
  const ageH = (ss - nm) / 3600000;
  return { sunset: ss, moonset: ms, lag, elongation: el, alt, ageH, visible: lag >= 40 && el >= 10 && alt >= 5 && ageH >= 20 };
}
// India start of Hijri month M (1..12) occurring between from..to. Returns list of { day1, sightingEvening, hijriYear }.
function islamicMonthStarts(M, from, to) {
  const out = [];
  for (let k = addDays(dayKey(from), -40); k <= dayKey(to); k = addDays(k, 1)) {
    const h = hijri(k);
    if (h.m === M && h.d === 1) {
      // Saudi (Umm al-Qura) day 1 = k. Find the first evening on/after the eve of k where India could see the crescent.
      let ev = addDays(k, -1), chk;
      for (let i = 0; i < 3; i++) { chk = crescentCheck(ev); if (chk.visible) break; ev = addDays(ev, 1); }
      const day1 = addDays(ev, 1);
      if (Date.parse(day1) >= Date.parse(dayKey(from)) - 40 * DAY_MS) out.push({ day1, sightingEvening: ev, check: chk, hijriYear: h.y });
      k = addDays(k, 25);
    }
  }
  return out;
}

module.exports = {
  A, DELHI, DAY_MS, IST_MS, dayKey, istMidnight, istAt, addDays, weekday,
  sunrise, sunset, moonrise, moonset, moonriseWithinDay, moonsetWithinDay,
  phaseAngle, illumination, tithiAt, moonAltAz, elongation, nextPhase,
  lunarMonths, pickDay, lunarEclipses, islamicMonthStarts, crescentCheck, hijri, MONTHS, MONTHS_HI,
  ruleAt, siderealSun, siderealMoon, nakshatraAt, nakshatraSpan, sunSign, sankranti, solarMonthOfDay, solarMonthStart,
};
