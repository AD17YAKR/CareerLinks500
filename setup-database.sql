-- Run this in Supabase SQL editor to create the companies table
create extension if not exists "uuid-ossp";

create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  career_url text not null,
  industry text,
  headquarters text,
  created_at timestamptz default now()
);

create index if not exists idx_companies_name_lower on public.companies (lower(name) text_pattern_ops);

-- Enable RLS
alter table public.companies enable row level security;

-- Allow public read access
create policy "Allow public read access" on public.companies
  for select using (true);

-- Allow public insert
create policy "Allow public insert" on public.companies
  for insert with check (true);

-- Sample data
insert into public.companies (name, career_url, industry, headquarters) values
  ('Apple Inc.', 'https://jobs.apple.com/', 'Technology', 'Cupertino, CA'),
  ('Microsoft Corporation', 'https://careers.microsoft.com/', 'Technology', 'Redmond, WA'),
  ('Amazon.com Inc.', 'https://www.amazon.jobs/', 'E-commerce/Cloud', 'Seattle, WA'),
  ('Alphabet Inc.', 'https://careers.google.com/', 'Technology', 'Mountain View, CA'),
  ('Meta Platforms Inc.', 'https://www.metacareers.com/', 'Social Media', 'Menlo Park, CA')
on conflict (name) do nothing;