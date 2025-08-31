import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '../supabaseClient';

export async function POST(req: NextRequest) {
    const { email, password, username } = await req.json();
    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: username,
            },
        },
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.redirect(new URL('/', req.url));
}
