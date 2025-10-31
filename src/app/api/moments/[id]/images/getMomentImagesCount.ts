import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

export async function getMomentImagesCount(userId: string, momentId: string) {
    const supabase = getSupabaseServiceClient();

    const { count, error } = await supabase
        .from('moment_images')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('moment_id', momentId);

    if (error) {
        return { error: 'selection failed: ' + error.message };
    }

    return { count };
}
