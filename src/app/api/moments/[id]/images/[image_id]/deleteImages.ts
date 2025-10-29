import { momentImagesBucket } from '@/constants/buckets';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

export const deleteImages = async (momentId: string, userId: string) => {
    const supabase = getSupabaseServiceClient();

    const { data: images, error } = await supabase
        .from('moment_images')
        .select('storage_path')
        .eq('moment_id', momentId);
    // multiple

    if (error) {
        return { error: 'selection failed: ' + error.message };
    }

    const { error: deletionError } = await supabase
        .from('moment_images')
        .delete()
        .eq('moment_id', momentId)
        .eq('user_id', userId);

    if (deletionError) {
        return { error: 'deletion failed: ' + deletionError.message };
    }

    const { error: removalError } = await supabase.storage
        .from(momentImagesBucket)
        .remove(images?.map((image) => image?.storage_path));

    if (removalError) {
        return { error: 'removing failed: ' + removalError.message };
    }

    return { error: null };
};
