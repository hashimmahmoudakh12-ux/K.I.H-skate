# KIH Skateboarding

A single-page site for KIH Skateboarding — a personal skate brand and
instructor site for Khyree Ismael Hashim.

Plain HTML/CSS/JS. No frameworks, no build step.

## Files

- `index.html` — page markup
- `styles.css` — all styling (palette lives in CSS variables at the top)
- `script.js` — smooth-scroll nav, scroll-spy, booking form (mailto)
- `kih-logo.png` — circular sticker logo
- `kih-mascot.png` — transparent mascot
- `khyree.jpg`, `ismael.jpg`, `hashim.jpg` — real instructor photos

## Before you ship

- The booking form has no third-party service in the loop — submitting
  builds a `mailto:` link from the filled-in fields and hands it to the
  browser, which opens the visitor's own email app addressed to
  **kihskateboarding@gmail.com** with everything pre-filled. Zero setup, no
  confirmation-email gate, but it only works if the visitor has a mail app
  configured on whatever device they're on, and they still have to hit
  send themselves — a booking site with a lot of visitors on browser-only
  webmail (no configured mail app) may want a real form backend instead.
  To send bookings to a different address, change `BOOKING_EMAIL` near the
  top of the booking form's handler in `script.js`.
- The "Latest Videos" card embeds a real Instagram reel via Instagram's
  official embed (`embed.js`). To add more clips, copy the
  `<blockquote class="instagram-media" ...>` block in `index.html` and swap
  in the new reel's URL for `data-instgrm-permalink` (and the two `href`s
  inside) — `embed.js` auto-processes every embed block on the page, so no
  other changes are needed.

## Run locally

Any static server works, e.g.:

```
npx serve .
```

## Deploy

Zero-config — import this repo on [vercel.com](https://vercel.com) and it
will deploy as a static site with no build step.
