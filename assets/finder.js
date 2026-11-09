/* Moon Finder live tool. Astronomy adapted from SunCalc (BSD-2-Clause, (c) Vladimir Agafonkin). */
'use strict';
/* ---------- Astronomy (adapted from the SunCalc algorithms, BSD-2) ---------- */
const PI = Math.PI, rad = PI / 180, dayMs = 86400000, J1970 = 2440588, J2000 = 2451545;
const e = rad * 23.4397;
const toDays = d => d.valueOf() / dayMs - 0.5 + J1970 - J2000;
const rightAscension = (l, b) => Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
const declination = (l, b) => Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
const azimuthOf = (H, phi, dec) => Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
const altitudeOf = (H, phi, dec) => Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
const siderealTime = (d, lw) => rad * (280.16 + 360.9856235 * d) - lw;
function refraction(h) { if (h < 0) h = 0; return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179)); }

function sunCoords(d) {
  const M = rad * (357.5291 + 0.98560028 * d);
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + rad * 102.9372 + PI;
  return { dec: declination(L, 0), ra: rightAscension(L, 0) };
}
function moonCoords(d) {
  const L = rad * (218.316 + 13.176396 * d), M = rad * (134.963 + 13.064993 * d), F = rad * (93.272 + 13.229350 * d);
  const l = L + rad * 6.289 * Math.sin(M), b = rad * 5.128 * Math.sin(F), dist = 385001 - 20905 * Math.cos(M);
  return { ra: rightAscension(l, b), dec: declination(l, b), dist };
}
function moonPosition(date, lat, lng) {
  const lw = rad * -lng, phi = rad * lat, d = toDays(date), c = moonCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  let h = altitudeOf(H, phi, c.dec);
  h += refraction(h);
  const az = (azimuthOf(H, phi, c.dec) + PI) % (2 * PI); // compass bearing, 0 = north
  return { altitude: h, azimuth: az, distance: c.dist };
}
function moonIllumination(date) {
  const d = toDays(date), s = sunCoords(d), m = moonCoords(d), sdist = 149598000;
  const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
  const inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));
  const angle = Math.atan2(Math.cos(s.dec) * Math.sin(s.ra - m.ra),
    Math.sin(s.dec) * Math.cos(m.dec) - Math.cos(s.dec) * Math.sin(m.dec) * Math.cos(s.ra - m.ra));
  return { fraction: (1 + Math.cos(inc)) / 2, phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / PI };
}
function moonTimes(date, lat, lng) {
  const t = new Date(date); t.setHours(0, 0, 0, 0);
  const hc = 0.133 * rad, at = h => moonPosition(new Date(t.valueOf() + h * 3600000), lat, lng).altitude - hc;
  let h0 = at(0), rise, set;
  for (let i = 1; i <= 24; i += 2) {
    const h1 = at(i), h2 = at(i + 1);
    const a = (h0 + h2) / 2 - h1, b = (h2 - h0) / 2, xe = -b / (2 * a), ye = (a * xe + b) * xe + h1;
    const disc = b * b - 4 * a * h1;
    let roots = 0, x1 = 0, x2 = 0;
    if (disc >= 0) {
      const dx = Math.sqrt(disc) / (Math.abs(a) * 2);
      x1 = xe - dx; x2 = xe + dx;
      if (Math.abs(x1) <= 1) roots++;
      if (Math.abs(x2) <= 1) roots++;
      if (x1 < -1) x1 = x2;
    }
    if (roots === 1) { if (h0 < 0) rise = i + x1; else set = i + x1; }
    else if (roots === 2) { rise = i + (ye < 0 ? x2 : x1); set = i + (ye < 0 ? x1 : x2); }
    if (rise && set) break;
    h0 = h2;
  }
  const toDate = h => h === undefined ? null : new Date(t.valueOf() + h * 3600000);
  return { rise: toDate(rise), set: toDate(set), alwaysUp: !rise && !set && h0 > 0, alwaysDown: !rise && !set && h0 <= 0 };
}
function nextPhase(from, target) { // 0.5 = full, 0 = new
  const f = dt => { const p = moonIllumination(dt).phase - target; return ((p % 1) + 1.5) % 1 - 0.5; };
  let t = from.valueOf(), prev = f(new Date(t));
  for (let i = 0; i < 24 * 32; i++) {
    const t2 = t + 3600000, cur = f(new Date(t2));
    if (prev < 0 && cur >= 0) {
      let lo = t, hi = t2;
      for (let k = 0; k < 20; k++) { const mid = (lo + hi) / 2; if (f(new Date(mid)) < 0) lo = mid; else hi = mid; }
      return new Date(hi);
    }
    t = t2; prev = cur;
  }
  return null;
}

