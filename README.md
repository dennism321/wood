# Soraghan Woodworking — Website

A production-ready, mobile-first marketing site for **Soraghan Woodworking** (Bristol & Barkhamsted, CT), built with Next.js (App Router), TypeScript, Tailwind CSS v4, PostgreSQL and Drizzle ORM.

The site was built from the content of `soraghanwoodworking.net` and the studio's Instagram presence. Brand logo and all project photography are included in `public/images/`.

---

## Public preview (GitHub Pages)

Every push to `main` publishes a static preview to **https://dennism321.github.io/wood/**
(see `.github/workflows/pages.yml`). Pages only serves plain files, so that build leaves out
the database, API and download page: the forms show a "call or email" message and gallery
likes stay on screen only. The full app (with PostgreSQL) runs as described below.

The TechAthos "PREVIEW" watermark is on every page while the client reviews the site.
Set `showPreviewWatermark` to `false` in `src/lib/site.ts` to remove it before launch.

---

## 1. Quick start

```bash
npm install
cp .env.example .env          # add your PostgreSQL connection string
npx drizzle-kit push          # create the tables
npm run dev                   # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

> The `.env` file from the live preview was intentionally **excluded** from this archive.
> Copy `.env.example` to `.env` and set `DATABASE_URL` (and optionally `NEXT_PUBLIC_SITE_URL`).

### Required environment variables

| Variable | Purpose | Example |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (required) | `postgresql://postgres:postgres@127.0.0.1:5432/app_db` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used in metadata, sitemap, robots | `https://www.soraghanwoodworking.net` |

---

## 2. Pages (all SEO + AEO optimised)

| Route | Type | Purpose |
| --- | --- | --- |
| `/` | static | Home: hero, credentials, services, featured work, values, process, materials board, FAQ, brief form, journal |
| `/services` | static | Service hub with a "what's included" comparison table |
| `/services/[slug]` | SSG × 6 | Custom kitchens · Cabinetry & millwork · Bars & libraries · Custom homes & additions · Bespoke furniture · Historic restoration |
| `/gallery` | dynamic | Interactive Instagram-style gallery (like / save / stories / lightbox / filters) |
| `/about` | static | Story, milestones, values, team, studios, logo |
| `/our-process` | static | Six-stage process with timelines and FAQ |
| `/service-area` | static | Litchfield Hills + Greater Hartford towns, states served, remote commissions |
| `/faq` | static | 12 FAQs, category filters, search, glossary |
| `/contact` | static | Project brief form, contact details, Google map, next steps |
| `/journal` | static | Article index |
| `/journal/[slug]` | SSG × 5 | Long-form guides (costs, timelines, materials, inset cabinetry, additions) |
| `/download` | dynamic | Download this source package (noindex, linked from the footer) |
| `sitemap.xml`, `robots.txt`, `not-found` | generated | Crawl + 404 handling |

### Structured data (JSON-LD)
`HomeAndConstructionBusiness` (global), `WebSite`, `Service` + `OfferCatalog`, `ItemList`, `FAQPage`, `QAPage`, `BreadcrumbList`, `ImageGallery`, `Article`, `AboutPage`, `ContactPage`.

### Metadata
Per-page titles/descriptions, canonical URLs, Open Graph + Twitter cards, keywords, `metadataBase`, viewport with `viewport-fit=cover`, dynamic `sitemap.ts` and `robots.ts`.

---

## 3. The interactive gallery

`src/components/gallery-board.tsx` (client component) + `src/app/api/gallery/*` (routes) + `src/lib/gallery-server.ts`.

Features:
- **Stories rail** — auto-advancing progress bars, tap zones, like and open-detail actions.
- **Grid** — mosaic layouts, category filters with counts, "most loved" sort, "liked only" filter.
- **Lightbox** — keyboard arrows/Escape, swipe gestures, prev/next, tags, project location, native share (clipboard fallback), conversion CTA.
- **Like & save persistence** — per-visitor anonymous ID in `localStorage`, stored in `gallery_reactions` with a unique index so counts stay honest. Re-hydrated through `GET /api/gallery?visitorId=…` on return visits.
- **Automatic seeding** — `gallerySeed` in `src/lib/site.ts` populates `gallery_posts` on first request. Edit that array (or the database) to change captions, tags and photos.
- **Resilient** — if the database is unavailable, the UI falls back to static content instead of crashing.

