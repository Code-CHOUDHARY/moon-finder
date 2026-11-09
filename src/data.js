// Computes every festival occurrence and per-city times.
'use strict';
const S = require('./astro');
const { FESTIVALS, ekadashiName } = require('./festivals');

function occurrences(fest, months, from, to) {
  const inRange = k => k >= S.dayKey(from) && k <= S.dayKey(to);
  const out = [];
  if (fest.type === 'hindu') {
    for (const m of months) if (m.index === fest.month && !m.adhika) {
      const p = S.pickDay(m, fest.tithi, fest.rule);
      if (inRange(p.key)) out.push({ key: p.key, tithiStart: p.start, tithiEnd: p.end, month: m });
    }
  } else if (fest.type === 'holi') {
    for (const m of months) if (m.index === fest.month && !m.adhika) {
      // Dhulandi: first day Pratipada prevails at midday (matches 2025 and 2026 panchangs); Holika Dahan the evening before.
      const p = S.pickDay(m, 16, 'midday');
      const holika = S.addDays(p.key, -1);
      const bhadraEnd = S.nextPhase(m.tithi[14], 174); // Vishti karana (Bhadra) = first half of Purnima, ends at 174°
      if (inRange(p.key)) out.push({ key: holika, holiKey: p.key, tithiStart: m.tithi[14], tithiEnd: m.tithi[15], bhadraEnd, month: m });
    }
  } else if (fest.type === 'series') {
    for (const m of months) {
      if (fest.series === 'chandra-darshan') {
        let k = S.dayKey(m.start);
        for (let i = 0; i < 4; i++, k = S.addDays(k, 1)) {
          const c = S.crescentCheck(k);
          if (c.visible) { if (inRange(k)) out.push({ key: k, month: m, check: c }); break; }
        }
        continue;
      }
      const tithis = fest.series === 'ekadashi' ? [11, 26] : [fest.tithi];
      for (const T of tithis) {
        const p = S.pickDay(m, T, fest.rule);
        if (!inRange(p.key)) continue;
        const o = { key: p.key, tithiStart: p.start, tithiEnd: p.end, month: m, T };
        const wd = S.weekday(p.key);
        if (fest.series === 'sankashti' && wd === 2) o.tag = 'angaraki';
        if (fest.series === 'amavasya' && wd === 1) o.tag = 'somvati';
        if (fest.series === 'amavasya' && wd === 6) o.tag = 'shani';
        if (fest.series === 'ekadashi') o.ekName = ekadashiName(m.index, T > 15, m.adhika);
        out.push(o);
      }
    }
  } else if (fest.type === 'islamic') {
    for (const s of S.islamicMonthStarts(fest.hmonth, new Date(from.getTime() - 40 * S.DAY_MS), to)) {
      const key = S.addDays(s.day1, fest.hday - 1);
      if (inRange(key)) out.push({ key, day1: s.day1, sightingEvening: s.sightingEvening, check: s.check, hijriYear: s.hijriYear });
    }
  } else if (fest.type === 'eclipse') {
    for (const e of S.lunarEclipses(from, new Date(to.getTime() + 2 * 365 * S.DAY_MS))) out.push({ key: S.dayKey(e.peak), eclipse: e });
  }
  out.sort((a, b) => a.key < b.key ? -1 : 1);
  return out;
}

// Times that matter for a festival occurrence in a given city.
function cityTimes(fest, occ, city) {
  const k = occ.key;
  switch (fest.key) {
    case 'moonrise': return { primary: S.moonrise(k, city, 12), sunset: S.sunset(k, city), sunrise: S.sunrise(k, city) };
    case 'avoid': return { primary: S.moonset(k, city, 12), morningRise: S.moonriseWithinDay(k, city), sunset: S.sunset(k, city) };
    case 'holi': return { primary: S.sunset(k, city), moonrise: S.moonrise(k, city, 12) };
    case 'amavasya': return { primary: S.sunset(k, city), sunrise: S.sunrise(k, city) };
    case 'tithi': return { primary: S.moonrise(k, city, 12), sunrise: S.sunrise(k, city), sunset: S.sunset(k, city) };
    case 'crescent': {
      const ev = occ.sightingEvening || k;
      const ss = S.sunset(ev, city), ms = S.moonset(ev, city, 12);
      return { primary: ss, moonset: ms, evening: ev, lag: ms ? Math.round((ms - ss) / 60000) : null };
    }
    case 'eclipse': return eclipseVisibility(occ.eclipse, city);
    default: return { primary: S.sunrise(k, city) };
  }
}

function eclipseVisibility(e, city) {
  const a = e.kind === 'penumbral' ? e.penumbralStart : e.partialStart;
  const b = e.kind === 'penumbral' ? e.penumbralEnd : e.partialEnd;
  let up = 0, n = 0;
  for (let t = a.getTime(); t <= b.getTime(); t += 5 * 60000, n++) if (S.moonAltAz(new Date(t), city).alt > 0) up++;
  const status = up === 0 ? 'not' : up === n ? 'visible' : 'partly';
  const rise = S.moonrise(S.dayKey(e.peak), city, 0);
  return { primary: e.peak, status, moonrise: rise, peakAlt: S.moonAltAz(e.peak, city).alt };
}

function computeAll(from, to) {
  const months = S.lunarMonths(from, to);
  const result = {};
  for (const f of FESTIVALS) result[f.slug] = occurrences(f, months, from, to);
  return { months, occ: result };
}

module.exports = { computeAll, cityTimes, FESTIVALS };
