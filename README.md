# KIH Skateboarding

A single-page site for KIH Skateboarding — a personal skate brand and
instructor site for Khyree Ismael Hashim.

Plain HTML/CSS/JS. No frameworks, no build step.

## Files

- `index.html` — page markup
- `styles.css` — all styling (palette lives in CSS variables at the top)
- `script.js` — video lightbox, smooth-scroll nav, scroll-spy
- `kih-logo.png` — circular sticker logo
- `kih-mascot.png` — transparent mascot
- `me.jpg` — instructor photo (placeholder — swap in a real one any time)

## Before you ship

- Replace the `data-video` IDs in `index.html` (search `TODO_VIDEO_ID`) with
  real YouTube video IDs.
- Replace `YOUR_ID` in the booking form's `action` URL in `index.html` with
  your real [Formspree](https://formspree.io) form ID.
- Swap `me.jpg` for a real photo whenever you have one — same filename,
  same aspect ratio (4:5) works best.

## Run locally

Any static server works, e.g.:

```
npx serve .
```

## Deploy

Zero-config — import this repo on [vercel.com](https://vercel.com) and it
will deploy as a static site with no build step.
