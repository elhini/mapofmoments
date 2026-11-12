-- Restore the geometry type and SRID constraints after relocating PostGIS.
alter table public.moments
  alter column location type extensions.geometry(Point, 4326)
  using location::extensions.geometry(Point, 4326);
