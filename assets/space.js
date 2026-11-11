/* Moon Finder – 3D view: Earth globe with your location and the Moon, and the solar system.
   Rendering: three.js (MIT). Positions: Astronomy Engine (MIT). Coastlines: Natural Earth (public domain). */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const A = window.Astronomy;
const $ = id => document.getElementById(id);
const box = $('space');
const DEG = Math.PI / 180;
const EARTH_KM = 6378.14;
const OBLIQ = 23.4392911 * DEG;

/* ---------- State ---------- */
const qs = new URLSearchParams(location.search);
const num = (v, lo, hi) => { const n = Number(v); return v !== null && v !== '' && isFinite(n) && n >= lo && n <= hi ? n : null; };
const state = {
  mode: 'earth',
  lat: num(qs.get('lat'), -90, 90) ?? 28.6139, lng: num(qs.get('lng'), -180, 180) ?? 77.209, place: 'New Delhi',
  time: Date.now(), rate: 1, playing: true, trueScale: false, focus: 'Sun',
};
if (qs.get('lat') && qs.get('lng')) state.place = 'Your place';

/* ---------- Helpers ---------- */
// Equatorial vector (x to the equinox, z to the north pole) -> three.js (y up)
const eq3 = v => new THREE.Vector3(v.x, v.z, -v.y);
// J2000 equatorial -> ecliptic (so the planets' plane lies flat), then to three.js
const ecl3 = v => { const y = v.y * Math.cos(OBLIQ) + v.z * Math.sin(OBLIQ), z = -v.y * Math.sin(OBLIQ) + v.z * Math.cos(OBLIQ); return new THREE.Vector3(v.x, z, -y); };
const compress = v => { const r = v.length(); return r ? v.multiplyScalar(1.6 * Math.sqrt(r) / r) : v; }; // AU -> scene units
function label(text, color = '#FFE9B0') {
  const c = document.createElement('canvas'), g = c.getContext('2d');
  const font = '600 44px system-ui, sans-serif';
  g.font = font; c.width = Math.ceil(g.measureText(text).width) + 24; c.height = 64;
  g.font = font; g.fillStyle = color; g.textBaseline = 'middle'; g.shadowColor = '#000'; g.shadowBlur = 8; g.fillText(text, 12, 34);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, sizeAttenuation: false, transparent: true }));
  s.scale.set(0.032 * c.width / c.height, 0.032, 1); s.center.set(0.5, -0.6); s.renderOrder = 5;
  return s;
}
function glow(color, size) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, color); gr.addColorStop(0.35, color + 'AA'); gr.addColorStop(1, color + '00');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.scale.set(size, size, 1);
  return s;
}
function stars(radius) {
  const n = 1400, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const u = Math.random() * 2 - 1, t = Math.random() * 2 * Math.PI, s = Math.sqrt(1 - u * u); pos.set([radius * s * Math.cos(t), radius * u, radius * s * Math.sin(t)], i * 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.75 }));
}
const line = (points, color, opacity = 1) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }));
const compass = az => ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'][Math.round(az / 22.5) % 16];
function phaseName(deg) {
  const a = ((deg % 360) + 360) % 360;
  if (a < 12 || a >= 348) return 'New Moon'; if (a < 80) return 'Waxing Crescent'; if (a < 100) return 'First Quarter'; if (a < 168) return 'Waxing Gibbous';
  if (a < 192) return 'Full Moon'; if (a < 260) return 'Waning Gibbous'; if (a < 280) return 'Last Quarter'; return 'Waning Crescent';
}

/* ---------- Renderer ---------- */
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch (e) { renderer = null; }
if (!renderer || !A) {
  $('spaceMsg').textContent = 'This 3D view needs WebGL, which is not available in this browser. The numbers below still update.';
}
if (renderer) { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); box.appendChild(renderer.domElement); }

