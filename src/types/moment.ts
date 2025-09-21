import type { Coordinates } from '@/types/coordinates';

export type Moment = {
    id: string;
    title: string;
    description?: string;
    date?: string;
    not_exact_date?: boolean;
    location: { coordinates: Coordinates };
};
