-- Run this in Supabase SQL editor
create extension if not exists "uuid-ossp";

create table public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  career_url text not null,
  created_at timestamptz default now()
);

create index on public.companies (lower(name) text_pattern_ops);