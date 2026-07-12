-- With Love initial schema (Supabase / Postgres)
-- Apply when DATABASE_URL is configured.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  role text not null default 'organizer' check (role in ('organizer', 'admin')),
  plan text not null default 'free' check (plan in ('free', 'basic', 'premium', 'lux')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists weddings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  partner1 text not null default '',
  partner2 text not null default '',
  date timestamptz,
  venue text not null default '',
  venue_address text not null default '',
  guest_limit int not null default 30,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists weddings_one_active
  on weddings (user_id)
  where status <> 'archived';

create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references weddings(id) on delete cascade,
  slug text not null unique,
  title text not null default '',
  template_id text,
  config jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  published_at timestamptz,
  views int not null default 0,
  watermark boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references weddings(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  status text not null default 'pending'
    check (status in ('confirmed', 'declined', 'pending', 'maybe')),
  plus_ones int not null default 0,
  children int not null default 0,
  dietary text,
  message text,
  table_name text,
  side text check (side is null or side in ('groom', 'bride', 'both')),
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists wishes (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references invitations(id) on delete cascade,
  author_name text not null,
  text text not null,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  amount_cents int not null,
  currency text not null default 'rub',
  status text not null default 'pending'
    check (status in ('pending', 'succeeded', 'refunded', 'failed')),
  product_type text not null check (product_type in ('plan', 'template', 'addon')),
  product_id text not null,
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create table if not exists templates (
  id text primary key,
  name text not null,
  name_en text not null,
  style text not null,
  category text not null,
  premium boolean not null default false,
  price_cents int not null default 0,
  preview_url text not null,
  config_defaults jsonb not null default '{}'::jsonb,
  active boolean not null default true
);

-- Realtime (Supabase dashboard): enable replication for guests, wishes
