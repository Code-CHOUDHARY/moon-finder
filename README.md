# 🌙 Moon Finder

Find the Moon in your sky — its phase, when it rises and sets, and exactly where to point your phone.

**Live:** https://code-choudhary.github.io/moon-finder/

## Features

- **Phase** – drawn to match the real Moon (mirrored for the southern hemisphere), with % illuminated and moon age
- **Where to look** – compass direction and height above the horizon, plotted on a small sky map
- **Rise and set times** for today, plus the next full moon and new moon
- **Camera finder** – opens your rear camera and puts a ring on the Moon's position as you move your phone; when it's off screen, an arrow and "turn right 40°, tilt up 20°" hints guide you to it
- **Any place, any time** – uses your device location, or type in latitude/longitude and a date/time

## Usage

Open the live link on your phone, allow location, then tap **📷 Find it with camera** and allow camera and motion access. Hold the phone upright in portrait.

On a laptop (no compass or tilt sensors) the camera view shows written directions instead of a tracking marker.

> The camera and motion sensors only work over **https** (like the GitHub Pages link above) — not when opening the file directly from your phone's storage.

## Run locally

It's a single, dependency-free file. Download `index.html` and open it in a browser — no build step or server needed.

## How it works

- Moon and Sun positions use the algorithms from [SunCalc](https://github.com/mourner/suncalc) (BSD-2-Clause), adapted inline.
- Positions are accurate to about a degree; full/new moon times can be off by a few hours.
- The camera view combines `getUserMedia` (rear camera) with `DeviceOrientationEvent` (compass heading and tilt), assuming a ~60° horizontal field of view.
- Nothing is sent anywhere: location, camera and sensor data stay in your browser.

## Browser support

| | Phase & sky map | Camera finder |
|---|---|---|
| Android Chrome | ✅ | ✅ |
| iPhone Safari | ✅ | ✅ (asks for motion permission) |
| Desktop browsers | ✅ | Camera + written directions only |
