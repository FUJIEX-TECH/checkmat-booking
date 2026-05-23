# Checkmat Brentwood — Booking Landing Page

High-converting standalone booking page for Checkmat Brentwood (Brazilian Jiu-Jitsu, Brentwood CA). Handles leads from Meta Ads → Cal.com booking → webhook to AI backend.

**Live URL:** `https://checkmat.fujiex.com.br`  
**Stack:** Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · Cal.com · Meta Pixel + CAPI · Vercel

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in secrets
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `META_PIXEL_ID` | Your Meta Pixel ID (pre-filled: `989893566459320`) |
| `META_CAPI_ACCESS_TOKEN` | Meta Conversions API access token (from Meta Events Manager → Settings) |
| `CAL_WEBHOOK_SECRET` | Secret from Cal.com Dashboard → Webhooks → your webhook |
| `ROLLCALL_BACKEND_URL` | Rollcall AI backend URL (pre-filled) |
| `NEXT_PUBLIC_SITE_URL` | Production domain, no trailing slash |

> **Never commit `.env.local`.** The `.gitignore` already excludes it.

---

## Cal.com Setup

1. Create a free account at [cal.com](https://cal.com)
2. Create an **Event Type** named `Free Trial Class` (slug: `free-trial-class`)
3. Set duration to 60 minutes
4. Enable **Custom Questions** to capture metadata (phone, lead_id, utm_source, utm_campaign)
5. In **Settings → Redirects**, set the confirmation redirect to:
   ```
   https://checkmat.fujiex.com.br/confirmed?scheduled_at={startTime}&name={name}
   ```
6. In **Settings → Webhooks**, create a webhook:
   - URL: `https://checkmat.fujiex.com.br/api/webhook`
   - Events: `BOOKING_CREATED`, `BOOKING_RESCHEDULED`
   - Copy the **Signing Secret** → set as `CAL_WEBHOOK_SECRET` in env
7. In `config/site.ts`, set:
   ```ts
   cal: {
     username: "your-cal-username",
     eventSlug: "free-trial-class",
   }
   ```

---

## Lead Flow (URL Params)

When a Meta lead clicks "Book Yourself" from the thank-you screen, send them to:

```
https://checkmat.fujiex.com.br?name=John+Doe&email=john@example.com&phone=%2B19253380614&lead_id=abc123&utm_source=facebook&utm_campaign=bjj-trial-2024
```

The `CalEmbed` component reads these params and pre-fills the booking form automatically.

---

## Deploy to Vercel

### One-click
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

In the Vercel dashboard, go to **Settings → Environment Variables** and add all variables from `.env.local`.

Add your custom domain `checkmat.fujiex.com.br` under **Settings → Domains**.

---

## Placeholders to Fill In

Search the codebase for `[FILL_IN]` or check `config/site.ts`:

| Placeholder | Location | Description |
|---|---|---|
| `[FILL_IN]` (email) | `config/site.ts` → `business.email` | Academy contact email |
| `[CAL_USERNAME]` | `config/site.ts` → `cal.username` | Your Cal.com username |
| `[COACH_NAME_1]` | `config/site.ts` → `coaches[0].name` | Head instructor name |
| `[COACH_NAME_2]` | `config/site.ts` → `coaches[1].name` | Second instructor name |
| `[FILL_IN]` (coach bios) | `config/site.ts` → `coaches[].bio` | Short instructor bio |
| `[NAME_1]` through `[NAME_4]` | `config/site.ts` → `testimonials` | Student testimonial names |
| `[QUOTE]` | `config/site.ts` → `testimonials[].text` | Student quotes (from Google reviews) |
| `[FILL_IN]` (youtube) | `config/site.ts` → `business.socialLinks.youtube` | YouTube channel URL |
| Schedule times | `config/site.ts` → `schedule` | Verify against checkmatbrentwood.com |
| `primaryColor` | `config/site.ts` → `brand.primaryColor` | Verify exact Checkmat red hex |

### Images to Replace

All images go in `/public/images/`:

| File | Description | Recommended size |
|---|---|---|
| `hero-bg.jpg` | Hero section background (mat/training photo) | 1920×1080, optimized |
| `og-image.jpg` | OpenGraph/social share image | 1200×630 |
| `logo.svg` | Academy logo | SVG preferred |
| `coach-1.jpg` | Head coach headshot | 400×400, square |
| `coach-2.jpg` | Second coach headshot | 400×400, square |
| `testimonials/1.jpg` through `4.jpg` | Student profile photos | 160×160, square |

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, Meta Pixel, JSON-LD schema, fonts
│   ├── page.tsx            # Main landing page (assembles all sections)
│   ├── globals.css         # Tailwind + CSS variables
│   ├── confirmed/
│   │   └── page.tsx        # Post-booking confirmation page
│   └── api/
│       ├── capi/route.ts   # Server-side Meta Conversions API endpoint
│       └── webhook/route.ts # Cal.com webhook → rollcall backend forwarder
├── components/
│   ├── Hero.tsx            # Above-fold hero section
│   ├── TrustBadges.tsx     # Trust strip (Checkmat HQ, IBJJF, etc.)
│   ├── Benefits.tsx        # 3-column benefits grid
│   ├── WhatToExpect.tsx    # 4-step timeline
│   ├── Coaches.tsx         # Coach profile cards
│   ├── Schedule.tsx        # Class schedule with tabs + mobile accordion
│   ├── BookingSection.tsx  # Cal.com booking embed wrapper
│   ├── CalEmbed.tsx        # Cal.com embed with URL param pre-fill
│   ├── SocialProof.tsx     # Testimonial carousel
│   ├── Location.tsx        # Map + address + hours
│   ├── FAQ.tsx             # Accordion FAQ
│   ├── FinalCTA.tsx        # Final conversion banner
│   ├── Footer.tsx          # Site footer
│   ├── StickyMobileCTA.tsx # Fixed bottom CTA bar (mobile only)
│   └── PlaceholderImage.tsx # next/image wrapper with fallback
├── config/
│   └── site.ts             # ALL business data (single source of truth)
├── lib/
│   ├── meta-capi.ts        # Meta Conversions API helper
│   └── utils.ts            # Tailwind cn() utility
└── public/
    ├── robots.txt
    └── images/             # Replace with real photos
```

---

## Meta Pixel & CAPI Deduplication

- **Client-side:** `fbq('track', 'PageView')` fires on every page load (layout.tsx)
- **Client-side:** `fbq('track', 'Schedule')` fires on Cal.com booking success (CalEmbed.tsx)
- **Server-side:** `/api/capi` receives the same event with a matching `event_id` for deduplication
- **Server-side:** `/api/webhook` triggers CAPI when Cal.com webhook fires (backup)

Both events share the same `event_id` (UUID) so Meta deduplicates them automatically.

To get your CAPI access token:
1. Meta Events Manager → your Pixel → Settings
2. Scroll to "Conversions API" → "Generate Access Token"
3. Add to `META_CAPI_ACCESS_TOKEN` env var

---

## Performance Notes

- All images use `next/image` (lazy loading + automatic WebP)
- Fonts loaded via `next/font` with `display: swap`
- Cal.com embed only mounts client-side (won't block SSR)
- Google Maps iframe uses `loading="lazy"`
- Target: Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO
