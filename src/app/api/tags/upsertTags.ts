import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import type { Tag } from '@/types/tag';

export const upsertTags = async (userId: string, id?: string, tags?: Tag[]) => {
    const supabase = getSupabaseServiceClient();

    if (!tags) {
        return { error: 'missing field: `tags`' };
    }

    const oldTags = tags.filter((tag) => tag.id);
    const newTags = tags.filter((tag) => !tag.id);

    const { data: createdTags, error: insertionError } = await supabase
        .from('tags')
        .insert(
            newTags.map((tag) => ({
                user_id: userId,
                name: tag.name,
            })),
        )
        .select();

    if (insertionError) {
        return { error: 'insertion failed: ' + insertionError.message };
    }

    const { error: deletionError } = await supabase
        .from('moment_tags')
        .delete()
        .eq('moment_id', id);

    if (deletionError) {
        return { error: 'deletion failed: ' + deletionError.message };
    }

    const allTags = [...oldTags, ...createdTags];

    const { error: relationError } = await supabase
        .from('moment_tags')
        .insert(
            allTags.map((tag) => ({
                moment_id: id,
                tag_id: tag.id,
            })),
        )
        .select();

    if (relationError) {
        return { error: 'relation failed: ' + relationError.message };
    }

    return { tags: allTags };
};
