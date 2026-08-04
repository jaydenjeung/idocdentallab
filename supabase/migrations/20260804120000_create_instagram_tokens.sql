-- Instagram long-lived user access tokens (auto-refreshed weekly via cron).
create table if not exists public.instagram_tokens (
  id uuid primary key default gen_random_uuid(),
  access_token text not null,
  expires_at timestamptz not null,
  updated_at timestamptz not null default now()
);

create index if not exists instagram_tokens_updated_at_idx
  on public.instagram_tokens (updated_at desc);

-- Lock down: only service role (bypasses RLS) should read/write tokens.
alter table public.instagram_tokens enable row level security;

-- No policies for anon/authenticated — deny all client access by default.
