import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

export const upsertTags = async (userId: string, id: string, tags?: string[]) => {
    const supabase = getSupabaseServiceClient();
    if (!tags) {
        return { tagsError: 'Missing field `tags`' };
    }

    const { error: insertionError } = await supabase
        .from('tags')
        .upsert(
            tags.map((name: string) => ({
                user_id: userId,
                name,
            })),
            { onConflict: 'user_id,name', ignoreDuplicates: true },
        )
        .select();

    if (insertionError) {
        return { tagsError: insertionError.message };
    }

    const { data: existingTags, error: existingTagsError } = await supabase
        .from('tags')
        .select('id,name')
        .eq('user_id', userId);

    if (existingTagsError) {
        return { tagsError: existingTagsError.message };
    }

    const { error: deletionError } = await supabase
        .from('moment_tags')
        .delete()
        .eq('moment_id', id);

    if (deletionError) {
        return { tagsError: deletionError.message };
    }

    const mapNameToId = existingTags.reduce(
        (acc, tag) => {
            acc[tag.name] = tag.id;
            return acc;
        },
        {} as Record<string, string>,
    );

    const { error: relationError } = await supabase
        .from('moment_tags')
        .insert(
            tags.map((tag) => ({
                moment_id: id,
                tag_id: mapNameToId[tag],
            })),
        )
        .select();

    if (relationError) {
        return { tagsError: relationError.message };
    }

    return { tags };
};
