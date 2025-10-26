import type { Coordinates } from '@/types/coordinates';
import type { PublicTag, Tag } from '@/types/tag';

export type MomentImage = {
    id: string;
    storage_path: string;
    created_at: string;
};

export type Moment = {
    id: string;
    title: string;
    description?: string;
    date?: string;
    not_exact_date?: boolean;
    location: { coordinates: Coordinates };
    tags: Tag[];
    images?: MomentImage[];
};

export type PublicMoment = Omit<Moment, 'tags'> & {
    tags: PublicTag[];
};
