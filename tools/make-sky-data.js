#!/usr/bin/env node
// Builds assets/sky.json (stars, constellation lines and names) for the Star Finder page.
// Source: d3-celestial data (BSD-3-Clause, (c) Olaf Frohn); star positions from XHIP / Hipparcos,
// constellation lines and names after the IAU. Run once, only when the data needs to change:
//   npm pack d3-celestial && tar xzf d3-celestial-*.tgz && node tools/make-sky-data.js package/data
'use strict';
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
if (!dir) { console.error('Usage: node tools/make-sky-data.js <d3-celestial data folder>'); process.exit(1); }
const read = f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const MAG_LIMIT = 5.5;
const r2 = x => Math.round(x * 100) / 100;
const ra = lon => r2(lon < 0 ? lon + 360 : lon); // GeoJSON longitude (-180..180) -> right ascension in degrees

// Indian names for well-known stars and constellations
const STAR_IN = { Aldebaran: 'Rohini', Betelgeuse: 'Ardra', Pollux: 'Punarvasu', Regulus: 'Magha', Spica: 'Chitra', Arcturus: 'Swati',
  Antares: 'Jyeshtha', Altair: 'Shravana', Alcyone: 'Krittika', Polaris: 'Dhruva tara', Canopus: 'Agastya', Sirius: 'Lubdhak',
  Vega: 'Abhijit', Mizar: 'Vasishtha', Alcor: 'Arundhati' };
const CON_IN = { Ari: 'Mesh', Tau: 'Vrishabh', Gem: 'Mithun', Cnc: 'Kark', Leo: 'Simha', Vir: 'Kanya', Lib: 'Tula', Sco: 'Vrishchik',
  Sgr: 'Dhanu', Cap: 'Makar', Aqr: 'Kumbh', Psc: 'Meen', UMa: 'Saptarishi', Ori: 'Mriga', UMi: 'Dhruva Matsya' };

const names = read('starnames.json');
const stars = read('stars.6.json').features
  .filter(f => f.properties.mag <= MAG_LIMIT)
  .sort((a, b) => a.properties.mag - b.properties.mag)
  .map(f => {
    const [lon, dec] = f.geometry.coordinates, n = names[String(f.id)], bv = parseFloat(f.properties.bv);
    // [right ascension°, declination°, magnitude, colour index B−V, proper name or '', constellation id or '']
    const name = n && n.name ? (STAR_IN[n.name] ? `${n.name} (${STAR_IN[n.name]})` : n.name) : '';
    return [ra(lon), r2(dec), r2(f.properties.mag), Number.isFinite(bv) ? r2(bv) : 0.6, name, (n && n.c) || ''];
  });
const lines = {};
for (const f of read('constellations.lines.json').features)
  lines[f.id] = (lines[f.id] || []).concat(f.geometry.coordinates.map(l => l.map(([lon, dec]) => [ra(lon), r2(dec)])));
const seen = new Set(), cons = [];
for (const f of read('constellations.json').features) {
  if (seen.has(f.id)) continue; seen.add(f.id);
  const [lon, dec] = f.geometry.coordinates;
  cons.push([f.id, f.properties.name, CON_IN[f.id] || '', ra(lon), r2(dec), Number(f.properties.rank) || 3]);
}
const out = { source: 'd3-celestial (BSD-3-Clause, (c) Olaf Frohn): XHIP/Hipparcos stars, IAU constellations', stars, lines, cons };
const file = path.join(__dirname, '..', 'assets', 'sky.json');
fs.writeFileSync(file, JSON.stringify(out));
console.log(`${stars.length} stars, ${Object.keys(lines).length} constellations -> ${file} (${fs.statSync(file).size} bytes)`);
