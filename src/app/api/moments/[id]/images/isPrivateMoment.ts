import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

export async function isPrivateMoment(momentId: string | null) {
    const supabase = getSupabaseServiceClient();

    const { count, error } = await supabase
        .from('moment_tags')
        .select('tags(public_id)', { count: 'exact', head: true })
        .eq('moment_id', momentId)
        .not('tags.public_id', 'is', null); // public_id IS NOT NULL

    if (error) {
        return { error: 'selection failed: ' + error.message };
    }

    return count === 0;
}
