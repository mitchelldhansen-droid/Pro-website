---
name: verify
description: How to run and verify this static portfolio site locally
---

# Verifying Pro-website changes

Static HTML/CSS site (GitHub Pages), no build step.

## Serve

The Claude-in-Chrome extension cannot open `file://` URLs — serve over HTTP:

```bash
python -m http.server 8137   # run from repo root, in background
```

Browse `http://localhost:8137/index.html`. Site deploys to
`https://mitchelldhansen-droid.github.io/Pro-website/` (note the subpath —
subpages use relative asset links like `../styles.css`, so both work).

## Drive

- Homepage sections use a scroll-reveal script (`script.js`): sections are
  `opacity: 0` until the IntersectionObserver fires. A screenshot taken
  mid-smooth-scroll can look blank — scroll a tick and re-shoot before
  concluding anything is broken.
- If a screenshot comes back solid black AND the fixed nav is missing, the
  tab renderer is frozen (CDP screenshot timeouts confirm it). The page is
  fine — open a fresh tab.

## Mobile / responsive check

Headless Chrome clamps windows to ~512px wide, so `--window-size=390,...`
screenshots are CROPPED, not real 390px renders — text appears cut off at
the right edge as an artifact. For a true narrow-viewport test, wrap the
page in a 390px iframe (same origin via localhost) and print
`scrollWidth` vs `clientWidth` from the wrapper. Delete the wrapper file
from the repo afterward.

## Headless screenshot gotchas (also used for OG images)

- Use a scratch `--user-data-dir`; back-to-back launches sharing a profile
  fail silently (no screenshot written). One profile per invocation is safest.
- `--virtual-time-budget=8000` gives Google Fonts time to load.
- OG image recipe lives in `writing/_og-template.html` comments.
