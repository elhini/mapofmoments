create table moments (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     user_id uuid not null,
     title text not null,
     description text,
     location geometry(Point, 4326) not null
);