# Wedding Invitation

Single-page wedding invitation built with **React 19** and **Vite 8**, styled with **Tailwind CSS 4**. Production build is emitted to **`docs/`** for **GitHub Pages**.

**Live site:** [https://ozlemustafadavetiye.com](https://ozlemustafadavetiye.com)

**Repository:** [github.com/serhatsoysalx/wedding](https://github.com/serhatsoysalx/wedding)

## Features

- **Bilingual UI** — Turkish / English with client-side language persistence (`localStorage`).
- **Sections** — Hero with countdown, story, wedding info (date, venue, transport dialog), photo gallery with categories and lightbox, FAQ accordion, footer.
- **Venue** — Rüyapark Düğün Salonu (Bursa) with Google Maps link and full address in copy.
- **RSVP-style actions** — “Katılıyorum / Katılamıyorum” with non-blocking toast feedback (demo; no backend).
- **Guest photos** — CTA linking to a shared Google Drive folder for uploads.
- **Gallery** — Protected media presentation (blob loading, interaction limits) and decorative CSS animations scoped to the gallery.
- **Accessibility & UX** — Smooth scroll with navbar offset, scroll-spy active nav, responsive layout, `prefers-reduced-motion` respected in global CSS.

## Tech stack

| Layer    | Choice                          |
| -------- | ------------------------------- |
| UI       | React 19                        |
| Build    | Vite 8 (`@vitejs/plugin-react`) |
| Styling  | Tailwind CSS 4 (`@tailwindcss/vite`) |
| i18n     | Plain JSON messages in `src/i18n/` |

## Requirements

- **Node.js** 20+ (recommended; matches current LTS)
- **npm** (ships with Node)

## Getting started

```bash
git clone https://github.com/serhatsoysalx/wedding.git
cd wedding
npm install
npm run dev
```

Dev server runs at `http://localhost:5173/`.

## Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `npm run dev`  | Start Vite dev server with HMR                   |
| `npm run build`| Production build → `docs/` (for GitHub Pages)    |
| `npm run preview` | Local preview of the production build         |

## Deployment (GitHub Pages)

1. **Settings → Pages** — Build and deployment: **Deploy from a branch**. Branch **`master`** (or **`main`**), folder **`/docs`**.

2. **Custom domain** — `ozlemustafadavetiye.com` is configured via `public/CNAME`. The `base` in [`vite.config.js`](vite.config.js) is set to `"/"` because the site is served from the domain root.

3. After any change that affects the bundle, run **`npm run build`** and commit the updated **`docs/`** folder before pushing.

## Project layout

```
src/
  App.jsx              # Shell, global handlers
  components/          # Navbar, Hero, Story, WeddingInfo, Gallery*, FAQ, Footer, …
  data/                # Gallery categories / static data
  i18n/                # translations.js, language hook
  styles.css           # Tailwind + keyframes
public/                # Static assets (images, gallery placeholders)
docs/                  # Production build output (GitHub Pages)
```

## Configuration notes

- **Maps & venue** — Map URL and address strings in [`src/components/WeddingInfo.jsx`](src/components/WeddingInfo.jsx) and [`src/i18n/translations.js`](src/i18n/translations.js).
- **Guest upload link** — `GUEST_PHOTO_UPLOAD_URL` in [`src/components/Gallery.jsx`](src/components/Gallery.jsx).
- **Security** — Client-side measures only (no substitute for server-side auth). Suitable for a public static invite.

## License

Private / personal use for the wedding event. All rights reserved unless you choose to add an explicit license.

---

Built with care for Özlem & Mustafa.
