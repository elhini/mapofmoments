import type { Coordinates } from '@/types/coordinates';
import type { PublicTag, Tag } from '@/types/tag';
import type { MomentImage } from '@/types/moment-image';

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
