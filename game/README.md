# Wilds vs Zombies — frontend (test build)

Static front-end build of the slot. Self-contained: HTML + JS bundle + art/audio.
No math/server is bundled — outcomes come from one of two sources (see **Connecting**).

## Run it

**Option A — standalone (easiest, random outcomes for testing look/feel):**
```bash
node wvz_static_server.js        # serves on http://127.0.0.1:8000 (falls back to 3000/8080/...)
# open http://127.0.0.1:8000 in a browser
```
With no `rgs_url` parameter the game runs its **built-in local simulation** (random
results). Perfect for testing animations, UI, and flow. No math files needed.

**Option B — GitHub Pages / any static host:**
Just host this folder's contents at the repo root. Opening the page runs the same
local-sim mode. (Pages serves static files only, so it's sim mode — same as Option A.)

**Option C — Stake dev tool (real math / RGS):**
Point the dev-tool profile's `gameUrl` at the served frontend **with** the RGS param:
```
http://localhost:8000/?sessionID=10000&rgs_url=localhost:3001/api/rgs/<game-slug>&lang=en&currency=USD&device=desktop
```
The dev tool runs the RGS from its configured math `gamePath`. The math books are
**not** in this folder (they're multi-GB) — supply them separately to the dev tool.

## Connecting (how it picks RGS vs sim)
- The frontend reads the `rgs_url` URL parameter.
- If `rgs_url` contains `/api/rgs/` → it talks to that real RGS.
- Otherwise → **local simulation** (random outcomes).

## Structure
```
index.html                      entry page (loads the bundle + CSS)
wvz_static_server.js            tiny static server (no-store + CORS headers)
assets/
  index-WVZFight54.js           main game bundle (entry)
  browserAll-BzEDH3Mw.js        code chunk (imported by the entry)
  init-PlFnq8It.js              code chunk (imported by the entry)
  rolldown-runtime-*.js         module runtime
  Geometry-*.js                 geometry helper
  index-CeK7GsIl.css            styles
  animation/ audio/ backgrounds/ fonts/ symbols/ ui/   art + audio
```

## Updating the bundle (avoid the "stuck at 0%" trap)
The entry imports the two chunks by **filename**. If you rename/replace the entry
(`index-WVZFight##.js`) you MUST keep the import names consistent across all three:
`index.html` → entry, and entry ↔ `browserAll-*.js` ↔ `init-*.js` must all reference
the same files. A mismatch makes the module graph load twice and the loader hangs at 0%.

## Git note
`.env*` is gitignored (the only env file here is a throwaway Vercel token).