/* ---------- Plain-language helpers ---------- */
const $ = id => document.getElementById(id);
const state = { lat: null, lng: null, when: null }; // when = null means live "now"
const PHASES = [
  [0.0339, "New Moon"], [0.216, "Waxing Crescent"], [0.284, "First Quarter"], [0.466, "Waxing Gibbous"],
  [0.534, "Full Moon"], [0.716, "Waning Gibbous"], [0.784, "Last Quarter"], [0.966, "Waning Crescent"], [1.01, "New Moon"]
];
const phaseName = p => PHASES.find(([max]) => p < max)[1];
const DIRS = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
const direction = deg => DIRS[Math.round(deg / 45) % 8];
const SHORT = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
const compass = deg => SHORT[Math.round(deg / 22.5) % 16];
function heightWords(alt) {
  if (alt < 10) return "low, just above the horizon";
  if (alt < 35) return "a little way up the sky";
  if (alt < 60) return "about halfway up the sky";
  if (alt < 80) return "high in the sky";
  return "almost straight overhead";
}
const fmtTime = d => d ? d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "—";
const fmtDay = d => d ? d.toLocaleDateString([], { day: "numeric", month: "short" }) : "—";
const fmtDate = d => d ? d.toLocaleString([], { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : "—";

/* ---------- Drawing ---------- */
function drawMoon(phase, southern) {
  const r = 86, cx = 100, cy = 100;
  const k = Math.cos(2 * PI * phase), rx = Math.abs(k) * r;
  const waxing = phase < 0.5, crescent = k > 0;
  const d = waxing
    ? `M${cx},${cy - r} A${r},${r} 0 0 1 ${cx},${cy + r} A${rx},${r} 0 0 ${crescent ? 0 : 1} ${cx},${cy - r}Z`
    : `M${cx},${cy - r} A${r},${r} 0 0 0 ${cx},${cy + r} A${rx},${r} 0 0 ${crescent ? 1 : 0} ${cx},${cy - r}Z`;
  $("moon").innerHTML = `
    <g ${southern ? `transform="translate(200,0) scale(-1,1)"` : ""}>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--moon-dark)"/>
      <path d="${d}" fill="var(--moon-lit)"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--line)" stroke-width="1.5"/>
    </g>`;
}
function drawSky(altDeg, azDeg) {
  const c = 110, R = 90, above = altDeg >= 0;
  const dist = R * (1 - Math.max(altDeg, 0) / 90), a = azDeg * rad;
  const x = c + dist * Math.sin(a), y = c - dist * Math.cos(a);
  const ex = c + R * Math.sin(a), ey = c - R * Math.cos(a);
  $("sky").innerHTML = `
    <circle cx="${c}" cy="${c}" r="${R}" fill="var(--surface-2)" stroke="var(--line)"/>
    <circle cx="${c}" cy="${c}" r="${R * 2 / 3}" fill="none" stroke="var(--line)" stroke-dasharray="3 4"/>
    <circle cx="${c}" cy="${c}" r="${R / 3}" fill="none" stroke="var(--line)" stroke-dasharray="3 4"/>
    <text x="${c}" y="14" text-anchor="middle">N</text><text x="${c}" y="216" text-anchor="middle">S</text>
    <text x="211" y="${c + 4}" text-anchor="middle">E</text><text x="9" y="${c + 4}" text-anchor="middle">W</text>
    <line x1="${c}" y1="${c}" x2="${ex}" y2="${ey}" stroke="var(--accent)" stroke-opacity=".4" stroke-dasharray="4 4"/>
    ${above ? `<circle cx="${x}" cy="${y}" r="10" fill="var(--moon-lit)" stroke="var(--ink)" stroke-opacity=".3"/>`
            : `<circle cx="${ex}" cy="${ey}" r="8" fill="none" stroke="var(--warn)" stroke-width="2" stroke-dasharray="3 3"/>`}`;
}

/* ---------- Main view ---------- */
function render() {
  if (state.lat === null) return;
  const now = state.when || new Date();
  const pos = moonPosition(now, state.lat, state.lng);
  const ill = moonIllumination(now);
  const times = moonTimes(now, state.lat, state.lng);
  const altDeg = pos.altitude / rad, azDeg = pos.azimuth / rad;

  drawMoon(ill.phase, state.lat < 0);
  drawSky(altDeg, azDeg);
  $("phaseName").textContent = phaseName(ill.phase);
  $("illum").textContent = `${Math.round(ill.fraction * 100)}% lit`;

  const vis = $("visible");
  if (altDeg >= 0) {
    vis.className = "chip good"; vis.textContent = state.when ? "Up at this time" : "Up now";
    $("look").textContent = `Look ${direction(azDeg)}`;
    $("lookSub").textContent = `It's ${heightWords(altDeg)}.`;
  } else {
    vis.className = "chip warn"; vis.textContent = state.when ? "Not up at this time" : "Not up right now";
    if (times.rise && times.rise > now) {
      $("look").textContent = `Rises at ${fmtTime(times.rise)}`;
      $("lookSub").textContent = `It will come up in the ${direction(moonPosition(times.rise, state.lat, state.lng).azimuth / rad)}.`;
    } else {
      $("look").textContent = "Below the horizon";
      $("lookSub").textContent = "Check the rise time below, or come back later.";
    }
  }

  const upAll = times.alwaysUp ? "Up all day" : null, downAll = times.alwaysDown ? "Not today" : null;
  $("rise").textContent = upAll || downAll || fmtTime(times.rise);
  $("set").textContent = upAll || downAll || fmtTime(times.set);
  $("nextFull").textContent = fmtDay(nextPhase(now, 0.5));
  $("nextNew").textContent = fmtDay(nextPhase(now, 0));

  $("az").textContent = `${direction(azDeg)} (${Math.round(azDeg)}°)`;
  $("alt").textContent = `${altDeg.toFixed(1)}°`;
  $("age").textContent = `${(ill.phase * 29.53).toFixed(1)} days`;
  $("dist").textContent = `${Math.round(pos.distance).toLocaleString()} km`;
  $("loc").textContent = `Showing ${Math.abs(state.lat).toFixed(2)}°${state.lat >= 0 ? "N" : "S"}, ${Math.abs(state.lng).toFixed(2)}°${state.lng >= 0 ? "E" : "W"}` +
    (state.when ? ` at ${fmtDate(state.when)}` : " · right now");
}

function setLocation(lat, lng) {
  state.lat = lat; state.lng = lng;
  $("lat").value = lat.toFixed(4); $("lng").value = lng.toFixed(4);
  render();
}
function locate() {
  $("msg").textContent = "";
  if (!navigator.geolocation) { $("msg").textContent = "Location isn't available here. Type your latitude and longitude."; $("placeBox").open = true; return fallback(); }
  $("look").textContent = "Finding your location…";
  navigator.geolocation.getCurrentPosition(
    p => setLocation(p.coords.latitude, p.coords.longitude),
    () => { $("msg").textContent = "Couldn't get your location, so this shows New Delhi. Type your own latitude and longitude above."; $("placeBox").open = true; fallback(); },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
  );
}
function fallback() { if (state.lat === null) setLocation(28.6139, 77.2090); } // New Delhi

$("form").addEventListener("submit", ev => {
  ev.preventDefault();
  const lat = parseFloat($("lat").value), lng = parseFloat($("lng").value);
  if (!(lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180)) { $("msg").textContent = "Latitude must be −90 to 90 and longitude −180 to 180."; return; }
  $("msg").textContent = "";
  const w = $("when").value;
  state.when = w ? new Date(w) : null;
  setLocation(lat, lng);
});
$("useGps").addEventListener("click", locate);
$("nowBtn").addEventListener("click", () => { state.when = null; $("when").value = ""; render(); });

/* ---------- Camera finder ---------- */
const cam = { stream: null, raf: 0, heading: null, pitch: null, sensors: false, moon: null, moonAt: 0, hfov: 60 };
const wrap180 = x => ((x + 540) % 360) - 180;

function onOrient(ev) {
  let heading = null;
  if (typeof ev.webkitCompassHeading === "number") heading = ev.webkitCompassHeading;      // iPhone
  else if (ev.absolute && ev.alpha !== null) heading = (360 - ev.alpha) % 360;             // Android
  if (heading === null || ev.beta === null) return;
  const pitch = ev.beta - 90; // phone upright in portrait: camera level with the horizon
  if (cam.heading === null) { cam.heading = heading; cam.pitch = pitch; }
  else {
    cam.heading = (cam.heading + wrap180(heading - cam.heading) * 0.2 + 360) % 360;
    cam.pitch += (pitch - cam.pitch) * 0.2;
  }
  cam.sensors = true;
}

async function openCamera() {
  if (state.lat === null) { $("msg").textContent = "Set a location first."; return; }
  $("cam").hidden = false;
  $("camInfo").textContent = "Starting camera…";
  try {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      await DeviceOrientationEvent.requestPermission();
    }
  } catch (_) { /* falls back to written directions */ }
  window.addEventListener("deviceorientationabsolute", onOrient);
  window.addEventListener("deviceorientation", onOrient);
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("not supported in this browser");
    cam.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
    $("video").srcObject = cam.stream;
  } catch (err) {
    $("camInfo").textContent = `Camera unavailable (${err.message}). Directions below still work.`;
  }
  cam.heading = cam.pitch = null; cam.sensors = false; cam.moon = null;
  cam.raf = requestAnimationFrame(drawOverlay);
}
function closeCamera() {
  cancelAnimationFrame(cam.raf);
  window.removeEventListener("deviceorientationabsolute", onOrient);
  window.removeEventListener("deviceorientation", onOrient);
  if (cam.stream) cam.stream.getTracks().forEach(t => t.stop());
  cam.stream = null; $("video").srcObject = null;
  $("cam").hidden = true;
}