/* ---------- Earth and Moon scene ---------- */
const E = { scene: new THREE.Scene(), cam: new THREE.PerspectiveCamera(45, 1, 0.05, 2000) };
E.scene.add(stars(900), new THREE.AmbientLight(0xffffff, 0.4));
E.sun = new THREE.DirectionalLight(0xffffff, 2.6); E.scene.add(E.sun);
// Earth texture is drawn on a canvas: ocean, land outlines from Natural Earth, a grid every 30 degrees.
const texCanvas = document.createElement('canvas'); texCanvas.width = 2048; texCanvas.height = 1024;
const earthTex = new THREE.CanvasTexture(texCanvas); earthTex.colorSpace = THREE.SRGBColorSpace; earthTex.anisotropy = 4;
function drawEarth(land) {
  const g = texCanvas.getContext('2d'), W = texCanvas.width, H = texCanvas.height;
  const X = lng => (lng + 180) / 360 * W, Y = lat => (90 - lat) / 180 * H;
  g.fillStyle = '#17508F'; g.fillRect(0, 0, W, H);
  if (land) {
    g.fillStyle = '#4F9A57'; g.strokeStyle = '#2C6B3A'; g.lineWidth = 1.2;
    for (const poly of land) { g.beginPath(); for (const ring of poly) { ring.forEach(([x, y], i) => (i ? g.lineTo(X(x), Y(y)) : g.moveTo(X(x), Y(y)))); g.closePath(); } g.fill('evenodd'); g.stroke(); }
    g.fillStyle = '#E9EEF2'; g.fillRect(0, Y(-90) - 8, W, 8); // close the Antarctic edge
  }
  g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 1;
  for (let lng = -180; lng <= 180; lng += 30) { g.beginPath(); g.moveTo(X(lng), 0); g.lineTo(X(lng), H); g.stroke(); }
  for (let lat = -60; lat <= 60; lat += 30) { g.beginPath(); g.moveTo(0, Y(lat)); g.lineTo(W, Y(lat)); g.stroke(); }
  g.strokeStyle = 'rgba(255,220,120,.55)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, Y(0)); g.lineTo(W, Y(0)); g.stroke(); // equator
  earthTex.needsUpdate = true;
}
drawEarth(null);
E.earth = new THREE.Mesh(new THREE.SphereGeometry(1, 72, 48), new THREE.MeshStandardMaterial({ map: earthTex, roughness: 1, metalness: 0 }));
E.scene.add(E.earth);
E.scene.add(line([new THREE.Vector3(0, -1.35, 0), new THREE.Vector3(0, 1.35, 0)], 0xffffff, 0.45)); // rotation axis
const nLab = label('N'); nLab.position.set(0, 1.38, 0); E.scene.add(nLab);
// Your place: a pin that turns with the globe
E.pin = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff3b30 }));
E.pinRing = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.065, 32), new THREE.MeshBasicMaterial({ color: 0xff3b30, side: THREE.DoubleSide }));
E.pinLabel = label('You', '#FF8A80');
E.earth.add(E.pin, E.pinRing, E.pinLabel);
const surface = (lat, lng, r = 1) => new THREE.Vector3(r * Math.cos(lat * DEG) * Math.cos(lng * DEG), r * Math.sin(lat * DEG), -r * Math.cos(lat * DEG) * Math.sin(lng * DEG));
function placePin() {
  const p = surface(state.lat, state.lng, 1.004);
  E.pin.position.copy(p); E.pinRing.position.copy(p); E.pinRing.lookAt(p.clone().multiplyScalar(2)); E.pinLabel.position.copy(p);
}
placePin();
// Moon
function moonTexture() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d'); g.fillStyle = '#C9C6BE'; g.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 70; i++) { const x = Math.random() * 512, y = 20 + Math.random() * 216, r = 3 + Math.random() * 16; g.fillStyle = `rgba(90,88,84,${0.12 + Math.random() * 0.22})`; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
E.moon = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), new THREE.MeshStandardMaterial({ map: moonTexture(), roughness: 1 }));
E.moonLabel = label('Moon'); E.scene.add(E.moon, E.moonLabel);
E.orbit = line([new THREE.Vector3(), new THREE.Vector3()], 0xffe9b0, 0.5); E.scene.add(E.orbit);
E.sight = line([new THREE.Vector3(), new THREE.Vector3()], 0xffd36e, 0.9); E.scene.add(E.sight);
E.sunLabel = label('To the Sun ☀', '#FFD36E'); E.scene.add(E.sunLabel);
E.sunLine = line([new THREE.Vector3(), new THREE.Vector3()], 0xffd36e, 0.35); E.scene.add(E.sunLine);
E.cam.position.set(0, 6, 15);

