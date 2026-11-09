/* Moon Finder – small site script (theme, countdowns, city picker, sharing) */
(function () {
  'use strict';
  var CITIES = window.MF_CITIES || [];
  var root = document.documentElement;

  // Theme
  var btn = document.getElementById('themeBtn');
  function setTheme(t) { root.dataset.theme = t; if (btn) btn.textContent = t === 'dark' ? '☀' : '☾'; }
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
  if (btn) btn.addEventListener('click', function () {
    var t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    try { localStorage.setItem('mf-theme', t); } catch (e) {}
  });

  // Countdowns
  var cds = document.querySelectorAll('[data-ts]');
  function tick() {
    var now = Date.now();
    cds.forEach(function (el) {
      var hi = el.getAttribute('data-lang') === 'hi';
      var d = Number(el.getAttribute('data-ts')) - now;
      if (d <= 0) {
        if (d > -12 * 3600e3) { el.textContent = hi ? '✨ अभी / आज' : '✨ Now / today'; el.hidden = false; }
        else el.hidden = true;
        return;
      }
      var m = Math.floor(d / 60000), days = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mi = m % 60;
      var txt;
      if (hi) txt = '⏳ ' + (days ? days + ' दिन ' + h + ' घंटे' : h ? h + ' घंटे ' + mi + ' मिनट' : mi + ' मिनट') + ' बाकी';
      else txt = '⏳ in ' + (days ? days + 'd ' + h + 'h' : h ? h + 'h ' + mi + 'm' : mi + 'm');
      el.textContent = txt; el.hidden = false;
    });
  }
  if (cds.length) { tick(); setInterval(tick, 30000); }

  // City select navigation
  document.querySelectorAll('select[data-nav]').forEach(function (s) {
    s.addEventListener('change', function () { if (s.value) location.href = s.value; });
  });

  // Nearest city
  document.querySelectorAll('[data-near]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!navigator.geolocation) return;
      var label = b.textContent; b.textContent = '…';
      navigator.geolocation.getCurrentPosition(function (p) {
        var lat = p.coords.latitude, lng = p.coords.longitude, best = null, bd = Infinity, onlyTop = b.getAttribute('data-top') === '1';
        CITIES.forEach(function (c) {
          if (onlyTop && !c[3]) return;
          var dx = (c[2] - lng) * Math.cos(lat * Math.PI / 180), dy = c[1] - lat, dd = dx * dx + dy * dy;
          if (dd < bd) { bd = dd; best = c; }
        });
        if (best) location.href = b.getAttribute('data-near').replace('__CITY__', best[0]);
        else b.textContent = label;
      }, function () { b.textContent = label; }, { timeout: 10000, maximumAge: 600000 });
    });
  });

  // Table filter
  document.querySelectorAll('input[data-filter]').forEach(function (inp) {
    var table = document.querySelector(inp.getAttribute('data-filter'));
    if (!table) return;
    inp.addEventListener('input', function () {
      var q = inp.value.trim().toLowerCase();
      table.querySelectorAll('tbody tr').forEach(function (tr) { tr.hidden = q && tr.textContent.toLowerCase().indexOf(q) < 0; });
    });
  });

  // Copy link
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var href = b.getAttribute('data-copy');
      if (navigator.share) { navigator.share({ url: href, title: document.title }).catch(function () {}); return; }
      if (navigator.clipboard) navigator.clipboard.writeText(href).then(function () { b.textContent = '✓'; });
    });
  });
})();
