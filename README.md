# Moon Finder 2.0 — festival moonrise times for India

A static website that answers *"chand kab niklega?"* for every major Indian festival, in **English and Hindi**, for every district of India.

- ~22,250 pages generated from templates (every district of India, 56 festivals, including South Indian festivals for Tamil Nadu, Kerala, Karnataka, Andhra Pradesh and Telangana): festivals, festival × city, city moonrise pages, yearly Purnima / Amavasya / Ekadashi / Sankashti / Chandra Darshan lists, monthly moon calendars (all-India and one per state, with that state's festivals), guides and legal pages.
- Festive night-sky design with a colour "skin" per festival (Karva Chauth red-gold, Eid emerald, Diwali gold…), phone-first, light/dark mode.
- **Regional calendars** (`/hindi-calendar/`, `/marathi-calendar/`, `/gujarati-calendar/`, `/kannada-calendar/`, `/telugu-calendar/`, `/tamil-calendar/`, `/malayalam-calendar/`, `/bengali-calendar/`, `/odia-calendar/`, `/punjabi-calendar/`, `/assamese-calendar/`, `/islamic-calendar/`): a hub page, a page per year and a page per month, with month, weekday and tithi names in the calendar's own script.
- **Moon pages**: `/moon-today/` (phase, moonrise by city, next 30 days), `/full-moon/` and `/new-moon/` (every date with the exact time).
- **3D solar system** (`/solar-system/`): a live 3D view with two modes. *Earth and Moon* shows the turning globe with your place pinned on it, day and night, the Moon on its real orbit and a line from your place to the Moon. *Solar system* shows where every planet is now. Both have play, speed and date controls. Code is in `assets/space.js`; three.js, Astronomy Engine and Natural Earth coastlines are copied from `node_modules` at build time, so nothing loads from another site.
- **Sun-based festivals** (`src/festivals-sun.js`): Chhath Puja, Lohri, Vaisakhi, Poila Boishakh, Pana Sankranti and Bohag Bihu, with city pages in the states that observe them, plus `/sun-today/` and sunrise/sunset on every city page.
- Live **camera finder** (`/moon-finder/`) — the original Moon Finder app, restyled.
- Rebuilt automatically every morning so "today" pages and countdowns stay current.

## How it works

| File | What it does |
| --- | --- |
| `build.js` | Generates everything into `dist/` |
| `src/astro.js` | Astronomy (via [astronomy-engine](https://github.com/cosinekitty/astronomy), MIT): rise/set, tithi, lunar months with Adhika Maas, eclipses, Islamic crescent prediction |
| `src/festivals.js` | Festival rules + English/Hindi content, FAQs and colour skins — **edit this to add or change festivals** |
| `src/festivals-south.js` | South Indian festivals (Pongal, Vishu, Onam, Karthigai Deepam, Ugadi, Varalakshmi Vratam…) plus Maha Shivaratri, Ram Navami, Janmashtami, Navaratri and Dussehra |
| `src/cities.js` | The original 100 cities (first 60 are "major": shown in festival tables) merged with every district; all places get festival × city pages |
| `src/districts.js` | All 791 districts of India (English, Hindi, state, HQ coordinates) from Wikidata, checked against per-state counts. Districts whose name matches one of the 100 cities (Mumbai City, Bengaluru Urban…) point to that city's page |
| `src/data.js` | Works out every festival date and city time |
| `src/regional.js` | The regional calendars: names in each script, month rules (Amanta/Purnimanta lunar months; solar months by the Tamil, Kerala, Bengal and Odisha sankranti rules; predicted Hijri months), eras and page templates — **edit `CALS` here to add a calendar or correct a name** |
| `src/moon.js` | Moon today, full moon and new moon pages |
| `src/pages.js`, `src/static.js`, `src/ui.js`, `src/i18n.js` | Page templates, shared layout, translations |
| `assets/` | CSS, small site script, camera-finder script, icon, share image |

Festival-day rules (tithi prevailing at sunrise / midday / pradosh / moonrise) follow common North Indian panchang practice. Checked against published dates for 2025–2026: Karva Chauth, Diwali, Holi, Raksha Bandhan, Ganesh Chaturthi, Sharad Purnima, Guru Purnima, Eid al-Fitr and Bakrid all match, and the Karva Chauth 2025 moonrise for Delhi (8:13 PM) and Mumbai (8:55 PM) matches published times. **Before each festival season, spot-check the year's dates against a trusted panchang.** Islamic dates are predictions; committees announce the final date.

South Indian festivals use three more kinds of rule: **solar months** (Sun entering a sidereal sign, Lahiri ayanamsa — Pongal, Tamil New Year and Aadi Perukku count the day if the entry is before sunset; Vishu takes the first sunrise after it), **a nakshatra inside a solar month** (Thai Poosam, Onam, Karthigai Deepam, Arudra Darshan…), and **a tithi inside a solar month** (Vaikunta Ekadasi, Chitra Pournami, Skanda Sashti…). All 28 new festivals were checked against Drik Panchang (New Delhi) and state holiday lists for 2026 and 2027 and match. Temple festivals such as Attukal Pongala are announced by the temple each year.

Regional calendars show the tithi and nakshatra at sunrise in one reference city per calendar (Mumbai for Marathi, Chennai for Tamil, and so on). Checked for 2026: Gudi Padwa/Ugadi year change, Gujarati new year on 10 November (Vikram Samvat 2083), Puthandu 14 April, Chingam 1 on 17 August (Kollam Era 1202), Poila Boishakh 15 April (Bangabda 1433), Pana Sankranti and Vaisakhi 14 April, Ramadan from 19 February. **Names in the regional scripts were typed by hand: ask a native reader to check each calendar once.**

## Run it locally

```bash
npm install
npm run preview        # builds for http://localhost:8080 and serves dist/
```

`BUILD_DATE=2027-10-01 node build.js` builds the site as if it were that day (useful for testing).

## Deploy (GitHub Pages, free)

0. Move `deploy.yml` from the project root into `.github/workflows/deploy.yml` (create the two folders).
1. Push this folder to the `main` branch of the `moon-finder` repo. (The old single `index.html` at the root is no longer used — its code now lives in `assets/finder.js` — so delete it.)
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push and every morning at 05:45 IST. Run it once by hand from the **Actions** tab.

### When you buy the domain (e.g. moonfinder.in)

1. Repo **Settings → Secrets and variables → Actions → Variables** → add `SITE_URL` = `https://moonfinder.in`.
2. **Settings → Pages → Custom domain** → `moonfinder.in`, and tick **Enforce HTTPS**.
3. At your domain registrar, add DNS records: four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` pointing to `code-choudhary.github.io`.
4. Re-run the workflow. The build writes a `CNAME` file automatically.

(Cloudflare Pages also works: build command `npm ci && node build.js`, output folder `dist`, same environment variables. Add a daily Deploy Hook if you go this way.)

## Monetisation settings — `site.config.json`

Edit `site.config.json` in the repo and push; the next build picks the values up. These are public IDs, never put passwords or secret tokens here. (Repo Variables with the upper-case names below still work and take priority.)

| Key (Variable) | Example | Effect |
| --- | --- | --- |
| `siteUrl` (`SITE_URL`) | `https://fullmoonfinder.com` | Canonical URLs, sitemap, CNAME |
| `adsenseClient` (`ADSENSE_CLIENT`) | `ca-pub-1234567890123456` | AdSense site-verification meta tag + Auto ads script + `ads.txt` |
| `adsenseSlot` (`ADSENSE_SLOT`) | `1234567890` | Manual responsive ad units below the answer card and mid-page |
| `amazonTag` (`AMAZON_TAG`) | `fullmoonfind-21` | "Festival shopping" Amazon.in affiliate links on festival pages, with disclosure |
| `gaId` (`GA_ID`) | `G-XXXXXXX` | Google Analytics 4 |
| `googleSiteVerification` (`GSC_VERIFY`) | `abc…` | Google Search Console HTML-tag verification |
| `cloudflareBeaconToken` (`CF_BEACON_TOKEN`) | `abc…` | Cloudflare Web Analytics |
| `contactEmail` (`CONTACT_EMAIL`) | `hello@fullmoonfinder.com` | Shown on Contact/About/Privacy |

## After launch

1. Add the site to Google Search Console and submit `/sitemap.xml`.
2. Apply to AdSense once the domain has been live for a few weeks with traffic. Ads never appear above the moon time or in the camera view.
3. Before each big festival (6 weeks ahead), check that page's dates and share it on WhatsApp/Instagram.

## Credits

three.js (MIT) for the 3D view. Coastlines from Natural Earth (public domain) via world-atlas (ISC). Astronomy Engine (MIT) by Don Cross. Live finder maths adapted from SunCalc (BSD-2-Clause) by Vladimir Agafonkin. City coordinates are approximate city centres.
