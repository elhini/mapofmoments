import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

// Browser-only client for public operations
export const getSupabaseBrowserClient = () => {
    if (typeof window === 'undefined') {
        throw new Error('getSupabaseBrowserClient must not be used on the server');
    }
    if (!supabaseAnonKey) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

// Server-only client for privileged operations
export const getSupabaseServiceClient = () => {
    if (typeof window !== 'undefined') {
        throw new Error('getSupabaseServiceClient must not be used in the browser');
    }
    if (!serviceKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }
    return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}
