import { getSupabaseBrowserClient } from '@/app/api/supabaseClient';

export const getUsers = async () => {
    const { data, error } = await getSupabaseBrowserClient().from('users').select('*');

    if (error) {
        console.error('Error fetching users', error);
        return null;
    }

    return data;
};
