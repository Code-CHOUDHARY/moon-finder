// Learn articles, legal pages, the live Moon Finder tool and 404.
'use strict';
const { esc, url, abs, page, breadcrumbs, moonSvg, cfg, adSlot, faqHtml, faqLd } = require('./ui');

const simpleHero = (h1, sub, crumbs, angle = 120) => `<section class="hero"><div class="wrap"><div>${crumbs || ''}<h1>${esc(h1)}</h1>${sub ? `<p class="sub">${esc(sub)}</p>` : ''}</div>${moonSvg(angle)}</div></section>`;

const ARTICLES = [
  {
    slug: 'why-moon-changes-shape', title: 'Why does the Moon change shape?', desc: 'A simple explanation of the Moon\'s phases, from Amavasya to Purnima, and why the cycle takes about 29.5 days.',
    html: `<p class="lead">The Moon does not make its own light. It always has one half lit by the Sun; what changes is how much of that lit half faces us.</p>
<h2>The 29.5-day cycle</h2><p>As the Moon orbits the Earth, the angle between the Sun, Earth and Moon changes. At <strong>Amavasya</strong> (new moon) the Moon sits roughly between us and the Sun, so its lit side faces away and we see nothing. About 14.8 days later, at <strong>Purnima</strong> (full moon), the Moon is on the opposite side of the Earth from the Sun and we see the whole lit face.</p>
<p>In between we see a <em>crescent</em> (less than half lit), a <em>half moon</em> (the quarter phases) and a <em>gibbous</em> moon (more than half lit). The growing half of the cycle is <strong>Shukla Paksha</strong>; the shrinking half is <strong>Krishna Paksha</strong>.</p>
<h2>Why the moon rises later each day</h2><p>The Moon moves about 12–13° eastward against the stars every day, so it rises on average about 50 minutes later each night. That is why the full moon rises around sunset, while the moon on Karva Chauth (four days after full moon) rises 2–3 hours after sunset.</p>
<h2>Is the shape the same across India?</h2><p>Yes. Everyone on Earth sees the same phase at the same moment. What changes from city to city is the <em>time</em> it rises and sets, and the tilt of the crescent.</p>` },
  {
    slug: 'what-is-a-tithi', title: 'What is a tithi?', desc: 'How the Hindu lunar day (tithi) is calculated from the angle between the Sun and Moon, and why festivals sometimes move by a day.',
    html: `<p class="lead">A tithi is a lunar day. It is the time the Moon takes to move 12° further away from the Sun in the sky.</p>
<h2>30 tithis in a lunar month</h2><p>The Moon gains 360° on the Sun in one lunar month, so there are 360 ÷ 12 = <strong>30 tithis</strong>. The first 15 (Pratipada to Purnima) form Shukla Paksha; the next 15 (Pratipada to Amavasya) form Krishna Paksha.</p>
<h2>Tithis don't follow the clock</h2><p>The Moon's speed changes along its orbit, so a tithi can last anywhere from about 19 to 26 hours, and it can start at any time of day. Sometimes a tithi begins and ends between two sunrises and is "skipped" (kshaya tithi); sometimes one covers two sunrises (vriddhi tithi).</p>
<h2>How a festival day is chosen</h2><p>Each festival has a rule for which moment of the day the tithi must cover. For example:</p>
<ul><li><strong>Karva Chauth, Sankashti Chaturthi</strong>: the Chaturthi should prevail at moonrise.</li><li><strong>Diwali</strong>: Amavasya should prevail during Pradosh Kaal, just after sunset.</li><li><strong>Ganesh Chaturthi</strong>: Chaturthi at midday.</li><li><strong>Most Purnima festivals</strong>: the tithi at sunrise (udaya tithi).</li></ul>
<p>Because tithi times are the same everywhere while sunrise and moonrise change by place, two calendars (or two regions) can occasionally put the same festival on different days.</p>
<h2>Amanta and Purnimanta months</h2><p>North India usually ends a month on Purnima (Purnimanta), while Maharashtra, Gujarat and South India end it on Amavasya (Amanta). The festival is the same; only the month name of the Krishna Paksha differs. Karva Chauth is "Kartik Krishna Chaturthi" in the north and "Ashvin Krishna Chaturthi" in Amanta calendars.</p>` },
  {
    slug: 'why-moonrise-differs-by-city', title: 'Why is moonrise at different times in different cities?', desc: 'Why Kolkata sees the moon up to an hour before Mumbai, even though all of India uses the same time zone.',
    html: `<p class="lead">All of India uses one clock (IST), but the country is about 30° wide from east to west. The sky turns 15° every hour, so the moon reaches the eastern horizon of Kolkata or Guwahati long before it reaches Mumbai or Ahmedabad.</p>
<h2>East to west: up to two hours</h2><p>Between Arunachal Pradesh and Gujarat the difference in moonrise can be close to two hours. Between Kolkata and Mumbai it is usually 60–75 minutes.</p>
<h2>North to south</h2><p>Latitude also matters, because the Moon's path crosses the horizon at a slant. Depending on the season, a northern city can see the moon earlier or later than a southern city at the same longitude.</p>
<h2>Why you may not see it at the exact minute</h2><p>Moonrise is calculated for a flat, clear horizon. Buildings, trees, hills, haze and clouds can hide the moon for another 10–30 minutes. If you're waiting to break a fast, go to a rooftop or open ground and look towards the east (or the direction shown in our camera finder).</p>` },
  {
    slug: 'how-to-see-the-new-crescent', title: 'How to spot the new crescent moon (Eid and Chandra Darshan)', desc: 'Practical tips for seeing the thin crescent after Amavasya: where to look, when, and why it is often missed.',
    html: `<p class="lead">The first crescent after the new moon is thin, faint and close to the setting sun. You usually have a window of only 20–40 minutes.</p>
<h2>Where and when to look</h2><ul><li>Face <strong>west</strong>, slightly towards where the sun set.</li><li>Start looking about 10–15 minutes after sunset, once the sky begins to darken.</li><li>The crescent will be low, just a few finger-widths above the horizon, with its bright edge facing the sun.</li><li>It sets at the moonset time shown on our Eid and Chandra Darshan pages.</li></ul>
<h2>What helps</h2><p>A clear, unobstructed western horizon (rooftop, open field, beach), clean air after rain, and binoculars to find it first. Never point binoculars at the sun before it has fully set.</p>
<h2>Why predictions can be a day off</h2><p>Visibility depends on the Moon's age, how far it is from the Sun, how long it stays up after sunset, and the weather. Our dates use an astronomical estimate for India. Official Islamic dates are announced by moon-sighting committees.</p>` },
];

