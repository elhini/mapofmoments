import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

export async function GET(req: NextRequest) {
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.redirect(new URL('/map', req.url));
}
