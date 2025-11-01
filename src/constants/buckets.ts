import { supabaseUrl } from '@/utils/supabaseConfig';

export const momentImagesBucket = 'moment_images';

export const momentImagesBucketPath = `${supabaseUrl}/storage/v1/object/public/${momentImagesBucket}`;
