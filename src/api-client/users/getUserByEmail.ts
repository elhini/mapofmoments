import { getSupabaseBrowserClient } from '@/api-client/getSupabaseBrowserClient';

// will be used to check users before inviting them
export const getUserByEmail = async (email: string) => {
    const { data, error } = await getSupabaseBrowserClient()
        .from('users')
        .select('email')
        .filter('email', 'eq', email);

    if (error) {
        console.error('Error fetching user', error);
        return null;
    }

    return data;
};