/* ---------- Solar system scene ---------- */
const PLANETS = [
  { name: 'Mercury', color: 0xa8a29e, r: 0.07, period: 87.97 }, { name: 'Venus', color: 0xe8c98a, r: 0.12, period: 224.7 },
  { name: 'Earth', color: 0x3b82f6, r: 0.13, period: 365.26 }, { name: 'Mars', color: 0xd9643a, r: 0.095, period: 686.98 },
  { name: 'Jupiter', color: 0xd9b38c, r: 0.3, period: 4332.6 }, { name: 'Saturn', color: 0xe3cf9a, r: 0.25, period: 10759 },
  { name: 'Uranus', color: 0x9fd8e0, r: 0.18, period: 30687 }, { name: 'Neptune', color: 0x5b7fe0, r: 0.17, period: 60190 },
];
const SS = { scene: new THREE.Scene(), cam: new THREE.PerspectiveCamera(45, 1, 0.05, 4000) };
SS.scene.add(stars(1800), new THREE.AmbientLight(0xffffff, 0.35));
const sunLight = new THREE.PointLight(0xffffff, 3, 0, 0); SS.scene.add(sunLight);
SS.sun = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffc83d }));
SS.sun.add(glow('#FFC83D', 2.2), label('Sun', '#FFD36E')); SS.scene.add(SS.sun);
function buildSolar() {
  for (const p of PLANETS) {
    p.mesh = new THREE.Mesh(new THREE.SphereGeometry(p.r, 28, 20), new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.9 }));
    p.mesh.add(label(p.name));
    if (p.name === 'Saturn') { const ring = new THREE.Mesh(new THREE.RingGeometry(p.r * 1.35, p.r * 2.1, 48), new THREE.MeshBasicMaterial({ color: 0xcdb98a, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })); ring.rotation.x = Math.PI / 2 - 0.47; p.mesh.add(ring); }
    SS.scene.add(p.mesh);
    // Orbit: the planet's real path over one revolution, squeezed with the same distance scale
    const pts = [], N = 200, t0 = Date.now();
    for (let i = 0; i <= N; i++) pts.push(compress(ecl3(A.HelioVector(A.Body[p.name], new Date(t0 + p.period * 86400000 * i / N)))));
    SS.scene.add(line(pts, p.color, 0.45));
  }
  SS.moon = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 12), new THREE.MeshStandardMaterial({ color: 0xd6d3cd, roughness: 1 }));
  SS.scene.add(SS.moon);
  const ring = []; for (let i = 0; i <= 48; i++) ring.push(new THREE.Vector3(0.3 * Math.cos(i / 48 * 2 * Math.PI), 0, 0.3 * Math.sin(i / 48 * 2 * Math.PI)));
  SS.moonOrbit = line(ring, 0xffffff, 0.25); SS.scene.add(SS.moonOrbit);
}
SS.cam.position.set(0, 9, 13);

