import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '../supabaseClient';

// api/me
export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { user: null, error: 'Missing or invalid Authorization header' },
            { status: 401 },
        );
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
        return NextResponse.json(
            { user: null, error: error?.message || 'Invalid or expired token' },
            { status: 401 },
        );
    }
    return NextResponse.json({ user: data.user, error: null });
}
