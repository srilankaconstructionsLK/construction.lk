-- Migration to refactor ad status by repurposing the existing status column
-- 1. Drop old constraint if exists
alter table public.advertisements drop constraint if exists advertisements_status_check;

-- 2. Add payment_status column
alter table public.advertisements add column if not exists payment_status text default 'pending';

-- 3. Rename status to approval_status
alter table public.advertisements rename column status to approval_status;

-- 4. Add new constraints
alter table public.advertisements
add constraint advertisements_payment_status_check check (payment_status in ('pending', 'paid', 'failed')),
add constraint advertisements_approval_status_check check (approval_status in ('pending', 'approved', 'rejected'));

-- Update RLS policies to use the new column names
drop policy if exists "Allow public read access to active advertisements" on public.advertisements;
create policy "Allow public read access to active advertisements"
  on public.advertisements for select
  using (approval_status = 'approved' AND payment_status = 'paid');