To connect a real Instagram feed later, replace `getGalleryItems()` in `src/lib/gallery-server.ts` with a Graph API sync (store `media_url`, `caption`, `permalink`, `timestamp`) and keep the same `GalleryItem` shape.

---

## 4. Database

`src/db/schema.ts`:

- `gallery_posts` — slug, title, caption, alt, image URL, category, tags, site, posted date, base likes, featured, sort order.
- `gallery_reactions` — post id, anonymous visitor id, kind (`like` | `save`); unique per post/visitor/kind.
- `inquiries` — project briefs: name, email, phone, town, project type, budget, timeline, message, source, status.
- `subscribers` — newsletter emails (unique).

Apply with `npx drizzle-kit push` (config in `drizzle.config.json`).

API routes:

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/health` | GET | DB connectivity healthcheck |
| `/api/inquiries` | POST | Validated project brief → `SW-YYYY-NNNN` reference |
| `/api/newsletter` | POST | Email capture, idempotent |
| `/api/gallery` | GET | Gallery items (+ this visitor's likes/saves) |
| `/api/gallery/[id]/react` | POST | Toggle a like or save |

Recommendation: forward new `inquiries` rows to email/CRM (Resend, Zapier) so leads are never only in the database.

---

## 5. Design system

- **Type**: Fraunces (display, optical serif) + Inter (UI) via `next/font`.
- **Palette**: cream `#f8f3ea`, parchment `#efe6d8`, ink `#16120e`, espresso `#221b14`, walnut `#4a3527`, brass `#c8a355`, brass-deep `#87651f`.
- **Tokens & components** in `src/app/globals.css` (`@theme` + `.btn`, `.shell`, `.card-hover`, `.reveal`, `.wood-grain`, `storyGrow` keyframes).
- **Mobile**: sticky Call / Email / Brief action bar, slide-out drawer, horizontal filter rails, `100dvh` sheets, safe-area padding, reduced-motion support, visible focus rings.
- **Accessibility**: skip link, labelled controls, `aria-pressed`/`aria-expanded`, keyboard-navigable lightbox and accordion, alt text on every image.

---

## 6. Images

`public/images/gallery/` (11 project photographs) and `public/images/brand/logo.png` (the studio's logo), plus `public/icon.svg` favicon. All are served through `next/image` with responsive `sizes`.

To swap in new photography, drop a file in `public/images/gallery/` and update the matching entry in `gallerySeed` (`src/lib/site.ts`).

---

## 7. Project structure

```
src/
  app/
    api/{gallery,inquiries,health,newsletter}/…
    about/ contact/ download/ faq/ gallery/ journal/ our-process/
    service-area/ services/ (page + [slug]) page.tsx layout.tsx globals.css
    sitemap.ts robots.ts not-found.tsx
  components/  (header, footer, gallery board, forms, FAQ, reveals, UI kit, icons)
  db/          (drizzle client + schema)
  lib/         (site content, journal content, gallery queries, SEO helpers)
public/        (images, brand logo, favicon, downloadable package)
```

---

## 8. Validation performed

`npx next typegen` · `tsc --noEmit` · `npm run build` · production start with `/api/health`, all pages returning 200, and the inquiry/newsletter/reaction endpoints exercised against PostgreSQL.

---

## 9. Content notes & next steps

- Addresses, phone, email, hours and service towns are pulled from the studio's published listings — confirm before launch.
- Costs and timelines in the journal and FAQ are realistic Connecticut ranges presented as guidance, not quotes.
- Testimonials were intentionally left out (no verified source); add real Houzz/Google reviews with review schema once confirmed.
- Recommended next: real Instagram Graph sync, email notifications for inquiries, per-town landing pages under `/service-area/`, and image AVIF delivery at higher traffic.