/* ---------- Controls ---------- */
let ctlE, ctlS;
if (renderer) {
  ctlE = new OrbitControls(E.cam, renderer.domElement); ctlE.enablePan = false; ctlE.minDistance = 1.4; ctlE.maxDistance = 220; ctlE.enableDamping = true;
  ctlS = new OrbitControls(SS.cam, renderer.domElement); ctlS.enablePan = false; ctlS.minDistance = 0.6; ctlS.maxDistance = 60; ctlS.enableDamping = true; ctlS.enabled = false;
}
function resize() {
  if (!renderer) return;
  const w = box.clientWidth, h = box.clientHeight;
  renderer.setSize(w, h, false);
  for (const c of [E.cam, SS.cam]) { c.aspect = w / h; c.updateProjectionMatrix(); }
}
window.addEventListener('resize', resize);

/* ---------- Astronomy for the current time ---------- */
let orbitAt = null, lastFocus = null;
const moonScale = () => (state.trueScale ? 1 : 0.1);
function update() {
  const date = new Date(state.time), time = A.MakeTime(date);
  const obs = new A.Observer(state.lat, state.lng, 0);
  // Moon and Sun as seen from the Earth's centre, in the equator of date (so the spinning globe lines up)
  const rot = A.Rotation_EQJ_EQD(time);
  const moonV = A.RotateVector(rot, A.GeoMoon(time)), sunV = A.RotateVector(rot, A.GeoVector(A.Body.Sun, time, true));
  const moonKm = Math.hypot(moonV.x, moonV.y, moonV.z) * A.KM_PER_AU;
  const moonDir = eq3(moonV).normalize(), sunDir = eq3(sunV).normalize();
  const dist = moonKm / EARTH_KM * moonScale();
  E.earth.rotation.y = A.SiderealTime(time) * 15 * DEG;
  E.moon.position.copy(moonDir).multiplyScalar(dist);
  E.moon.scale.setScalar(0.2725 * (state.trueScale ? 1 : 1.9));
  E.moonLabel.position.copy(E.moon.position);
  E.sun.position.copy(sunDir).multiplyScalar(50);
  const far = dist * 1.25;
  E.sunLabel.position.copy(sunDir).multiplyScalar(far);
  E.sunLine.geometry.setFromPoints([sunDir.clone().multiplyScalar(1.2), sunDir.clone().multiplyScalar(far)]);
  // Moon's path for the 27.3 days around now
  if (orbitAt === null || Math.abs(state.time - orbitAt.t) > 2 * 86400000 || orbitAt.s !== moonScale()) {
    const pts = [];
    for (let i = 0; i <= 110; i++) { const t = A.MakeTime(new Date(state.time + (i / 110 - 0.5) * 27.32 * 86400000)); const v = A.RotateVector(rot, A.GeoMoon(t)); pts.push(eq3(v).multiplyScalar(A.KM_PER_AU / EARTH_KM * moonScale())); }
    E.orbit.geometry.dispose(); E.orbit.geometry = new THREE.BufferGeometry().setFromPoints(pts); orbitAt = { t: state.time, s: moonScale() };
  }
  // Where the Moon and Sun are in your sky
  const eqM = A.Equator(A.Body.Moon, time, obs, true, true), hM = A.Horizon(time, obs, eqM.ra, eqM.dec, 'normal');
  const eqS = A.Equator(A.Body.Sun, time, obs, true, true), hS = A.Horizon(time, obs, eqS.ra, eqS.dec, 'normal');
  E.earth.updateMatrixWorld();
  const pinW = E.pin.getWorldPosition(new THREE.Vector3());
  E.sight.geometry.setFromPoints([pinW, E.moon.position]);
  E.sight.material.color.set(hM.altitude > 0 ? 0xffd36e : 0x8a8fa3); E.sight.material.opacity = hM.altitude > 0 ? 0.95 : 0.4;

  // Solar system
  const pos = {};
  for (const p of PLANETS) { const v = A.HelioVector(A.Body[p.name], time); p.au = Math.hypot(v.x, v.y, v.z); p.v = v; if (p.mesh) { p.mesh.position.copy(compress(ecl3(v))); pos[p.name] = p.mesh.position; } }
  const ev = PLANETS[2].v;
  for (const p of PLANETS) p.fromEarth = Math.hypot(p.v.x - ev.x, p.v.y - ev.y, p.v.z - ev.z);
  if (SS.moon) {
    const md = ecl3(A.GeoMoon(time)).normalize().multiplyScalar(0.3);
    SS.moon.position.copy(PLANETS[2].mesh.position).add(md); SS.moonOrbit.position.copy(PLANETS[2].mesh.position);
    // keep the camera on the chosen body
    const target = state.focus === 'Sun' ? new THREE.Vector3() : pos[state.focus];
    if (target && ctlS) {
      if (lastFocus !== state.focus) { const d = SS.cam.position.clone().sub(ctlS.target); const want = state.focus === 'Sun' ? 16 : 3.2; SS.cam.position.copy(target).add(d.setLength(want)); lastFocus = state.focus; }
      else SS.cam.position.add(target.clone().sub(ctlS.target));
      ctlS.target.copy(target);
    }
  }

  // Read-outs
  const ph = A.MoonPhase(time), lit = Math.round(A.Illumination(A.Body.Moon, time).phase_fraction * 100);
  $('rTime').textContent = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' IST';
  $('rPlace').textContent = `${state.place} (${Math.abs(state.lat).toFixed(2)}°${state.lat >= 0 ? 'N' : 'S'}, ${Math.abs(state.lng).toFixed(2)}°${state.lng >= 0 ? 'E' : 'W'})`;
  $('rMoonUp').textContent = hM.altitude > 0 ? 'Above your horizon' : 'Below your horizon';
  $('rMoonUp').className = 'chip ' + (hM.altitude > 0 ? 'good' : 'bad');
  $('rAlt').textContent = `${hM.altitude.toFixed(1)}°`;
  $('rAz').textContent = `${Math.round(hM.azimuth)}° ${compass(hM.azimuth)}`;
  $('rPhase').textContent = `${phaseName(ph)}, ${lit}% lit`;
  $('rDist').textContent = `${Math.round(moonKm).toLocaleString('en-IN')} km`;
  $('rSun').textContent = hS.altitude > 0 ? `Day (Sun ${hS.altitude.toFixed(0)}° up)` : hS.altitude > -6 ? 'Twilight' : 'Night';
  for (const p of PLANETS) if (p.cells) { p.cells[0].textContent = p.au.toFixed(2) + ' AU'; p.cells[1].textContent = p.name === 'Earth' ? '—' : `${p.fromEarth.toFixed(2)} AU (${Math.round(p.fromEarth * 149.6)} million km)`; }
}

