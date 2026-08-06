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
- `khyree.jpg`, `ismael.jpg`, `hashim.jpg` — instructor photos (Hashim's is real; Khyree's and Ismael's are placeholders — swap in real ones any time)

## Before you ship

- Replace `YOUR_ID` in the booking form's `action` URL in `index.html` with
  your real [Formspree](https://formspree.io) form ID.
- Swap `khyree.jpg` / `ismael.jpg` for real photos whenever you have them —
  same filenames, same aspect ratio (4:5) works best.
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