function learnIndex() {
  const body = simpleHero('Learn about the Moon', 'Short, simple guides behind the times on this site.') + `<div class="wrap"><div class="grid">${ARTICLES.map(a => `<a class="card" href="${url('en', `/learn/${a.slug}/`)}" style="text-decoration:none;color:inherit"><h3>${esc(a.title)}</h3><p class="muted small">${esc(a.desc)}</p></a>`).join('')}</div></div>`;
  return page({ lang: 'en', path: '/learn/', alt: false, title: 'Learn about the Moon | Moon Finder', desc: 'Simple guides to moon phases, tithis, moonrise times and spotting the crescent.', body });
}
function learnPage(a) {
  const body = simpleHero(a.title, '', breadcrumbs([['Learn', url('en', '/learn/')], [a.title]])) + `<div class="wrap"><article class="prose">${a.html}</article>${adSlot()}<p><a href="${url('en', '/learn/')}">← All guides</a></p></div>`;
  return page({ lang: 'en', path: `/learn/${a.slug}/`, alt: false, title: `${a.title} | Moon Finder`, desc: a.desc, body,
    ld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.desc, inLanguage: 'en-IN' }] });
}

function legal(slug, title, html) {
  const body = simpleHero(title) + `<div class="wrap"><article class="prose">${html}</article></div>`;
  return page({ lang: 'en', path: `/${slug}/`, alt: false, title: `${title} | Moon Finder`, desc: `${title} for Moon Finder.`, body });
}
function legalPages() {
  const c = cfg();
  const contact = c.contactEmail ? `<a href="mailto:${esc(c.contactEmail)}">${esc(c.contactEmail)}</a>` : `<a href="${esc(c.repoUrl)}/issues">our GitHub issues page</a>`;
  return [
    ['about', 'About Moon Finder', `<p class="lead">Moon Finder answers one question people across India ask on festival days: <strong>when will the moon rise in my city?</strong></p>
<p>We calculate moonrise, moonset, tithi and eclipse times for every district of India, and festival dates for Karva Chauth, Sankashti Chaturthi, Sharad Purnima, Eid, lunar eclipses and more, in English and Hindi. The live camera finder helps you spot the moon by pointing your phone at the sky.</p>
<h2>How the times are calculated</h2><p>Positions of the Sun and Moon come from <a href="https://github.com/cosinekitty/astronomy">Astronomy Engine</a>, an open-source library accurate to well under a minute of arc. Rise and set times include atmospheric refraction and are given for each city's centre and a flat horizon. Festival days follow common North Indian panchang rules (described in <a href="${url('en', '/learn/what-is-a-tithi/')}">What is a tithi?</a>).</p>
<h2>Limits</h2><p>Regional calendars, sampradaya rules and moon-sighting committees can differ from our calculations, usually by at most one day. For religious observances, please confirm with your local panchang, priest or committee.</p>
<h2>Report an error</h2><p>If a time looks wrong for your city, tell us via ${contact}. Please include the city, date and the time you expected.</p>`],
    ['contact', 'Contact', `<p>Questions, corrections or partnership enquiries: ${contact}.</p><p>When reporting a time that looks wrong, please include the page link, your city and the time you observed or expected.</p>`],
    ['privacy', 'Privacy Policy', `<p><em>Last updated: ${esc(c.policyDate)}</em></p>
<p>This policy explains what information Moon Finder ("we") collects when you use this website and how it is used.</p>
<h2>Information we collect</h2><ul>
<li><strong>Location:</strong> if you tap "Use my location" or open the camera finder, your browser asks for permission. Your location is used only inside your browser to pick the nearest city or compute the moon's position. It is never sent to our servers.</li>
<li><strong>Camera and motion sensors:</strong> used only on your device for the camera finder. No images or video are recorded or uploaded.</li>
<li><strong>Preferences:</strong> your light/dark theme choice is stored in your browser's local storage.</li>
<li><strong>Analytics:</strong> we may use privacy-friendly analytics (such as Google Analytics or Cloudflare Web Analytics) to count visits and see which pages are useful. These tools may collect your IP address, browser type and pages viewed.</li></ul>
<h2>Advertising and cookies</h2><p>We may show ads served by Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visits to this site and/or other sites on the Internet. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads">Google Ads Settings</a>, or opt out of some third-party vendors' cookies at <a href="https://www.aboutads.info/choices/">www.aboutads.info</a>. See <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p>
<h2>Affiliate links</h2><p>Some festival pages include links to products on Amazon.in. Moon Finder is a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in. If you buy through these links we may earn a small commission at no extra cost to you. Amazon may set cookies when you click such a link.</p>
<h2>Your choices</h2><p>You can block or delete cookies in your browser settings, deny location and camera access, and use the site without them (you can always pick your city manually).</p>
<h2>Children</h2><p>This site is a general-audience reference and does not knowingly collect personal information from children.</p>
<h2>Changes and contact</h2><p>We may update this policy; the date above shows the latest version. Questions: ${contact}.</p>`],
    ['disclaimer', 'Disclaimer', `<p>Moonrise, moonset, tithi, eclipse and festival information on Moon Finder is calculated astronomically and provided for general information only.</p>
<ul><li>Times are for the centre of each listed city with a flat horizon. Local terrain, buildings and weather can delay when you actually see the moon by several minutes.</li>
<li>Hindu festival dates follow common North Indian panchang rules. Regional calendars and traditions (Amanta/Purnimanta, Smarta/Vaishnava, local muhurat rules such as Bhadra) can differ.</li>
<li>Islamic dates are astronomical predictions for India. Official dates depend on moon sighting and are announced by local committees.</li>
<li>For religious observances, please consult your local panchang, priest or moon-sighting committee.</li></ul>
<p><strong>Affiliate disclosure:</strong> some pages contain affiliate links to Amazon.in. As an Amazon Associate we earn from qualifying purchases. Product suggestions are general and we do not review or guarantee individual products.</p>
<p>We make no warranty about accuracy or completeness and are not responsible for decisions made using this information.</p>`],
  ].map(([s, t, h]) => [s, legal(s, t, h)]);
}

