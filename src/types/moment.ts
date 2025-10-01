import type { Coordinates } from '@/types/coordinates';
import type { PublicTag, Tag } from '@/types/tag';

export type Moment = {
    id: string;
    title: string;
    description?: string;
    date?: string;
    not_exact_date?: boolean;
    location: { coordinates: Coordinates };
    tags: Tag[];
};

export type PublicMoment = Omit<Moment, 'tags'> & {
    tags: PublicTag[];
};
