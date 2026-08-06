# KIH Skateboarding

A single-page site for KIH Skateboarding — a personal skate brand and
instructor site for Khyree Ismael Hashim.

Plain HTML/CSS/JS. No frameworks, no build step.

## Files

- `index.html` — page markup
- `styles.css` — all styling (palette lives in CSS variables at the top)
- `script.js` — smooth-scroll nav, scroll-spy
- `kih-logo.png` — circular sticker logo
- `kih-mascot.png` — transparent mascot
- `khyree.jpg`, `ismael.jpg`, `hashim.jpg` — real instructor photos

## Before you ship

- The booking form emails submissions to **kihskateboarding@gmail.com** via
  [FormSubmit](https://formsubmit.co) — no account needed. **The first real
  submission triggers a one-time confirmation email to that inbox; someone
  needs to open it and click "Confirm" before bookings start arriving.**
  After that, every submission is delivered automatically. To send bookings
  to a different address instead, change the email in the form's `action`
  attribute in `index.html`.
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
