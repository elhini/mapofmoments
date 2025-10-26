create table public.moment_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  moment_id uuid references public.moments(id) on delete cascade,
  storage_path text not null,
  created_at timestamptz default now(),
);

create index on public.moment_images(moment_id);

alter table public.moment_images enable row level security; -- RLS

create policy "Users can insert their own images"
  on public.moment_images for insert
  using (auth.uid() = user_id);

create policy "Users can delete their own images"
  on public.moment_images for delete
  using (auth.uid() = user_id);