function drawOverlay() {
  cam.raf = requestAnimationFrame(drawOverlay);
  const cv = $("overlay"), dpr = window.devicePixelRatio || 1;
  const W = cv.clientWidth, H = cv.clientHeight;
  if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
  const g = cv.getContext("2d");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, W, H);

  const now = state.when || new Date();
  if (!cam.moon || Date.now() - cam.moonAt > 5000) {
    const p = moonPosition(now, state.lat, state.lng);
    cam.moon = { alt: p.altitude / rad, az: p.azimuth / rad, ill: moonIllumination(now) };
    cam.moonAt = Date.now();
  }
  const { alt, az, ill } = cam.moon;
  if (!$("camInfo").textContent.startsWith("Camera unavailable")) {
    $("camInfo").textContent = `${phaseName(ill.phase)} · ${direction(az)} · ${alt >= 0 ? heightWords(alt) : "below the horizon"}`;
  }

  g.strokeStyle = "rgba(255,255,255,.6)"; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(W / 2 - 12, H / 2); g.lineTo(W / 2 + 12, H / 2); g.moveTo(W / 2, H / 2 - 12); g.lineTo(W / 2, H / 2 + 12); g.stroke();

  if (!cam.sensors) {
    $("camHint").textContent = alt >= 0
      ? `Face ${direction(az)} and look ${heightWords(alt).replace(/^it's /, "")} (about ${Math.round(alt)}° up).`
      : `The Moon is below the horizon right now, toward the ${direction(az)}.`;
    return;
  }

  const hfov = cam.hfov, vfov = hfov * H / W;
  const dAz = wrap180(az - cam.heading), dAlt = alt - cam.pitch;
  const x = W / 2 + (dAz / hfov) * W, y = H / 2 - (dAlt / vfov) * H;
  const onScreen = Math.abs(dAz) < hfov / 2 && Math.abs(dAlt) < vfov / 2;

  if (onScreen) {
    g.strokeStyle = "#ffd76a"; g.lineWidth = 3;
    g.beginPath(); g.arc(x, y, 36, 0, 2 * PI); g.stroke();
    g.fillStyle = "rgba(255,215,106,.2)"; g.beginPath(); g.arc(x, y, 36, 0, 2 * PI); g.fill();
    g.fillStyle = "#ffd76a"; g.font = "600 15px system-ui, sans-serif"; g.textAlign = "center";
    g.fillText(alt >= 0 ? "Moon" : "Moon (below horizon)", x, y + 58);
    $("camHint").textContent = alt >= 0 ? "There it is — inside the circle 🌙" : "That's where it is, but it's below the horizon now.";
  } else {
    const ang = Math.atan2(y - H / 2, x - W / 2);
    const r = Math.min(W, H) / 2 - 50;
    g.save(); g.translate(W / 2 + Math.cos(ang) * r, H / 2 + Math.sin(ang) * r); g.rotate(ang);
    g.fillStyle = "#ffd76a";
    g.beginPath(); g.moveTo(28, 0); g.lineTo(-14, -20); g.lineTo(-6, 0); g.lineTo(-14, 20); g.closePath(); g.fill();
    g.restore();
    const turn = Math.abs(dAz) >= 5 ? `turn ${dAz > 0 ? "right" : "left"}` : "";
    const tilt = Math.abs(dAlt) >= 5 ? `tilt ${dAlt > 0 ? "up" : "down"}` : "";
    $("camHint").textContent = ([turn, tilt].filter(Boolean).join(" and ").replace(/^./, c => c.toUpperCase()) || "Almost there") +
      (alt < 0 ? " (it's below the horizon now)" : "") + " · hold your phone upright";
  }
}

$("camBtn").addEventListener("click", openCamera);
$("camClose").addEventListener("click", closeCamera);
document.addEventListener("keydown", ev => { if (ev.key === "Escape" && !$("cam").hidden) closeCamera(); });

setInterval(() => { if (!state.when) render(); }, 60000);
(function init() {
  const q = new URLSearchParams(location.search);
  const lat = parseFloat(q.get("lat")), lng = parseFloat(q.get("lng"));
  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) setLocation(lat, lng); else locate();
})();
