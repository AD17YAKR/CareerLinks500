-- Enhanced database schema for CareerLinks500
-- Run this in Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Companies table
create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  career_url text not null,
  website_url text,
  industry text,
  headquarters text,
  employee_count text,
  description text,
  logo_url text,
  is_fortune_500 boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for better performance
create index if not exists idx_companies_name_lower on public.companies (lower(name) text_pattern_ops);
create index if not exists idx_companies_industry on public.companies (industry);
create index if not exists idx_companies_created_at on public.companies (created_at desc);

-- RLS policies (optional - for security)
alter table public.companies enable row level security;

-- Allow public read access
create policy "Allow public read access" on public.companies
  for select using (true);

-- Allow public insert (you can restrict this later)
create policy "Allow public insert" on public.companies
  for insert with check (true);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_companies_updated_at
  before update on public.companies
  for each row execute function update_updated_at_column();

-- Sample data (optional)
insert into public.companies (name, career_url, industry, headquarters) values
  ('Apple Inc.', 'https://jobs.apple.com/', 'Technology', 'Cupertino, CA'),
  ('Microsoft Corporation', 'https://careers.microsoft.com/', 'Technology', 'Redmond, WA'),
  ('Amazon.com Inc.', 'https://www.amazon.jobs/', 'E-commerce/Cloud', 'Seattle, WA'),
  ('Alphabet Inc.', 'https://careers.google.com/', 'Technology', 'Mountain View, CA'),
  ('Meta Platforms Inc.', 'https://www.metacareers.com/', 'Social Media', 'Menlo Park, CA')
on conflict (name) do nothing;