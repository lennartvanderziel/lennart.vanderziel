# Shoulder to Shoulder — Platform Architecture

The custom group-coaching backend for lennartvanderziel.com. The frontend shell
(`/platform`) is live with demo auth; this document is the build plan for the real system.

## Recommended stack

| Layer | Choice | Why |
|---|---|---|
| Hosting / frontend | Vercel + Next.js (current) | Already deployed, zero-ops |
| Database + Auth | **Supabase** (Postgres) | Auth, DB, storage and row-level security in one free-tier service; no server to run |
| Payments | **Stripe** (Checkout + Customer Portal) | Subscriptions for STS membership, one-off invoices for 1:1 and masterminds |
| Email | **Resend** | Transactional (magic links, session reminders) + broadcast to cohorts |
| Video calls | Zoom links stored per session (later: Zoom API) | Circles already run on Zoom |
| Scheduling | Cal.com embed | 1:1 booking and Founder Fit Conversations |

## Data model (Postgres)

```
members        id, email, name, avatar_url, role (member|coach|admin),
               stripe_customer_id, joined_at, status (active|paused|churned)

tiers          id, name (STS Circle | 1:1 | Elite Mastermind), stripe_price_id, level

memberships    id, member_id → members, tier_id → tiers,
               started_at, ends_at, status

circles        id, name (Circle A…), tier_id, capacity, meeting_weekday, meeting_time

circle_members circle_id → circles, member_id → members

sessions       id, circle_id (nullable = all-member event), title, starts_at,
               zoom_url, recording_url, notes_md

attendance     session_id, member_id, attended (bool)

modules        id, n, title, description, sort_order

lessons        id, module_id → modules, title, video_url, content_md, sort_order

progress       member_id, lesson_id, completed_at

applications   id, name, email, business, revenue_band, source_page,
               status (new|reviewing|call_booked|accepted|rejected), created_at

waitlist       id, email, source_page, created_at
```

## Auth flow

1. Member logs in at `/platform` with **magic link** (Supabase Auth, passwordless —
   less friction, no password resets).
2. Supabase session cookie; Next.js middleware guards `/platform/dashboard/*`.
3. Roles: `member` sees dashboard; `coach`/`admin` see the CRM view
   (applications pipeline, attendance, member management).

## Payment flow

1. Application accepted → admin triggers Stripe Checkout link (subscription).
2. Stripe webhook (`/api/webhooks/stripe`) creates/updates `memberships`.
3. Failed payment / cancellation → status flips, dashboard access revoked by middleware.

## Build order

1. **Phase 1 — capture (do first, highest ROI)**: wire the waitlist + application
   forms to Supabase (or even a `/api/apply` route emailing via Resend), so no lead
   is lost. Forms currently store state client-side only.
2. **Phase 2 — auth**: Supabase magic-link login replacing the demo sessionStorage auth.
3. **Phase 3 — membership**: Stripe subscriptions + webhook + middleware gating.
4. **Phase 4 — content**: modules/lessons CMS (start with markdown in the repo,
   move to Supabase tables when volume grows).
5. **Phase 5 — CRM**: admin view of the applications pipeline (mirrors the
   "STS CRM" design), attendance tracking, cohort management.

## Environment variables (when backend lands)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server only
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
```
