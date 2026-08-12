-- Shoulder to Shoulder — CRM schema
-- Run this once in Supabase → SQL Editor → New query → paste → Run.
--
-- One table holds every collection (leads, members, sessions, sequence) as
-- flexible JSON rows. This means new fields never need a migration, and the
-- app keeps full control of the shape. Row Level Security is ON with no
-- policies, so ONLY the server (service_role key) can read/write — never the
-- browser or the public anon key.

create table if not exists public.crm_records (
  collection  text        not null,
  id          text        not null,
  data        jsonb       not null,
  updated_at  timestamptz not null default now(),
  primary key (collection, id)
);

-- Fast lookups per collection.
create index if not exists crm_records_collection_idx
  on public.crm_records (collection);

-- Lock it down: enable RLS and add no policies. service_role bypasses RLS,
-- so the server still has full access while everyone else is denied.
alter table public.crm_records enable row level security;
