-- Create ad_placements table
create table if not exists public.ad_placements (
  id text primary key,
  name text not null,
  config jsonb not null, -- Stores dimensions, pricing models (daily/monthly/yearly), allowed_pages, etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on ad_placements
alter table public.ad_placements enable row level security;

-- Policies for ad_placements
create policy "Allow public read access to ad_placements"
  on public.ad_placements for select
  using (true);

create policy "Allow admin full access to ad_placements"
  on public.ad_placements for all
  using ( is_admin() );

-- Create advertisements table
create table if not exists public.advertisements (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.profiles(id), -- Matches profiles table pattern
  placement_id text references public.ad_placements(id) not null,
  custom_data jsonb, -- Stores flexible user data (title, headline, description, etc.)
  image_url text not null,
  redirect_url text, -- Renamed from target_link in original project
  category_id text, -- Nullable, for category specific targeting
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  status text not null check (status in ('pending_payment', 'active', 'expired', 'rejected', 'pending_approval')),
  payment_id uuid references public.payments(id), -- Linked to payments table
  views integer default 0,
  clicks integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on advertisements
alter table public.advertisements enable row level security;

-- Policies for advertisements
create policy "Allow public read access to active advertisements"
  on public.advertisements for select
  using (status = 'active');

create policy "Allow users to read own advertisements"
  on public.advertisements for select
  using ((auth.jwt() ->> 'sub') = user_id);

create policy "Allow users to insert own advertisements"
  on public.advertisements for insert
  with check ((auth.jwt() ->> 'sub') = user_id);

create policy "Allow users to update own advertisements"
  on public.advertisements for update
  using ((auth.jwt() ->> 'sub') = user_id);

create policy "Allow admin full access to advertisements"
  on public.advertisements for all
  using ( is_admin() );

-- Seed initial ad placements (Matches srilankabusiness.lk initial seed)
INSERT INTO public.ad_placements (id, name, config) VALUES
('home_main_slider', 'Slider Adds', '{"aspect_ratio": "16:5", "description": "Top main slider on Home Page", "max_slots": 6, "pricing": {"rate": 5000, "model": "daily"}}'),
('home_popular_brands', 'Popular Brands', '{"aspect_ratio": "4:3", "description": "Grid of brand logos/ads on Home Page", "max_slots": 8, "pricing": {"rate": 2000, "model": "daily"}}'),
('home_mid_banner_1', 'Section Adds (Large)', '{"aspect_ratio": "16:5", "description": "Wide banners in middle sections of Home Page", "max_slots": 1, "pricing": {"rate": 3500, "model": "daily"}}'),
('home_mid_banner_2', 'Section Adds (Small)', '{"aspect_ratio": "4:5", "description": "Vertical/Static banners in Home Page sections", "max_slots": 1, "pricing": {"rate": 2500, "model": "daily"}}'),
('search_result_banner', 'Search Result Adds', '{"aspect_ratio": "16:9", "description": "Ads interlaced within search result lists", "max_slots": 5, "pricing": {"rate": 3000, "model": "daily"}}'),
('search_result_top_slider', 'SearchResult Slider Adds', '{"aspect_ratio": "16:3", "description": "Wide slider at the top of Search Results page", "max_slots": 3, "pricing": {"rate": 4500, "model": "daily"}}'),
('details_sidebar_banner', 'Details Page Adds', '{"aspect_ratio": "3:4", "description": "Vertical ads on the Business Details sidebar", "max_slots": 1, "pricing": {"rate": 1500, "model": "daily"}}')
ON CONFLICT (id) DO NOTHING;
