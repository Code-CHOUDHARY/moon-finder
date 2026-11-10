// Learn articles, legal pages, the live Moon Finder tool and 404.
'use strict';
const { esc, url, page, breadcrumbs, moonSvg, cfg, adSlot } = require('./ui');

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
function finderPage() {
  const body = `<div class="wrap finder-main">
<h1 style="margin-top:18px">Find the Moon now</h1>
<div style="text-align:center"><svg id="moon" viewBox="0 0 200 200" width="180" height="180" class="moon-glow" role="img" aria-label="Moon phase"></svg>
<p style="font-size:1.5rem;font-weight:700;margin:6px 0 0" id="phaseName">Loading…</p><p class="muted" id="illum" style="margin:0"></p></div>
<div class="card" style="margin:16px 0 12px;text-align:center"><span class="chip" id="visible">…</span><p style="font-size:1.2rem;font-weight:700;margin:10px 0 2px" id="look">Finding your location…</p><p class="muted" id="lookSub" style="margin:0"></p></div>
<button class="btn" id="camBtn" type="button" style="width:100%;padding:16px">📷 Show me with the camera</button>
<div class="tiles"><div class="tile"><div class="label">Moonrise</div><div class="value" id="rise">–</div></div><div class="tile"><div class="label">Moonset</div><div class="value" id="set">–</div></div><div class="tile"><div class="label">Next full moon</div><div class="value" id="nextFull">–</div></div><div class="tile"><div class="label">Next new moon</div><div class="value" id="nextNew">–</div></div></div>
<details class="faq" style="margin-top:12px"><summary>More details</summary><div><svg id="sky" viewBox="0 0 220 220" role="img" aria-label="Moon position in the sky"></svg><dl class="kv"><dt>Direction</dt><dd id="az">–</dd><dt>Height above horizon</dt><dd id="alt">–</dd><dt>Moon age</dt><dd id="age">–</dd><dt>Distance</dt><dd id="dist">–</dd></dl><p></p></div></details>
<details class="faq" id="placeBox"><summary>Change place or time</summary><div><p class="muted small" id="loc">–</p><form id="form" class="form"><label>Latitude <input id="lat" type="number" step="any" min="-90" max="90" required inputmode="decimal"></label><label>Longitude <input id="lng" type="number" step="any" min="-180" max="180" required inputmode="decimal"></label><label class="full">Date &amp; time (leave empty for now) <input id="when" type="datetime-local"></label><div class="row"><button class="btn" type="submit">Update</button><button class="btn ghost" type="button" id="useGps">Use my location</button><button class="btn ghost" type="button" id="nowBtn">Now</button></div></form><p id="msg" style="color:var(--warn)"></p></div></details>
<p class="muted small" style="text-align:center">Times use your device's time zone. Positions are approximate (about 1°).</p>
<div id="cam" hidden><video id="video" playsinline muted autoplay></video><canvas id="overlay"></canvas><div id="camTop"><div id="camInfo">Starting camera…</div><button type="button" class="icon-btn" id="camClose" aria-label="Close camera" style="background:rgba(0,0,0,.45);color:#fff">✕</button></div><div id="camHint"></div></div>
</div>
<script src="${cfg().base}/assets/finder.js?v=${cfg().version}" defer></script>`;
  return page({ lang: 'en', path: '/moon-finder/', alt: false, title: 'Find the Moon Now – Live Moon Position & Camera Finder | Moon Finder', desc: 'Where is the moon right now? Live direction, height, moonrise and moonset for your location, with a camera finder that points you to the moon.', body, navActive: 'finder' });
}

module.exports = { ARTICLES, learnIndex, learnPage, legalPages, notFound, finderPage };
