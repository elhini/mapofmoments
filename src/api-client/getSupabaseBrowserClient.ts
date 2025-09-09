import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '@/utils/supabaseConfig';

if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

// Browser-only client for public operations
export const getSupabaseBrowserClient = () => {
    if (!supabaseAnonKey) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    return createClient(supabaseUrl, supabaseAnonKey);
};