/* ---------- UI ---------- */
function setMode(m) {
  state.mode = m;
  for (const b of document.querySelectorAll('[data-mode]')) b.setAttribute('aria-pressed', String(b.dataset.mode === m));
  for (const el of document.querySelectorAll('[data-show]')) el.hidden = el.dataset.show !== m;
  if (ctlE) { ctlE.enabled = m === 'earth'; ctlS.enabled = m === 'solar'; }
  // speeds that make sense for each view
  if (m === 'solar' && state.rate < 86400) setRate(86400 * 5); if (m === 'earth' && state.rate > 86400) setRate(3600);
}
function setRate(r) { state.rate = r; $('speed').value = String(r); if (r !== 1) state.playing = true; syncPlay(); }
function syncPlay() { $('play').textContent = state.playing ? '⏸ Pause' : '▶ Play'; }
function faceMe() {
  E.earth.updateMatrixWorld();
  const d = E.pin.getWorldPosition(new THREE.Vector3()).normalize();
  E.cam.position.copy(d.multiplyScalar(3.4)).add(new THREE.Vector3(0, 0.4, 0)); ctlE && ctlE.target.set(0, 0, 0);
}
function wholeOrbit() { const d = 60.3 * moonScale(); E.cam.position.set(0, d * 1.3, d * 3.1); ctlE && ctlE.target.set(0, 0, 0); }
function setPlace(lat, lng, name) { state.lat = lat; state.lng = lng; state.place = name; placePin(); update(); if (state.mode === 'earth') faceMe(); }