function notFound() {
  const body = simpleHero('Page not found', 'This page has drifted out of orbit.', '', 30) + `<div class="wrap"><p><a class="btn" href="${url('en', '/')}">Go to the home page</a></p></div>`;
  return page({ lang: 'en', path: '/404.html', alt: false, noindex: true, title: 'Page not found | Moon Finder', desc: 'Page not found.', body });
}

// The live tool: the original single-page Moon Finder, restyled.
const FINDER_FAQ = [
  ['Where is the moon right now from my location?', 'Allow location access and the page shows the moon\'s direction (for example south-east) and its height in degrees for this moment. If the moon is below the horizon, it tells you when it rises.'],
  ['Can I see a live view of the moon from my location?', 'Yes. Tap "Show me with the camera" and your phone camera shows the live sky with the moon\'s position marked, so you can find it even when it is low, faint or behind clouds.'],
  ['How do I find the next full moon from my location?', 'The page shows the date of the next full moon and today\'s moonrise for where you are. The full moon page lists every full moon of the year with its exact time and the moonrise in your city.'],
  ['Is this moon finder free?', 'Yes. It is free, runs in your browser and needs no app or account. Your location stays on your phone; it is only used to work out the moon\'s position.'],
  ['How do I find the moon with my phone camera?', 'Tap "Show me with the camera", allow the camera and motion sensors, and turn slowly. The arrow points towards the moon and a ring appears when you are facing it.'],
  ['Does the moon finder work without the internet or an app?', 'It runs in the browser. Once the page has loaded, all calculations happen on your phone.'],
];
function finderPage() {
  const body = `<div class="wrap finder-main">
<h1 style="margin-top:18px">Live moon view from your location</h1>
<p class="muted" style="text-align:center;margin:4px 0 0">Free online moon finder: see where the moon is right now, and when the next full moon is.</p>
<div style="text-align:center"><svg id="moon" viewBox="0 0 200 200" width="180" height="180" class="moon-glow" role="img" aria-label="Moon phase"></svg>
<p style="font-size:1.5rem;font-weight:700;margin:6px 0 0" id="phaseName">Loading…</p><p class="muted" id="illum" style="margin:0"></p></div>
<div class="card" style="margin:16px 0 12px;text-align:center"><span class="chip" id="visible">…</span><p style="font-size:1.2rem;font-weight:700;margin:10px 0 2px" id="look">Finding your location…</p><p class="muted" id="lookSub" style="margin:0"></p></div>
<button class="btn" id="camBtn" type="button" style="width:100%;padding:16px">📷 Show me with the camera</button>
<div class="tiles"><div class="tile"><div class="label">Moonrise</div><div class="value" id="rise">–</div></div><div class="tile"><div class="label">Moonset</div><div class="value" id="set">–</div></div><div class="tile"><div class="label">Next full moon</div><div class="value" id="nextFull">–</div></div><div class="tile"><div class="label">Next new moon</div><div class="value" id="nextNew">–</div></div></div>
<details class="faq" style="margin-top:12px"><summary>More details</summary><div><svg id="sky" viewBox="0 0 220 220" role="img" aria-label="Moon position in the sky"></svg><dl class="kv"><dt>Direction</dt><dd id="az">–</dd><dt>Height above horizon</dt><dd id="alt">–</dd><dt>Moon age</dt><dd id="age">–</dd><dt>Distance</dt><dd id="dist">–</dd></dl><p></p></div></details>
<details class="faq" id="placeBox"><summary>Change place or time</summary><div><p class="muted small" id="loc">–</p><form id="form" class="form"><label>Latitude <input id="lat" type="number" step="any" min="-90" max="90" required inputmode="decimal"></label><label>Longitude <input id="lng" type="number" step="any" min="-180" max="180" required inputmode="decimal"></label><label class="full">Date &amp; time (leave empty for now) <input id="when" type="datetime-local"></label><div class="row"><button class="btn" type="submit">Update</button><button class="btn ghost" type="button" id="useGps">Use my location</button><button class="btn ghost" type="button" id="nowBtn">Now</button></div></form><p id="msg" style="color:var(--warn)"></p></div></details>
<p class="muted small" style="text-align:center">Times use your device's time zone. Positions are approximate (about 1°).</p>
<div id="cam" hidden><video id="video" playsinline muted autoplay></video><canvas id="overlay"></canvas><div id="camTop"><div id="camInfo">Starting camera…</div><button type="button" class="icon-btn" id="camClose" aria-label="Close camera" style="background:rgba(0,0,0,.45);color:#fff">✕</button></div><div id="camHint"></div></div>
<section class="section prose"><h2>Live moon view and moon finder: where is the moon right now?</h2>
<p>This free moon finder works online from your location, with no app to install and no sign-up. It shows the moon's position now: its direction on the compass, its height above the horizon, today's moonrise and moonset time, the moon phase and the date of the next full moon. Tap the camera button and hold your phone up for a live view of the sky; an arrow guides you to the moon and a ring marks it when you are facing it.</p>
<div class="pills"><a href="${url('en', '/moon-today/')}">Moon today</a><a href="${url('en', '/moonrise/')}">Moon rise time in your city</a><a href="${url('en', '/full-moon/')}">Full moon finder: next full moon</a><a href="${url('en', '/solar-system/')}">Moon position in the solar system (3D)</a><a href="${url('en', '/star-finder/')}">✨ Star Finder: constellations and planets</a></div>
${faqHtml(FINDER_FAQ)}</section>
</div>
<script src="${cfg().base}/assets/finder.js?v=${cfg().version}" defer></script>`;
  return page({ lang: 'en', path: '/moon-finder/', alt: false, title: 'Live Moon View from My Location – Free Online Moon Finder & Tracker', desc: 'Free live moon finder: where is the moon right now from my location? See its direction and height, moonrise, moonset, the next full moon, and a live camera view that points you to the moon.', body, navActive: 'finder',
    ld: [faqLd(FINDER_FAQ), { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Moon Finder – live moon view from your location', url: abs('en', '/moon-finder/'), applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (runs in the browser)', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, description: 'Find the moon in the sky from your location: direction, height, moonrise, moonset, next full moon and a live camera view.' }] });
}

