import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseServiceRoleKey } from '@/utils/supabaseConfig';

if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

// Server-only client for privileged operations
export const getSupabaseServiceClient = () => {
    if (typeof window !== 'undefined') {
        throw new Error('getSupabaseServiceClient must not be used in the browser');
    }
    if (!supabaseServiceRoleKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }
    return createClient(supabaseUrl, supabaseServiceRoleKey, { auth: { persistSession: false } });
};
