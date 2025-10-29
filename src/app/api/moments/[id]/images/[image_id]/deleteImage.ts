import { momentImagesBucket } from '@/constants/buckets';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

export const deleteImage = async (imageId: string, userId: string) => {
    const supabase = getSupabaseServiceClient();

    const { data: image, error } = await supabase
        .from('moment_images')
        .select('storage_path')
        .eq('id', imageId)
        .single();

    if (error) {
        return { error: 'selection failed: ' + error.message };
    }

    const { error: deletionError } = await supabase
        .from('moment_images')
        .delete()
        .eq('id', imageId)
        .eq('user_id', userId);

    if (deletionError) {
        return { error: 'deletion failed: ' + deletionError.message };
    }

    const { error: removalError } = await supabase.storage
        .from(momentImagesBucket)
        .remove([image?.storage_path]);

    if (removalError) {
        return { error: 'removing failed: ' + removalError.message };
    }

    return { error: null };
};