// 3D view: Earth globe with your place and the Moon, and the solar system (assets/space.js).
function spacePage() {
  const v = cfg().base + '/assets/vendor/', ver = '?v=' + cfg().version;
  const faq = [
    ['Is this the real position of the Moon and planets?', 'Yes. Positions are calculated for the date and time shown, using the same astronomy library as the rest of this site. The Earth is turned to the correct angle, so the side facing the Sun is in daylight and your place is where it really is at that moment.'],
    ['Why do the planets look so close together?', 'Real distances are far too large to draw: Neptune is about 30 times farther from the Sun than the Earth. Distances are squeezed and the planets are drawn much bigger than they are, but every direction and orbit shape is real.'],
    ['How does the Moon move around the Earth?', 'The Moon goes around the Earth once in about 27.3 days, moving roughly 13° eastward each day. Set the speed to "1 day per second" in the Earth and Moon view to watch a full orbit and the phases change.'],
    ['What does the line from my place to the Moon mean?', 'It points from your location towards the Moon. It is bright when the Moon is above your horizon and grey when the Earth is in the way. The panel shows the exact height and compass direction.'],
  ];
  const body = `<div class="wrap space-main">
${breadcrumbs([['Today', url('en', '/')], ['3D solar system']])}
<h1>3D Solar System and Moon Tracker</h1>
<p class="muted">See where the Moon and the planets are right now, and where your place sits on the turning Earth. Drag to rotate, pinch or scroll to zoom.</p>
<div class="btn-row space-tabs" role="group" aria-label="View"><button class="btn" type="button" data-mode="earth" aria-pressed="true">🌍 Earth and Moon</button><button class="btn" type="button" data-mode="solar" aria-pressed="false">🪐 Solar system</button></div>
<div id="space" data-land="${v}land.json${ver}" role="img" aria-label="3D view of the Earth, Moon and planets"></div>
<p class="muted small" id="spaceMsg" role="status"></p>
<div class="space-bar">
  <button class="btn" type="button" id="play">⏸ Pause</button>
  <label>Speed <select id="speed"><option value="1">Real time</option><option value="600">10 minutes per second</option><option value="3600">1 hour per second</option><option value="21600">6 hours per second</option><option value="86400">1 day per second</option><option value="432000">5 days per second</option><option value="2592000">30 days per second</option><option value="31557600">1 year per second</option></select></label>
  <label>Date and time <input type="datetime-local" id="when"></label>
  <button class="btn ghost" type="button" id="now">Now</button>
</div>
<p class="space-time"><strong id="rTime">…</strong></p>
<div data-show="earth">
  <div class="space-bar">
    <label>City <select id="city"><option value="">Pick a city…</option></select></label>
    <button class="btn ghost" type="button" id="near">📍 Use my location</button>
    <button class="btn ghost" type="button" id="faceMe">Show my place</button>
    <button class="btn ghost" type="button" id="wholeOrbit">Show Moon's orbit</button>
    <label class="check"><input type="checkbox" id="trueScale"> True distance (Moon is 60 Earth-radii away)</label>
  </div>
  <div class="card space-read"><p><span class="chip" id="rMoonUp">…</span> <span class="muted" id="rPlace"></span></p>
  <dl class="kv"><dt>Moon height above horizon</dt><dd id="rAlt">–</dd><dt>Moon direction</dt><dd id="rAz">–</dd><dt>Phase</dt><dd id="rPhase">–</dd><dt>Distance from Earth</dt><dd id="rDist">–</dd><dt>At your place it is</dt><dd id="rSun">–</dd></dl></div>
  <p class="muted small">Red dot: your place. Yellow line: direction from your place to the Moon. The Moon's distance is drawn 10 times closer than real unless you tick "True distance".</p>
</div>
<div data-show="solar" hidden>
  <div class="space-bar"><label>Keep in the centre <select id="focus"><option value="Sun">Sun</option></select></label></div>
  <div class="table-wrap"><table><thead><tr><th>Planet</th><th>Distance from the Sun</th><th>Distance from the Earth</th></tr></thead><tbody id="planetRows"></tbody></table></div>
  <p class="muted small">Directions and orbit shapes are real. Distances are squeezed and planet sizes enlarged so everything fits on one screen. 1 AU is the average Earth–Sun distance, about 149.6 million km.</p>
</div>
${adSlot()}
<section class="section"><h2>Questions people ask</h2>${faq.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</section>
<div class="pills"><a href="${url('en', '/moon-today/')}">Moon today</a><a href="${url('en', '/moon-finder/')}">📷 Find the Moon with your camera</a><a href="${url('en', '/star-finder/')}">✨ Star Finder</a><a href="${url('en', '/full-moon/')}">Full moon dates</a><a href="${url('en', '/chandra-grahan/')}">Lunar eclipse</a></div>
</div>
<script type="importmap">{"imports":{"three":"${v}three.module.min.js${ver}","three/addons/controls/OrbitControls.js":"${v}OrbitControls.js${ver}"}}</script>
<script src="${v}astronomy.browser.min.js${ver}" defer></script>
<script type="module" src="${cfg().base}/assets/space.js${ver}"></script>`;
  return page({ lang: 'en', path: '/solar-system/', alt: false, body, navActive: 'finder',
    title: 'Solar System 3D Live View: Planet Positions Today & Moon Tracker',
    desc: 'Solar system live 3D view: planet positions today, the Moon\'s position and orbit around the Earth, and your own location on a turning 3D globe.',
    ld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] });
}

