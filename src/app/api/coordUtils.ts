import type { Coordinates } from '@/types/coordinates';

export const buildLocationString = (location: { coordinates: Coordinates }) =>
    `SRID=4326;POINT(${location.coordinates[0]} ${location.coordinates[1]})`;
