-- ============================================================
-- KIH Skateboarding — Supabase schema
-- Paste this whole file into the Supabase SQL editor and run it once.
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS.
-- ============================================================

-- ---------------- profiles ----------------
-- One row per auth user. Created automatically by the trigger below —
-- you should never need to insert into this table by hand.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role text not null check (role in ('student', 'instructor')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are readable by any signed-in user" on public.profiles;
create policy "profiles are readable by any signed-in user"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "users can update their own profile" on public.profiles;
create policy "users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Profiles are readable by anyone signed in (names need to show up in
-- lesson rows, message threads, and student rosters on both sides).
-- They're only writable by the trigger below and by the owning user.

-- Auto-create a profile row whenever someone signs up. Reads full_name
-- and role out of the signup metadata (see signin.js — supabase.auth.signUp
-- is called with options.data = { full_name, role }).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------- lessons ----------------

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users (id) on delete cascade,
  instructor_id uuid not null references auth.users (id) on delete cascade,
  starts_at timestamptz not null,
  duration_min integer not null default 45,
  status text not null default 'scheduled'
    check (status in ('scheduled', 'completed', 'cancelled')),
  recurrence_rule text,
  created_at timestamptz not null default now()
);

create index if not exists lessons_student_idx on public.lessons (student_id, starts_at);
create index if not exists lessons_instructor_idx on public.lessons (instructor_id, starts_at);

alter table public.lessons enable row level security;

drop policy if exists "lessons visible to student or instructor" on public.lessons;
create policy "lessons visible to student or instructor"
  on public.lessons for select
  to authenticated
  using (auth.uid() = student_id or auth.uid() = instructor_id);

drop policy if exists "lessons insertable by student or instructor" on public.lessons;
create policy "lessons insertable by student or instructor"
  on public.lessons for insert
  to authenticated
  with check (auth.uid() = student_id or auth.uid() = instructor_id);

drop policy if exists "lessons updatable by student or instructor" on public.lessons;
create policy "lessons updatable by student or instructor"
  on public.lessons for update
  to authenticated
  using (auth.uid() = student_id or auth.uid() = instructor_id)
  with check (auth.uid() = student_id or auth.uid() = instructor_id);

-- ---------------- messages ----------------
-- thread_id convention: the two participant UUIDs, lexically sorted and
-- joined with "_" — e.g. thread_id = [studentId, instructorId].sort().join('_').
-- Computed client-side (see messages.js) so both sides always land on the
-- same thread without a separate "conversations" table.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id text not null,
  sender_id uuid not null references auth.users (id) on delete cascade,
  recipient_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_thread_idx on public.messages (thread_id, created_at);
create index if not exists messages_recipient_unread_idx
  on public.messages (recipient_id, read_at);

alter table public.messages enable row level security;

drop policy if exists "messages visible to sender or recipient" on public.messages;
create policy "messages visible to sender or recipient"
  on public.messages for select
  to authenticated
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

drop policy if exists "messages insertable as yourself" on public.messages;
create policy "messages insertable as yourself"
  on public.messages for insert
  to authenticated
  with check (auth.uid() = sender_id);

drop policy if exists "recipients can mark messages read" on public.messages;
create policy "recipients can mark messages read"
  on public.messages for update
  to authenticated
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- ---------------- subscriptions ----------------
-- Written by the /api serverless functions using the service role key
-- (bypasses RLS), never directly by the browser client. Students can only
-- read their own row; there is intentionally no client-side insert/update
-- policy, so a plain anon-key request can never alter billing state.

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null unique references auth.users (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'none',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

drop policy if exists "students read their own subscription" on public.subscriptions;
create policy "students read their own subscription"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = student_id);

-- ============================================================
-- Done. Next steps live in the PR description / README:
--   1. Add your Supabase URL + anon key to config.js
--   2. Add SUPABASE_SERVICE_ROLE_KEY + Stripe keys as Vercel env vars
--   3. Create your Stripe recurring Price and set STRIPE_PRICE_ID
-- ============================================================
