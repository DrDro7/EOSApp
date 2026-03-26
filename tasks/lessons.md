# Lessons Learned

## 2026-03-24 — EOS App Initial Build

- When PRD specifies conflicting tech (React Native + ShadCN), always clarify before building. ShadCN is web-only; the intent was Next.js.
- DataSource `id` in Prisma upsert: when doing a deterministic upsert (e.g., `stripe-${userId}`), explicitly set `id` in both `where` and `create` blocks.
- ShadCN components must be written manually when not running `npx shadcn-ui add` interactively; include full Radix UI primitives.
- Clerk middleware in Next.js 14 App Router uses `clerkMiddleware` + `createRouteMatcher`, not the old `authMiddleware`.
- Always strip sensitive fields (tokens, secrets) from API responses before returning to client.