for (const b of document.querySelectorAll('[data-mode]')) b.addEventListener('click', () => setMode(b.dataset.mode));
$('play').addEventListener('click', () => { state.playing = !state.playing; syncPlay(); });
$('speed').addEventListener('change', e => setRate(Number(e.target.value)));
$('now').addEventListener('click', () => { state.time = Date.now(); setRate(1); $('when').value = ''; });
$('when').addEventListener('change', e => { const t = Date.parse(e.target.value); if (isFinite(t)) { state.time = t; state.playing = false; syncPlay(); } });
$('faceMe').addEventListener('click', faceMe);
$('wholeOrbit').addEventListener('click', wholeOrbit);
$('trueScale').addEventListener('change', e => { state.trueScale = e.target.checked; update(); wholeOrbit(); });
$('focus').addEventListener('change', e => { state.focus = e.target.value; });
$('near').addEventListener('click', () => {
  if (!navigator.geolocation) { $('spaceMsg').textContent = 'Your browser cannot share a location. Pick a city instead.'; return; }
  navigator.geolocation.getCurrentPosition(p => { $('city').value = ''; setPlace(p.coords.latitude, p.coords.longitude, 'Your location'); },
    () => { $('spaceMsg').textContent = 'Could not get your location. Pick a city instead.'; }, { timeout: 10000, maximumAge: 600000 });
});
// Cities come from the shared list in app.js: [slug, lat, lng, top, English, Hindi, state, major]
function fillCities() {
  const list = (window.MF_CITIES || []).filter(c => c[7]).sort((a, b) => a[4].localeCompare(b[4]));
  const sel = $('city');
  for (const c of list) { const o = document.createElement('option'); o.value = `${c[1]},${c[2]}`; o.textContent = c[4]; sel.appendChild(o); }
  sel.addEventListener('change', () => { if (!sel.value) return; const [la, lo] = sel.value.split(',').map(Number); setPlace(la, lo, sel.options[sel.selectedIndex].textContent); });
}
function fillPlanets() {
  const tb = $('planetRows'), fo = $('focus');
  for (const p of PLANETS) {
    const tr = document.createElement('tr'), td = () => tr.appendChild(document.createElement('td'));
    td().textContent = p.name; p.cells = [td(), td()]; tb.appendChild(tr);
    const o = document.createElement('option'); o.value = p.name; o.textContent = p.name; fo.appendChild(o);
  }
}

/* ---------- Start ---------- */
if (A) {
  fillPlanets();
  if (window.MF_CITIES) fillCities(); else document.addEventListener('DOMContentLoaded', fillCities); // app.js (deferred) carries the list
  if (renderer) buildSolar();
  resize(); setMode('earth'); syncPlay(); update(); wholeOrbit();
  fetch(box.dataset.land).then(r => (r.ok ? r.json() : null)).then(land => { if (land) drawEarth(land); }).catch(() => {});
  let last = performance.now(), sinceText = 0;
  const tick = now => {
    const dt = Math.min(now - last, 200); last = now;
    if (state.playing) state.time += dt * state.rate;
    sinceText += dt;
    // real time needs few updates; faster speeds are recomputed every frame
    if (state.rate !== 1 || sinceText > 500) { update(); sinceText = 0; }
    if (renderer) { (state.mode === 'earth' ? ctlE : ctlS).update(); renderer.render(state.mode === 'earth' ? E.scene : SS.scene, state.mode === 'earth' ? E.cam : SS.cam); }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
