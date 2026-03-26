# Changelog

All notable changes to this project will be documented here.
Format: [Keep a Changelog](https://keepachangelog.com)
Versioning: [Semantic Versioning](https://semver.org)

---

## [Unreleased]

---

## [0.1.0] — 2026-03-24

### Added
- Full Next.js 14 (App Router) project scaffold with TypeScript
- Clerk authentication (sign-in, sign-up, middleware protection)
- PostgreSQL database schema via Prisma (User, Company, Dashboard, Widget, DataSource, Dataset, Metric, Integration)
- Dashboard system: create, rename, duplicate, delete dashboards with company assignment
- Widget system: KPI card, line chart, bar chart, pie chart, table — drag-and-drop via @dnd-kit
- Widget config modal: data source selection, time range, aggregation method
- Multi-company support: create and manage multiple companies per user
- Integration: Stripe (revenue, MRR, churn, daily time-series)
- Integration: Google Sheets (OAuth2, read sheet ranges, infer field schema)
- Integration: Google Analytics (GA4 Data API — sessions, users, traffic sources)
- Integration: CSV upload (S3 storage, field inference, dataset creation)
- Integration: Custom API connector (GET/POST, custom headers, JSONPath data extraction)
- 5-step onboarding wizard: welcome → company → integration → dashboard → done
- Knowledge base: 8 articles covering EOS fundamentals, KPI frameworks, integration guides
- Settings page: profile (Clerk-managed), company management, billing/plan display
- Responsive layout: collapsible sidebar (desktop), bottom tab bar (mobile)
- Dark theme default with ShadCN UI and Inter font
- TanStack Query for all client-side data fetching with 1-minute stale time
- All API routes: companies CRUD, dashboards CRUD + duplicate, widgets CRUD, integrations, data sources
- Required project files: README.md, CHANGELOG.md, .env.example, .gitignore, CLAUDE.md

[0.1.0]: https://github.com/your-org/eos-app/releases/tag/v0.1.0
