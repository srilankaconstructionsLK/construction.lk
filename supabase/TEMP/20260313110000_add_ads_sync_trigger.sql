-- Migration: Add Advertisements Sync Trigger
create extension if not exists "pg_net" with schema "extensions";

-- Create function to notify the sync API
create or replace function public.notify_ad_sync()
returns trigger
language plpgsql
security definer
as $$
declare
  payload jsonb;
  target_placement text;
  target_category text;
  api_url text;
  api_token text;
begin
  -- Get configuration from system_settings
  api_url := coalesce((select value->>'url' from public.system_settings where key = 'AD_SYNC_CONFIG'), 'https://construction.lk/api/ads/sync');
  api_token := coalesce((select value->>'token' from public.system_settings where key = 'AD_SYNC_CONFIG'), 'default_token');

  if (TG_OP = 'DELETE') then
    target_placement := old.placement_id;
    target_category := old.category_id;
  else
    target_placement := new.placement_id;
    target_category := new.category_id;
  end if;

  -- Construct payload
  payload := jsonb_build_object(
    'placement_id', target_placement,
    'category_id', target_category
  );

  -- Perform asynchronous HTTP POST
  perform net.http_post(
    url => api_url,
    headers => jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || api_token
    ),
    body => payload
  );

  return null;
end;
$$;

-- Create triggers
drop trigger if exists on_ad_change_sync on public.advertisements;
create trigger on_ad_change_sync
after insert or update or delete
on public.advertisements
for each row
execute function public.notify_ad_sync();

-- Add placeholders to system_settings
INSERT INTO public.system_settings (key, value)
VALUES ('AD_SYNC_CONFIG', '{"url": "https://construction.lk/api/ads/sync", "token": "default_token"}')
ON CONFLICT (key) DO NOTHING;
