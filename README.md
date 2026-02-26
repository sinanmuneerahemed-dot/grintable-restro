# Grin Table Restaurant (Static + Firebase Hosting Ready)

Premium, mobile-first restaurant website with a dark/warm visual style, glass UI accents, and WhatsApp-first actions for reservations and ordering.  
Built as a static multi-page Vite site (no backend required).

## Features

- Home, Menu, Gallery, Reservations, Contact pages
- Clean URLs:
  - `/`
  - `/menu`
  - `/gallery`
  - `/reservations`
  - `/contact`
- Sticky mobile action bar: Call / WhatsApp / Directions
- Menu data driven from `public/data/menu.json`
- Gallery data driven from `public/data/gallery.json`
- WhatsApp-prefilled messages:
  - Menu item order
  - Reservation form submission
- Responsive gallery with filters and lightbox
- SEO basics included:
  - Meta title/description/OG tags
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/favicon.svg`

## Project Structure

```text
.
├─ assets/
│  ├─ css/styles.css
│  └─ js/
│     ├─ config.js
│     ├─ site.js
│     ├─ menu.js
│     ├─ gallery.js
│     └─ reservations.js
├─ public/
│  ├─ data/
│  │  ├─ menu.json
│  │  └─ gallery.json
│  ├─ gallery/             # Placeholder images (replace with optimized real photos)
│  ├─ menu.pdf             # Placeholder (replace before launch)
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ sitemap.xml
├─ index.html
├─ menu/index.html
├─ gallery/index.html
├─ reservations/index.html
├─ contact/index.html
├─ firebase.json
├─ package.json
└─ vite.config.js
```

## Placeholder Values To Replace Before Launch

Update these in `assets/js/config.js`:

- `phoneDisplay`
- `phoneRaw`
- `whatsappRaw`
- `address`
- `openingHours`
- `directionsUrl`
- `instagramUrl`
- `reviewsUrl`
- `mapEmbedUrl`

Also replace:

- `public/menu.pdf`
- Images inside `public/gallery/`
- OG URLs in each page `<head>` (`grintable.example.com` placeholder)
- Optional contact email in `contact/index.html`

## Local Development

```bash
npm install
npm run dev
```

## Build + Firebase Deploy

1. `npm install`
2. `npm run build`
3. `firebase init hosting` (set public directory to `dist`)
4. `firebase deploy --only hosting`

The site output is fully static in `dist/`.

## Notes

- No `.env` file is required for this project.
- Keep images compressed (WebP/AVIF preferred for production) for better Lighthouse performance.
