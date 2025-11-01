import { momentImagesBucketPath } from '@/constants/buckets';

export const getMomentImageUrl = (path: string) => {
    return `${momentImagesBucketPath}/${encodeURIComponent(path)}`;
};
