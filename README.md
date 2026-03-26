# EOS — Entrepreneur Operating System

> Centralized KPI dashboard and operating system for entrepreneurs and teams.

## Overview

EOS is a web application that lets entrepreneurs and teams connect external data sources, build customizable dashboards, and monitor KPIs in real time. Built with Next.js 14, ShadCN UI, Clerk authentication, and NeonDB.

## Prerequisites

- Node.js v18+
- npm or pnpm
- A [Clerk](https://clerk.com) account (for auth)
- A [NeonDB](https://neon.tech) PostgreSQL database
- Optional: Stripe account, Google Cloud project, AWS S3 bucket

## Installation

```bash
git clone https://github.com/your-org/eos-app.git
cd eos-app
npm install
cp .env.example .env.local  # Fill in your values
npm run db:generate          # Generate Prisma client
npm run db:push              # Push schema to NeonDB
npm run dev                  # Start development server
```

## Usage

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run db:studio    # Open Prisma database browser
npm run db:migrate   # Run database migrations
```

## Project Structure

```
app/
├── (auth)/             ← Sign-in / Sign-up pages (Clerk)
├── (app)/              ← Authenticated app pages
│   ├── dashboard/      ← Dashboard list + individual views
│   ├── integrations/   ← Data source connection UI
│   ├── knowledge/      ← EOS knowledge base
│   ├── settings/       ← Profile, companies, billing
│   └── onboarding/     ← First-time setup wizard
├── api/                ← REST API routes
│   ├── companies/
│   ├── dashboards/
│   ├── widgets/
│   ├── integrations/
│   ├── data-sources/
│   └── users/
components/
├── ui/                 ← ShadCN UI primitives
├── layout/             ← Sidebar, header, mobile nav
├── dashboard/          ← Dashboard cards, grid
├── widgets/            ← KPI card, charts, table
├── integrations/       ← Per-integration connection UIs
└── onboarding/         ← Onboarding wizard
lib/
├── db.ts               ← Prisma client
├── auth.ts             ← Clerk helpers
├── utils.ts            ← Shared utilities
└── integrations/       ← Stripe, Google, CSV, Custom API services
prisma/
└── schema.prisma       ← Database schema
hooks/                  ← TanStack Query hooks
types/
└── index.ts            ← TypeScript type definitions
```

## Configuration

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `DATABASE_URL` | NeonDB PostgreSQL connection string | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key (for integration) | No |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `AWS_ACCESS_KEY_ID` | AWS access key (for CSV uploads) | No |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | No |
| `AWS_S3_BUCKET` | S3 bucket name for CSV storage | No |

## Integrations (Phase 1)

| Integration | Data | Auth |
|---|---|---|
| Stripe | Revenue, MRR, ARR, churn | API key |
| Google Sheets | Custom KPIs from spreadsheets | OAuth2 |
| Google Analytics | Sessions, users, traffic sources | OAuth2 (shared with Sheets) |
| CSV Upload | Any tabular data | File upload |
| Custom API | Any JSON REST endpoint | API key / headers |

## Contributing

1. Branch from `dev`: `git checkout -b feature/your-feature`
2. Commit using conventional commits format
3. Push and open PR against `dev`

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## License

Proprietary
