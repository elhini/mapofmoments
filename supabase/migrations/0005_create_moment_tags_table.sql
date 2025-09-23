create table moment_tags (
  moment_id uuid references moments(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (moment_id, tag_id)
);