import { supabaseUrl } from '@/utils/supabaseConfig';
import { momentImagesBucket } from '@/constants/buckets';

export const getMomentImageUrl = (path: string) => {
    return `${supabaseUrl}/storage/v1/object/public/${momentImagesBucket}/${encodeURIComponent(path)}`;
};
