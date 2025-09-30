alter table if exists tags
add column public_id uuid unique default null;

create index tags_public_id_idx on tags(public_id);