alter table if exists tags
add column public_id uuid unique default gen_random_uuid();

create index tags_public_id_idx on tags(public_id);