-- One-off seed: run in Supabase SQL Editor AFTER the migration.
-- Replace PASTE_LONG_LIVED_TOKEN_HERE with your current INSTAGRAM_ACCESS_TOKEN
-- (the IGAA... value from .env.local / Vercel).
--
-- If you just generated a fresh 60-day token, expires_at = now() + 60 days is correct.
-- If the token is older, set expires_at to the real expiry date instead.

insert into public.instagram_tokens (access_token, expires_at, updated_at)
values (
  'PASTE_LONG_LIVED_TOKEN_HERE',
  now() + interval '60 days',
  now()
);
