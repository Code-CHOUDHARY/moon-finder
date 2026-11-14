/* Star Finder: a live sky map of stars, constellations and planets for your place and time,
   drawn over the phone camera when you point it at the sky. Separate from the Moon Finder (finder.js).
   Positions: Astronomy Engine (MIT). Stars and constellations: d3-celestial data (BSD-3-Clause, Olaf Frohn). */
'use strict';
(function () {
  const A = window.Astronomy;
  const $ = id => document.getElementById(id);
  const RAD = Math.PI / 180, DEG = 180 / Math.PI;
  const box = $('skyBox'), cv = $('skyCanvas'), video = $('skyVideo');
  if (!A || !box) return;

  /* ---------- Small vector helpers (east, north, up) ---------- */
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const fromAltAz = (alt, az) => [Math.sin(az * RAD) * Math.cos(alt * RAD), Math.cos(az * RAD) * Math.cos(alt * RAD), Math.sin(alt * RAD)];
  const altOf = v => Math.asin(Math.max(-1, Math.min(1, v[2]))) * DEG;
  const azOf = v => (Math.atan2(v[0], v[1]) * DEG + 360) % 360;
  const yaw = (v, d) => { const c = Math.cos(d * RAD), s = Math.sin(d * RAD); return [v[0] * c + v[1] * s, -v[0] * s + v[1] * c, v[2]]; };
  const wrap180 = x => ((x % 360) + 540) % 360 - 180;
  const DIRS = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const dirName = az => DIRS[Math.round(az / 45) % 8];
  const fmtTime = d => d ? d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '–';
  const fmtWhen = (d, ref) => !d ? '–' : (d.toDateString() === ref.toDateString() ? fmtTime(d) : d.toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' }));

  /* ---------- State ---------- */
  const S = {
    lat: null, lng: null, offsetMin: 0, data: null, stars: [], cons: [], lines: {}, conName: {},
    view: { az: 180, alt: 35, fov: 90 }, // drag mode
    camera: false, sensors: false, absolute: false, devF: null, devU: null, iosOffset: null, align: 0,
    target: null, tip: null, showLines: true, showNames: true, faint: false,
    sky: null, skyAt: 0, bodies: [], sunAlt: -90,
  };
  const now = () => new Date(Date.now() + S.offsetMin * 60000);

  /* ---------- Data ---------- */
  const conLabel = c => c[2] ? `${c[1]} · ${c[2]}` : c[1];
  async function loadData() {
    const res = await fetch(box.dataset.sky);
    const d = await res.json();
    S.stars = d.stars.map(s => ({ ra: s[0], dec: s[1], mag: s[2], bv: s[3], name: s[4], con: s[5], j: eqj(s[0], s[1]), v: null }));
    S.cons = d.cons.map(c => ({ id: c[0], name: conLabel(c), ra: c[3], dec: c[4], rank: c[5], j: eqj(c[3], c[4]), v: null }));
    for (const c of S.cons) S.conName[c.id] = c.name;
    for (const id in d.lines) S.lines[id] = d.lines[id].map(l => l.map(([ra, dec]) => ({ j: eqj(ra, dec), v: null })));
    fillSearch();
  }
  function eqj(raDeg, dec) { // unit vector, J2000 equator
    const a = raDeg * RAD, b = dec * RAD;
    return [Math.cos(b) * Math.cos(a), Math.cos(b) * Math.sin(a), Math.sin(b)];
  }

  /* ---------- Sky positions for the current time and place ---------- */
  const BODIES = [['Sun', '#FFD54A'], ['Moon', '#F4F1E6'], ['Mercury', '#C9B9A6'], ['Venus', '#FFF2C4'], ['Mars', '#FF7B54'], ['Jupiter', '#F6D8A8'], ['Saturn', '#E8D18B']];
  function updateSky(force) {
    if (S.lat === null || !S.stars.length) return;
    const t = now();
    if (!force && S.sky && Math.abs(t - S.skyAt) < 1000) return;
    const obs = new A.Observer(S.lat, S.lng, 0);
    const rot = A.Rotation_EQJ_HOR(t, obs).rot; // J2000 equator -> horizon (x north, y west, z up)
    const toEnu = j => {
      const x = rot[0][0] * j[0] + rot[1][0] * j[1] + rot[2][0] * j[2];
      const y = rot[0][1] * j[0] + rot[1][1] * j[1] + rot[2][1] * j[2];
      const z = rot[0][2] * j[0] + rot[1][2] * j[1] + rot[2][2] * j[2];
      return [-y, x, z];
    };
    for (const s of S.stars) s.v = toEnu(s.j);
    for (const c of S.cons) c.v = toEnu(c.j);
    for (const id in S.lines) for (const l of S.lines[id]) for (const p of l) p.v = toEnu(p.j);
    S.bodies = BODIES.map(([name, color]) => {
      const eq = A.Equator(name, t, obs, true, true), hor = A.Horizon(t, obs, eq.ra, eq.dec, 'normal');
      const b = { name, color, alt: hor.altitude, az: hor.azimuth, v: fromAltAz(hor.altitude, hor.azimuth), kind: name === 'Sun' || name === 'Moon' ? name : 'Planet' };
      if (name !== 'Sun') b.mag = A.Illumination(name, t).mag;
      if (name === 'Moon') { b.phase = A.MoonPhase(t); b.mag = -12; }
      if (name === 'Sun') b.mag = -26;
      return b;
    });
    S.sunAlt = S.bodies[0].alt;
    S.sky = true; S.skyAt = +t;
  }

  /* ---------- View: which way the screen is looking ---------- */
  function viewBasis() {
    let f, u;
    if (S.camera && S.sensors && S.devF) { f = S.devF; u = S.devU; }
    else { f = fromAltAz(S.view.alt, S.view.az); u = fromAltAz(S.view.alt + 90, S.view.az); }
    const d = S.camera && S.sensors ? (S.iosOffset || 0) + S.align : 0;
    if (d) { f = yaw(f, d); u = yaw(u, d); }
    f = norm(f); const r = norm(cross(f, u)); u = cross(r, f);
    return { f, r, u };
  }
  let W = 0, H = 0, scale = 1, basis = null;
  const fov = () => (S.camera && S.sensors ? 62 : S.view.fov);
  function project(v) {
    const z = dot(v, basis.f);
    if (z < 0.08) return null;
    return [W / 2 + scale * dot(v, basis.r) / z, H / 2 - scale * dot(v, basis.u) / z];
  }

  /* ---------- Drawing ---------- */
  function starColor(bv) {
    if (bv < 0) return '#AFC8FF'; if (bv < 0.3) return '#DCE6FF'; if (bv < 0.6) return '#FFFFFF';
    if (bv < 1.0) return '#FFF1C9'; if (bv < 1.4) return '#FFD7A0'; return '#FFB98A';
  }
  function moonDisk(g, x, y, r, phaseDeg, toward) {
    const k = Math.cos(phaseDeg * RAD); // 1 new, -1 full
    g.save(); g.translate(x, y); g.rotate(toward);
    g.fillStyle = '#3A3A44'; g.beginPath(); g.arc(0, 0, r, 0, 2 * Math.PI); g.fill();
    g.fillStyle = '#F4F1E6'; g.beginPath(); g.moveTo(0, -r); g.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
    g.ellipse(0, 0, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, k > 0); g.fill();
    g.restore();
  }
  let hits = [];
  function draw() {
    const dpr = window.devicePixelRatio || 1;
    W = cv.clientWidth; H = cv.clientHeight;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    updateSky(false);
    basis = viewBasis();
    scale = (Math.min(W, H) / 2) / Math.tan(fov() / 2 * RAD);
    const live = S.camera && S.sensors;
    // Background: camera picture, or a sky coloured by the Sun's height
    g.clearRect(0, 0, W, H);
    if (!S.camera) {
      const sa = S.sunAlt, top = sa > 0 ? '#2D6FB7' : sa > -6 ? '#1E3F78' : sa > -12 ? '#13234A' : '#060A1C', bot = sa > 0 ? '#79A9DB' : sa > -6 ? '#B3654A' : sa > -12 ? '#25305C' : '#0D1430';
      const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, top); gr.addColorStop(1, bot);
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
    }
    hits = [];
    if (!S.sky) { requestAnimationFrame(draw); return; }
    const day = S.sunAlt > -6 && !S.camera;
    const below = v => v[2] < 0;

    // Ground below the horizon (drag mode only; with the camera the real ground is in the picture)
    if (!S.camera) {
      const vaz = S.view.az, pts = [];
      for (let d = -179; d <= 179; d += 1) { const p = project(fromAltAz(0, vaz + d)); if (p) pts.push(p); }
      if (pts.length > 1) {
        g.fillStyle = day ? 'rgba(30,45,25,.55)' : 'rgba(8,16,10,.6)'; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
        for (const p of pts) g.lineTo(p[0], p[1]);
        g.lineTo(pts[pts.length - 1][0], H + 2000); g.lineTo(pts[0][0], H + 2000); g.closePath(); g.fill();
      } else if (S.view.alt < 0) { g.fillStyle = 'rgba(8,16,10,.6)'; g.fillRect(0, 0, W, H); }
    }
    // Horizon line and compass points
    g.lineWidth = 1.5; g.strokeStyle = live ? 'rgba(120,230,160,.7)' : 'rgba(120,230,160,.55)';
    g.beginPath(); let pen = false;
    for (let az = 0; az <= 360; az += 2) {
      const p = project(fromAltAz(0, az));
      if (p) { pen ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]); pen = true; } else pen = false;
    }
    g.stroke();
    g.font = '700 15px system-ui, sans-serif'; g.textAlign = 'center'; g.fillStyle = 'rgba(140,240,170,.95)';
    [['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315]].forEach(([l, az]) => {
      const p = project(fromAltAz(0, az)); if (p) g.fillText(l, p[0], p[1] + 18);
    });
    const zp = project([0, 0, 1]); if (zp) { g.font = '12px system-ui, sans-serif'; g.fillText('Zenith (straight up)', zp[0], zp[1] - 8); }

    // Constellation lines
    if (S.showLines) {
      g.lineWidth = 1.2;
      for (const id in S.lines) {
        const hl = S.target && S.target.type === 'con' && S.target.id === id;
        g.strokeStyle = hl ? 'rgba(255,215,106,.95)' : live ? 'rgba(150,200,255,.55)' : 'rgba(150,190,255,.45)';
        g.beginPath();
        for (const l of S.lines[id]) {
          let prev = null;
          for (const p of l) {
            const q = project(p.v);
            if (q && prev && !(p.v[2] < 0 && prev.below)) g.lineTo(q[0], q[1]); else if (q) g.moveTo(q[0], q[1]);
            prev = q && Object.assign(q, { below: p.v[2] < 0 });
          }
        }
        g.stroke();
      }
    }
    // Stars
    const limit = S.faint ? 5.5 : live ? 4.3 : day ? 3.5 : 4.8;
    g.textAlign = 'left'; g.font = '12px system-ui, sans-serif';
    for (const s of S.stars) {
      if (s.mag > limit) break; // sorted brightest first
      const p = project(s.v); if (!p || p[0] < -20 || p[0] > W + 20 || p[1] < -20 || p[1] > H + 20) continue;
      const r = Math.max(0.7, 3.6 - 0.62 * s.mag) * (live ? 1.15 : 1);
      g.globalAlpha = below(s.v) ? 0.3 : 1;
      g.fillStyle = starColor(s.bv); g.beginPath(); g.arc(p[0], p[1], r, 0, 2 * Math.PI); g.fill();
      if (s.name && S.showNames && (s.mag < (fov() < 50 ? 3.2 : 1.8) || (S.target && S.target.ref === s))) {
        g.fillStyle = 'rgba(235,240,255,.85)'; g.fillText(s.name, p[0] + r + 4, p[1] + 4);
      }
      if (s.mag < 3.8 || s.name) hits.push({ x: p[0], y: p[1], r: r + 10, obj: s, type: 'star' });
    }
    g.globalAlpha = 1;
    // Constellation names
    if (S.showNames) {
      g.textAlign = 'center'; g.font = '600 13px system-ui, sans-serif';
      for (const c of S.cons) {
        if (c.rank > (fov() < 60 ? 3 : 2) && !(S.target && S.target.ref === c)) continue;
        const p = project(c.v); if (!p) continue;
        g.globalAlpha = below(c.v) ? 0.35 : 1;
        g.fillStyle = S.target && S.target.ref === c ? '#FFD76A' : 'rgba(170,205,255,.9)';
        g.fillText(c.name.toUpperCase(), p[0], p[1]);
        hits.push({ x: p[0], y: p[1] - 4, r: 30, obj: c, type: 'con' });
      }
      g.globalAlpha = 1;
    }
    // Sun, Moon, planets
    const sunB = S.bodies[0];
    for (const b of S.bodies) {
      const p = project(b.v); if (!p) continue;
      g.globalAlpha = below(b.v) ? 0.4 : 1;
      if (b.name === 'Moon') {
        const ahead = project(norm([b.v[0] + (sunB.v[0] - b.v[0]) * 0.02, b.v[1] + (sunB.v[1] - b.v[1]) * 0.02, b.v[2] + (sunB.v[2] - b.v[2]) * 0.02]));
        const toward = ahead ? Math.atan2(ahead[1] - p[1], ahead[0] - p[0]) : 0;
        moonDisk(g, p[0], p[1], 12, b.phase, toward);
      } else if (b.name === 'Sun') {
        g.fillStyle = b.color; g.beginPath(); g.arc(p[0], p[1], 13, 0, 2 * Math.PI); g.fill();
      } else {
        g.fillStyle = b.color; g.beginPath(); g.arc(p[0], p[1], 5.5, 0, 2 * Math.PI); g.fill();
        g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 1; g.stroke();
      }
      g.fillStyle = b.color; g.font = '700 14px system-ui, sans-serif'; g.textAlign = 'left';
      g.fillText(b.name + (below(b.v) ? ' (below horizon)' : ''), p[0] + 16, p[1] + 5);
      hits.push({ x: p[0], y: p[1], r: 26, obj: b, type: 'body' });
    }
    g.globalAlpha = 1;

    // Centre mark in camera mode
    if (S.camera) {
      g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1.5; g.beginPath();
      g.moveTo(W / 2 - 12, H / 2); g.lineTo(W / 2 + 12, H / 2); g.moveTo(W / 2, H / 2 - 12); g.lineTo(W / 2, H / 2 + 12); g.stroke();
    }
    drawTarget(g);
    updateInfo(day);
    requestAnimationFrame(draw);
  }

  /* ---------- Target: highlight it, or point to it ---------- */
  function targetVec() {
    const t = S.target; if (!t) return null;
    if (t.type === 'body') { const b = S.bodies.find(x => x.name === t.id); return b && b.v; }
    return t.ref && t.ref.v;
  }
  function drawTarget(g) {
    const v = targetVec(); if (!v) { if (S.camera) setHint(''); return; }
    const p = project(v), alt = altOf(v), az = azOf(v);
    const onScreen = p && p[0] > 30 && p[0] < W - 30 && p[1] > 60 && p[1] < H - 60;
    const name = S.target.label;
    if (onScreen) {
      g.strokeStyle = '#FFD76A'; g.lineWidth = 3; g.beginPath(); g.arc(p[0], p[1], 30, 0, 2 * Math.PI); g.stroke();
      setHint(alt >= 0 ? `${name} is inside the circle` : `${name} is there, but below the horizon right now`);
      return;
    }
    // Arrow at the edge towards the target
    const dx = dot(v, basis.r), dy = dot(v, basis.u);
    const ang = Math.atan2(-dy, dx), rr = Math.min(W, H) / 2 - 46;
    g.save(); g.translate(W / 2 + Math.cos(ang) * rr, H / 2 + Math.sin(ang) * rr); g.rotate(ang);
    g.fillStyle = '#FFD76A'; g.beginPath(); g.moveTo(26, 0); g.lineTo(-13, -18); g.lineTo(-5, 0); g.lineTo(-13, 18); g.closePath(); g.fill(); g.restore();
    if (S.camera && S.sensors) {
      const dAz = wrap180(az - azOf(basis.f)), dAlt = alt - altOf(basis.f);
      const turn = Math.abs(dAz) >= 8 ? `turn ${dAz > 0 ? 'right' : 'left'}` : '', tilt = Math.abs(dAlt) >= 8 ? `tilt ${dAlt > 0 ? 'up' : 'down'}` : '';
      setHint(`${name}: ${[turn, tilt].filter(Boolean).join(' and ') || 'almost there'}${alt < 0 ? ' (below the horizon now)' : ''}`);
    } else setHint(`${name}: ${alt >= 0 ? `${Math.round(alt)}° up` : 'below the horizon'}, towards the ${dirName(az)}`);
  }
  function setHint(t) { if (S.flash && Date.now() < S.flash.until) t = S.flash.text; const h = $('skyHint'); if (h.textContent !== t) h.textContent = t; }
  const flash = t => { S.flash = { text: t, until: Date.now() + 2500 }; setHint(t); };

  let lastInfo = 0;
  function updateInfo(day) {
    if (Date.now() - lastInfo < 400) return; lastInfo = Date.now();
    const f = basis.f, alt = altOf(f), az = azOf(f);
    let near = null, best = 0.85;
    for (const c of S.cons) { const d = dot(c.v, f); if (d > best) { best = d; near = c; } }
    const facing = `Facing ${dirName(az)}, ${Math.round(alt)}° up${near ? ` · near ${near.name}` : ''}`;
    const sun = S.sunAlt > 0 ? ' · ☀ Daytime: stars are hidden by sunlight' : S.sunAlt > -12 ? ' · Twilight: only bright stars and planets show' : '';
    $('skyInfo').textContent = (S.camera && !S.sensors ? 'No compass found: drag the sky' : facing) + sun;
    if (!S.target && !S.camera) setHint(day ? 'It is daytime: this shows where the stars are, hidden by sunlight' : 'Drag to look around · pinch or scroll to zoom · tap a star');
    if (!S.target && S.camera && S.sensors) setHint(S.absolute || S.iosOffset !== null ? 'Point your phone at the sky · tap a star to name it' : 'Compass not found: centre the Moon or a bright planet and tap "Fix alignment"');
  }

  /* ---------- Tap to identify, drag to look, pinch to zoom ---------- */
  function describe(h) {
    const o = h.obj, v = o.v, alt = altOf(v), az = azOf(v), where = alt >= 0 ? `${Math.round(alt)}° up, towards the ${dirName(az)}` : `below the horizon (${dirName(az)})`;
    if (h.type === 'body') {
      const what = o.kind === 'Planet' ? `planet, brightness ${o.mag.toFixed(1)}` : o.kind === 'Moon' ? `${Math.round(A.Illumination('Moon', now()).phase_fraction * 100)}% lit` : 'never look straight at the Sun';
      return { title: o.name, text: `${what} · ${where}`, target: { type: 'body', id: o.name, label: o.name } };
    }
    if (h.type === 'con') return { title: o.name, text: `Constellation · ${where}`, target: { type: 'con', id: o.id, ref: o, label: o.name } };
    const con = S.conName[o.con];
    return { title: o.name || 'Star', text: `${con ? `Star in ${con}` : 'Star'} · brightness ${o.mag.toFixed(1)} · ${where}`, target: { type: 'star', ref: o, label: o.name || 'Star' } };
  }
  function tapAt(x, y) {
    let best = null, bd = 1e9;
    for (const h of hits) { const d = Math.hypot(h.x - x, h.y - y); if (d < h.r && d < bd) { bd = d; best = h; } }
    if (!best) { S.target = null; showTip(null); return; }
    const d = describe(best); S.target = d.target; S.targetHit = best; showTip(d);
  }
  function showTip(d) {
    const el = $('skyTip');
    if (!d) { el.hidden = true; return; }
    el.innerHTML = ''; const b = document.createElement('strong'); b.textContent = d.title; el.append(b, document.createElement('br'), document.createTextNode(d.text)); el.hidden = false;
  }
  const ptr = new Map(); let drag = null, pinch = null;
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]); drag = { x: e.clientX, y: e.clientY, az: S.view.az, alt: S.view.alt, moved: false }; if (ptr.size === 2) { const [a, b] = [...ptr.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), fov: S.view.fov }; } });
  cv.addEventListener('pointermove', e => {
    if (!ptr.has(e.pointerId)) return; ptr.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptr.size === 2 && pinch) { const [a, b] = [...ptr.values()]; zoomTo(pinch.fov * pinch.d / Math.max(20, Math.hypot(a[0] - b[0], a[1] - b[1]))); drag.moved = true; return; }
    if (!drag || (S.camera && S.sensors)) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    const k = fov() / Math.min(W, H);
    S.view.az = (drag.az - dx * k + 360) % 360; S.view.alt = Math.max(-30, Math.min(90, drag.alt + dy * k));
  });
  const up = e => { const r = cv.getBoundingClientRect(); if (drag && !drag.moved && ptr.size === 1) tapAt(e.clientX - r.left, e.clientY - r.top); ptr.delete(e.pointerId); if (ptr.size < 2) pinch = null; if (!ptr.size) drag = null; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', e => { ptr.delete(e.pointerId); drag = null; pinch = null; });
  cv.addEventListener('wheel', e => { e.preventDefault(); zoomTo(S.view.fov * (e.deltaY > 0 ? 1.1 : 0.9)); }, { passive: false });
  const zoomTo = f => { S.view.fov = Math.max(20, Math.min(120, f)); };

  /* ---------- Camera and motion sensors ---------- */
  function onOrient(ev) {
    if (ev.alpha === null || ev.beta === null || ev.gamma === null) return;
    if (ev.type === 'deviceorientation' && S.gotAbsolute) return; // prefer the absolute event when both fire
    if (ev.type === 'deviceorientationabsolute') S.gotAbsolute = true;
    const a = ev.alpha * RAD, b = ev.beta * RAD, c = ev.gamma * RAD;
    const cA = Math.cos(a), sA = Math.sin(a), cB = Math.cos(b), sB = Math.sin(b), cG = Math.cos(c), sG = Math.sin(c);
    // Device -> earth rotation (W3C: Z-X'-Y'' with alpha, beta, gamma)
    const R = [[cA * cG - sA * sB * sG, -cB * sA, cA * sG + cG * sA * sB], [cG * sA + cA * sB * sG, cA * cB, sA * sG - cA * cG * sB], [-cB * sG, sB, cB * cG]];
    const M = v => [R[0][0] * v[0] + R[0][1] * v[1] + R[0][2] * v[2], R[1][0] * v[0] + R[1][1] * v[1] + R[1][2] * v[2], R[2][0] * v[0] + R[2][1] * v[1] + R[2][2] * v[2]];
    const th = ((screen.orientation && screen.orientation.angle) || window.orientation || 0) * RAD;
    const f = M([0, 0, -1]), u = M([Math.sin(th), Math.cos(th), 0]);
    if (typeof ev.webkitCompassHeading === 'number' && ev.webkitCompassHeading >= 0) { // iPhone: alpha is not tied to north
      const ref = Math.abs(f[2]) < 0.8 ? f : M([0, 1, 0]);
      const off = wrap180(ev.webkitCompassHeading - azOf(ref));
      S.iosOffset = S.iosOffset === null ? off : S.iosOffset + wrap180(off - S.iosOffset) * 0.1;
    } else S.absolute = ev.absolute === true || ev.type === 'deviceorientationabsolute';
    const k = S.devF ? 0.25 : 1;
    S.devF = norm(S.devF ? S.devF.map((x, i) => x + (f[i] - x) * k) : f);
    S.devU = norm(S.devU ? S.devU.map((x, i) => x + (u[i] - x) * k) : u);
    S.sensors = true;
  }
  async function openCamera() {
    box.classList.add('live'); document.body.classList.add('sky-lock'); S.camera = true; $('camBtn').textContent = '✕ Close camera';
    $('alignBtn').hidden = false;
    try { if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') await DeviceOrientationEvent.requestPermission(); } catch (_) { /* drag still works */ }
    window.addEventListener('deviceorientationabsolute', onOrient); window.addEventListener('deviceorientation', onOrient);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('not supported in this browser');
      S.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      video.srcObject = S.stream; video.hidden = false;
    } catch (err) { $('skyInfo').textContent = `Camera unavailable (${err.message}). The sky map still follows your phone.`; }
    setTimeout(() => { if (!S.sensors && S.camera) setHint('No motion sensors found: drag the sky to look around'); }, 2500);
  }
  function closeCamera() {
    window.removeEventListener('deviceorientationabsolute', onOrient); window.removeEventListener('deviceorientation', onOrient);
    if (S.stream) S.stream.getTracks().forEach(t => t.stop());
    S.stream = null; video.srcObject = null; video.hidden = true;
    if (S.sensors && S.devF) { const f = yaw(S.devF, (S.iosOffset || 0) + S.align); S.view.az = azOf(f); S.view.alt = Math.max(-30, Math.min(90, altOf(f))); }
    Object.assign(S, { camera: false, sensors: false, devF: null, devU: null, iosOffset: null, gotAbsolute: false });
    box.classList.remove('live'); document.body.classList.remove('sky-lock'); $('camBtn').textContent = '📷 Point your camera at the sky'; $('alignBtn').hidden = true;
  }
  // Compasses are often off: centre a bright object and tap "Fix alignment" to correct the heading.
  function fixAlign() {
    const f = viewBasis().f; let best = null, bd = Math.cos(20 * RAD);
    const cands = S.bodies.filter(b => b.name !== 'Sun' && b.alt > -2).map(b => [b.v, b.name]).concat(S.stars.filter(s => s.mag < 1.6 && s.name && s.v[2] > -0.035).map(s => [s.v, s.name]));
    for (const [v, n] of cands) { const d = dot(v, f); if (d > bd) { bd = d; best = [v, n]; } }
    if (!best) { flash('Put the Moon, a planet or a very bright star in the middle first'); return; }
    S.align += wrap180(azOf(best[0]) - azOf(f));
    S.absolute = true; flash(`Aligned on ${best[1]} ✓`);
  }

  /* ---------- Search ---------- */
  function fillSearch() {
    const dl = $('skyList'), opts = [];
    BODIES.forEach(([n]) => opts.push(n));
    S.cons.forEach(c => opts.push(c.name));
    S.stars.filter(s => s.name && s.mag < 3).forEach(s => opts.push(s.name));
    dl.innerHTML = opts.map(o => `<option value="${o.replace(/"/g, '&quot;')}">`).join('');
  }
  function search(q) {
    q = q.trim().toLowerCase(); if (!q) { S.target = null; showTip(null); return; }
    const has = s => s && s.toLowerCase().includes(q);
    let h = null;
    const b = S.bodies.find(x => x.name.toLowerCase() === q) || S.bodies.find(x => has(x.name));
    if (b) h = { obj: b, type: 'body' };
    else { const c = S.cons.find(x => x.name.toLowerCase() === q || x.id.toLowerCase() === q) || S.cons.find(x => has(x.name)); if (c) h = { obj: c, type: 'con' }; }
    if (!h) { const s = S.stars.find(x => has(x.name)); if (s) h = { obj: s, type: 'star' }; }
    if (!h) { flash(`"${q}" not found. Try Jupiter, Orion, Sirius or Saptarishi`); return; }
    const d = describe(h); S.target = d.target; S.targetHit = h; showTip(d);
    if (!S.camera) { S.view.az = azOf(h.obj.v); S.view.alt = Math.max(-30, Math.min(90, altOf(h.obj.v))); }
  }

  /* ---------- Planets table ---------- */
  function planetTable() {
    if (S.lat === null) return;
    const t = now(), obs = new A.Observer(S.lat, S.lng, 0);
    const rows = ['Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'].map(name => {
      const eq = A.Equator(name, t, obs, true, true), hor = A.Horizon(t, obs, eq.ra, eq.dec, 'normal');
      const rise = A.SearchRiseSet(name, obs, +1, t, 1.5), set = A.SearchRiseSet(name, obs, -1, t, 1.5);
      const elong = name === 'Moon' ? null : A.Elongation(name, t).elongation;
      const up = hor.altitude > 0;
      const note = elong !== null && elong < 12 ? 'Too close to the Sun to see' : up ? `Up now, ${Math.round(hor.altitude)}° high in the ${dirName(hor.azimuth)}` : 'Below the horizon now';
      return `<tr><td><button type="button" class="linkish" data-find="${name}">${name}</button></td><td>${note}</td><td>${fmtWhen(rise && rise.date, t)}</td><td>${fmtWhen(set && set.date, t)}</td></tr>`;
    });
    $('planetRows').innerHTML = rows.join('');
  }

  /* ---------- Place and time ---------- */
  function setPlace(lat, lng, label) {
    S.lat = lat; S.lng = lng;
    $('skyPlace').textContent = label || `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`;
    if (lat < 0 && S.view.az === 180) S.view.az = 0; // southern hemisphere: face north by default
    updateSky(true); planetTable(); refreshTarget(true);
  }
  function locate() {
    const fallback = () => { if (S.lat === null) setPlace(28.6139, 77.209, 'New Delhi (allow location for your own sky)'); };
    if (!navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition(p => setPlace(p.coords.latitude, p.coords.longitude), fallback, { timeout: 10000, maximumAge: 600000 });
    setTimeout(fallback, 11000);
  }
  function setOffset(min) {
    S.offsetMin = min; $('skyTime').value = String(min);
    $('skyWhen').textContent = min === 0 ? 'Now' : now().toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });
    updateSky(true); planetTable(); refreshTarget(true);
  }
  function refreshTarget(recentre) {
    const h = S.targetHit; if (!S.target || !h) return;
    if (h.type === 'body') h.obj = S.bodies.find(b => b.name === h.obj.name) || h.obj;
    showTip(describe(h));
    if (recentre && !S.camera) { S.view.az = azOf(h.obj.v); S.view.alt = Math.max(-30, Math.min(90, altOf(h.obj.v))); }
  }

  /* ---------- Wire up ---------- */
  $('camBtn').addEventListener('click', () => (S.camera ? closeCamera() : openCamera()));
  $('alignBtn').addEventListener('click', fixAlign);
  $('skyClose').addEventListener('click', () => { if (S.camera) closeCamera(); else { box.classList.remove('live'); document.body.classList.remove('sky-lock'); } });
  $('skyFull').addEventListener('click', () => { box.classList.add('live'); document.body.classList.add('sky-lock'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('live')) $('skyClose').click(); });
  $('skyFind').addEventListener('submit', e => { e.preventDefault(); search($('skyQ').value); });
  $('skyQ').addEventListener('change', () => search($('skyQ').value));
  $('skyTime').addEventListener('input', e => setOffset(Number(e.target.value)));
  $('skyNow').addEventListener('click', () => setOffset(0));
  $('skyTonight').addEventListener('click', () => {
    const t = new Date(); t.setHours(21, 0, 0, 0); let m = Math.round((t - Date.now()) / 60000);
    if (m < -180) m += 1440; setOffset(Math.max(-1440, Math.min(1440, Math.round(m / 10) * 10)));
  });
  $('skyGps').addEventListener('click', () => { S.lat = null; locate(); });
  $('optLines').addEventListener('change', e => { S.showLines = e.target.checked; });
  $('optNames').addEventListener('change', e => { S.showNames = e.target.checked; });
  $('optFaint').addEventListener('change', e => { S.faint = e.target.checked; });
  $('planetRows').addEventListener('click', e => { const b = e.target.closest('[data-find]'); if (b) { search(b.dataset.find); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); } });
  setInterval(() => { if (!S.offsetMin) planetTable(); }, 60000);

  loadData().then(() => {
    const q = new URLSearchParams(location.search), lat = parseFloat(q.get('lat')), lng = parseFloat(q.get('lng'));
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) setPlace(lat, lng); else locate();
    const find = q.get('find'); if (find) setTimeout(() => search(find), 300);
    requestAnimationFrame(draw);
  }).catch(() => { $('skyInfo').textContent = 'Could not load the star map. Check your connection and reload.'; });
})();
