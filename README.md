# AgriTradeXchange — Website (Version 1)

Farmer-first agricultural **procurement & trade network**. This is the
**Version 1 "Managed Procurement Platform"**: a public marketing site plus the
core intake flows (farmer registration, buyer registration, buyer requirement,
contact) persisted to a database. Dashboards, OTP auth and automated matching
are planned for V2 (see `docs/CONTEXT.md`).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- **Prisma 6** ORM — **SQLite** in dev (zero setup), Postgres-ready for prod
- **react-hook-form + Zod** for forms & validation (shared client/server schemas)
- **lucide-react** icons

## Getting started

```bash
npm install          # also runs `prisma generate`
npm run db:migrate   # creates the local SQLite db (first time only)
npm run dev          # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run db:migrate` | Create/apply a Prisma migration (dev) |
| `npm run db:studio` | Open Prisma Studio to inspect submitted data |
| `npm run db:reset` | Reset the dev database |

## What's included (V1)

- **Public site:** Home, For Farmers, For Buyers, Commodities, How It Works,
  About, Contact.
- **Intake forms** (validated, saved to DB, with reference numbers):
  - Farmer produce registration → `ATX-F-…`
  - Buyer account registration → `ATX-B-…`
  - Buyer requirement → `ATX-R-…`
  - Contact message
- **Login stubs** for farmer/buyer (dashboards come in V2).
- **API routes** under `src/app/api/*` re-validate every submission server-side.
- **Admin console** at `/admin` — Overview KPIs, Farmers & Supply, Buyers, Demand,
  **Matching Engine** (allocate verified supply to open requirements) and Messages,
  with inline status updates (server actions); remaining blueprint modules (Price,
  Procurement, Collection, Logistics, Finance, Reports) are scaffolded as V2
  placeholders.
- **Field-agent workspace** at `/agent` — mobile-first visit queue + on-site
  inspection form (sample no., grade, moisture, assessed quantity, farmer
  acknowledgement). Recording an inspection advances the lot to
  "Quality assessment completed" and shows its grade in the admin console.
  Agents record quality only — pricing stays an authorised admin step.
- **Motion**: tasteful entrance/hover/scroll animations, all gated behind
  `prefers-reduced-motion`.

## Admin access

The admin console is gated by **`middleware.ts`** (blocks before any render — no
data is streamed to unauthenticated clients) using a single passcode.

- Set `ADMIN_PASSWORD` in `.env` (dev default: `admin123`) for `/admin`, and
  `AGENT_PASSWORD` (dev default: `agent123`) for the separate `/agent` workspace.
  **Change both before any shared deployment.**
- Visit [`/admin`](http://localhost:3000/admin) or [`/agent`](http://localhost:3000/agent)
  → you'll be sent to the matching login. The two roles are isolated: an agent
  cookie cannot open `/admin`, and vice-versa.
- Sign-in sets an httpOnly session cookie. The cookie stores only a SHA-256 token
  of the passcode, never the passcode itself.

> These are lightweight single-passcode role gates for V1. Per-user accounts and
> finer-grained roles come with the V2 auth work.

## Switching to Postgres (production)

1. In `prisma/schema.prisma`, set `datasource db { provider = "postgresql" }`.
2. Set `DATABASE_URL` to your Postgres connection string.
3. `npx prisma migrate deploy`.

The schema avoids SQLite-only features, so it ports cleanly.

## Project context

Business model, phases, risks and the full V1→V4 roadmap live in
[`docs/CONTEXT.md`](docs/CONTEXT.md).

> Concept-stage: content is illustrative and not an offer to buy or sell.
> Procurement will operate only where permitted by applicable state law.
