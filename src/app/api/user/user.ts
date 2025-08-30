import { supabaseClient } from '@/app/api/supabaseClient';

export const getUsers = async () => {
    const { data, error } = await supabaseClient.from('users').select('*');

    if (error) {
        console.error('Error fetching users:', error);
        return null;
    }

    return data;
};