// Star Finder: live sky map of stars, constellations and planets, with an optional camera view (assets/sky.js).
// A separate page and script, so the Moon Finder (/moon-finder/, assets/finder.js) is not affected.
const STAR_FAQ = [
  ['How do I find constellations from my location with my phone?', 'Open this page, allow location, tap "Point your camera at the sky" and allow the camera and motion sensors. Hold your phone up: the stars, constellation lines and planets are drawn over the camera picture, in the direction you are pointing.'],
  ['Which planets can I see tonight?', 'The table above lists the Moon, Mercury, Venus, Mars, Jupiter and Saturn with where they are now and their next rise and set times for your place. Venus and Jupiter are the easiest: they shine brighter than any star.'],
  ['Why can\'t I see the stars on the map in the real sky?', 'In the daytime and in twilight, sunlight hides the stars. City lights and haze also hide faint stars, so in a city you may only see the brightest few and the planets. Try a dark place about an hour after sunset.'],
  ['The map does not line up with the sky. What can I do?', 'Phone compasses are often off by 10° or more, especially near metal or magnets. Point the middle of the screen at the Moon, a planet or a very bright star and tap "Fix alignment". Moving the phone in a figure-8 also recalibrates the compass.'],
  ['What are the Indian names of the stars and constellations?', 'Where a well-known Indian name exists it is shown next to the international one, for example Saptarishi (Big Dipper), Mriga (Orion), Dhruva tara (Polaris), Rohini (Aldebaran) and Chitra (Spica), and the twelve rashi constellations from Mesh to Meen.'],
  ['Is the Star Finder free and does it need an app?', 'It is free and works in your phone or computer browser. Your location is used only on your device to work out the sky; nothing is sent to us.'],
];
function starPage() {
  const v = cfg().base + '/assets/', ver = '?v=' + cfg().version;
  const body = `<link rel="stylesheet" href="${v}sky.css${ver}">
<div class="wrap sky-main">
${breadcrumbs([['Today', url('en', '/')], ['Star Finder']])}
<h1>Star Finder: live sky map from your location</h1>
<p class="muted">See the stars, constellations and planets in your sky right now. Drag to look around, or point your phone camera at the sky and the map follows it. Free, no app.</p>
<div id="skyBox" class="sky-box" data-sky="${v}sky.json${ver}" role="application" aria-label="Live sky map: drag to look around, tap a star to name it">
  <video id="skyVideo" playsinline muted autoplay hidden></video>
  <canvas id="skyCanvas"></canvas>
  <div class="sky-top"><span id="skyInfo">Loading the sky…</span><span class="sky-btns"><button type="button" id="skyFull" aria-label="Full screen">⛶ Full screen</button><button type="button" id="skyClose" aria-label="Close">✕</button></span></div>
  <div id="skyTip" role="status" hidden></div>
  <button type="button" class="btn small" id="alignBtn" hidden>🎯 Fix alignment</button>
  <div id="skyHint" role="status"></div>
</div>
<div class="sky-controls">
  <button class="btn" id="camBtn" type="button">📷 Point your camera at the sky</button>
  <div class="row"><form id="skyFind" role="search"><input type="search" id="skyQ" list="skyList" placeholder="Find Jupiter, Orion, Saptarishi, Sirius…" aria-label="Find a star, planet or constellation" autocomplete="off"><button class="btn small" type="submit">Find</button></form><datalist id="skyList"></datalist></div>
  <div class="row"><label for="skyTime">Time</label><input type="range" id="skyTime" min="-1440" max="1440" step="10" value="0"><strong id="skyWhen">Now</strong><button class="btn ghost small" type="button" id="skyNow">Now</button><button class="btn ghost small" type="button" id="skyTonight">Tonight 9 PM</button></div>
  <div class="row"><label class="check"><input type="checkbox" id="optLines" checked> Constellation lines</label><label class="check"><input type="checkbox" id="optNames" checked> Names</label><label class="check"><input type="checkbox" id="optFaint"> Faint stars</label></div>
  <p class="muted small" style="margin:0">Sky for <span id="skyPlace">your location…</span> <button type="button" class="linkish" id="skyGps">📍 Use my location</button></p>
</div>
<section class="section"><h2>Planets and the Moon tonight</h2>
<div class="table-wrap"><table><thead><tr><th>Object</th><th>Now</th><th>Next rise</th><th>Next set</th></tr></thead><tbody id="planetRows"><tr><td colspan="4">Working out your sky…</td></tr></tbody></table></div>
<p class="muted small">Times are in your device's time zone. Tap a name to find it on the map.</p></section>
${adSlot()}
<section class="section prose"><h2>See constellations and planets with your phone camera</h2>
<p>This star finder shows the night sky from your location: about 2,800 stars, all 88 constellations with their lines and names, the Moon and the five planets you can see with your eyes. Point your phone at the sky and the map moves with it, drawn over the live camera picture, so you can put a name to the bright star you are looking at or find Saptarishi and Dhruva tara. On a computer, drag the sky to look around and use the time slider to see tonight's sky in advance.</p>
<div class="pills"><a href="${url('en', '/moon-finder/')}">📷 Find the Moon</a><a href="${url('en', '/solar-system/')}">🪐 3D solar system</a><a href="${url('en', '/moon-today/')}">Moon today</a><a href="${url('en', '/full-moon/')}">Next full moon</a></div>
${faqHtml(STAR_FAQ)}
<p class="muted small">Star positions: Hipparcos (XHIP) via <a href="https://github.com/ofrohn/d3-celestial">d3-celestial</a> data (BSD licence, Olaf Frohn); constellation lines and names after the IAU. Planet positions: Astronomy Engine (MIT).</p></section>
</div>
<script src="${v}vendor/astronomy.browser.min.js${ver}" defer></script>
<script src="${v}sky.js${ver}" defer></script>`;
  return page({ lang: 'en', path: '/star-finder/', alt: false, body, navActive: 'finder',
    title: 'Star Finder Online: Live Sky Map from My Location – Constellations & Planets with Camera',
    desc: 'Free star finder: point your phone camera at the sky to see the stars, constellations and planets from your location right now, with Indian names like Saptarishi and Dhruva tara.',
    ld: [faqLd(STAR_FAQ), { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Star Finder – live sky map from your location', url: abs('en', '/star-finder/'), applicationCategory: 'EducationalApplication', operatingSystem: 'Any (runs in the browser)', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, description: 'Live sky map of stars, constellations and planets for your place and time, with an optional camera view.' }] });
}

module.exports = { ARTICLES, learnIndex, learnPage, legalPages, notFound, finderPage, spacePage, starPage };
