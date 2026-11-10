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

  // City search: replaces the city <select> with a box where you can type any part of a city, district or state name
  // (English or Hindi). The <select> stays as a fallback when JavaScript is off.
  var ALIASES = window.MF_ALIASES || [];
  var norm = function (x) { return (x || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ऀ-ॿ]+/g, ' ').trim(); };
  var PLACES = CITIES.map(function (c) { return { slug: c[0], en: c[4], hi: c[5], st: c[6] }; })
    .concat(ALIASES.map(function (a) { return { slug: a[3], en: a[0], hi: a[1], st: a[2] }; }));
  PLACES.forEach(function (p) { p.key = norm(p.en) + ' | ' + norm(p.hi) + ' | ' + norm(p.st); p.n = norm(p.en); p.nh = norm(p.hi); });
  function search(q) {
    q = norm(q); if (!q) return [];
    var words = q.split(' '), out = [];
    PLACES.forEach(function (p) {
      if (!words.every(function (w) { return p.key.indexOf(w) >= 0; })) return;
      // rank: name starts with query, a word in the name starts with it, name contains it, only state matches
      var score = (p.n.indexOf(q) === 0 || p.nh.indexOf(q) === 0) ? 0 : (' ' + p.n).indexOf(' ' + q) >= 0 || (' ' + p.nh).indexOf(' ' + q) >= 0 ? 1 : (p.n.indexOf(q) >= 0 || p.nh.indexOf(q) >= 0) ? 2 : 3;
      out.push([score, p]);
    });
    out.sort(function (a, b) { return a[0] - b[0] || a[1].en.localeCompare(b[1].en); });
    return out.slice(0, 12).map(function (x) { return x[1]; });
  }
  document.querySelectorAll('select[data-nav]').forEach(function (s) {
    var tpl = s.getAttribute('data-tpl');
    if (!tpl || !PLACES.length) { s.addEventListener('change', function () { if (s.value) location.href = s.value; }); return; }
    var hi = s.getAttribute('data-lang') === 'hi', cur = s.getAttribute('data-current');
    var curPlace = PLACES.filter(function (p) { return p.slug === cur; })[0];
    var box = document.createElement('div'); box.className = 'citysearch';
    var inp = document.createElement('input');
    inp.type = 'search'; inp.autocomplete = 'off'; inp.setAttribute('role', 'combobox'); inp.setAttribute('aria-expanded', 'false');
    inp.setAttribute('aria-label', s.getAttribute('aria-label') || 'City');
    inp.placeholder = curPlace ? (hi ? curPlace.hi : curPlace.en) + (hi ? ' · दूसरा शहर या ज़िला खोजें' : ' · search another city or district') : (hi ? 'अपना शहर या ज़िला लिखें…' : 'Type your city or district…');
    var list = document.createElement('ul'); list.className = 'cs-list'; list.setAttribute('role', 'listbox'); list.hidden = true;
    box.appendChild(inp); box.appendChild(list);
    s.parentNode.insertBefore(box, s); s.hidden = true;
    var items = [], active = -1;
    function render() {
      items = search(inp.value); active = items.length ? 0 : -1;
      list.innerHTML = '';
      if (!inp.value.trim()) { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); return; }
      if (!items.length) { var li0 = document.createElement('li'); li0.className = 'cs-empty'; li0.textContent = hi ? 'कोई शहर नहीं मिला' : 'No matching city or district'; list.appendChild(li0); }
      items.forEach(function (p, i) {
        var li = document.createElement('li'); li.setAttribute('role', 'option'); li.className = i === active ? 'on' : '';
        var b = document.createElement('b'); b.textContent = hi ? p.hi : p.en;
        var sm = document.createElement('small'); sm.textContent = (hi ? p.en + ' · ' : '') + p.st;
        li.appendChild(b); li.appendChild(sm);
        li.addEventListener('mousedown', function (e) { e.preventDefault(); go(p); });
        list.appendChild(li);
      });
      list.hidden = false; inp.setAttribute('aria-expanded', 'true');
    }
    function go(p) { location.href = tpl.replace('__CITY__', p.slug); }
    function mark() { Array.prototype.forEach.call(list.children, function (li, i) { li.className = i === active ? 'on' : ''; if (i === active) li.scrollIntoView({ block: 'nearest' }); }); }
    inp.addEventListener('input', render);
    inp.addEventListener('focus', render);
    inp.addEventListener('blur', function () { setTimeout(function () { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); }, 150); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && items.length) { active = (active + 1) % items.length; mark(); e.preventDefault(); }
      else if (e.key === 'ArrowUp' && items.length) { active = (active - 1 + items.length) % items.length; mark(); e.preventDefault(); }
      else if (e.key === 'Enter' && active >= 0) { go(items[active]); e.preventDefault(); }
      else if (e.key === 'Escape') { list.hidden = true; }
    });
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
