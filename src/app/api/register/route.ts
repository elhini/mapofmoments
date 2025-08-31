import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSupabaseServiceClient } from '@/app/api/supabaseClient';
import crypto from 'crypto';

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

async function hashPassword(password: string): Promise<string> {
    // Use scrypt with random salt, store as: scrypt$N$r$p$salt$hash (or simple salt:hash)
    const salt = crypto.randomBytes(16);
    const N = 16384,
        r = 8,
        p = 1,
        keyLen = 64; // scrypt params
    return new Promise<string>((resolve, reject) => {
        crypto.scrypt(password, salt, keyLen, { N, r, p }, (err, derivedKey) => {
            if (err) return reject(err);
            const out = `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${Buffer.from(derivedKey).toString('base64')}`;
            resolve(out);
        });
    });
}

export async function POST(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { email, password, username } = (body ?? {}) as {
        email?: string;
        password?: string;
        username?: string;
    };

    if (!email || !password) {
        return NextResponse.json({ error: 'email and password are required' }, { status: 400 });
    }

    const userEmail = normalizeEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json(
            { error: 'Password must be at least 6 characters' },
            { status: 400 },
        );
    }

    // Use the existing shared Supabase service client (server-only)
    const supabase = getSupabaseServiceClient();

    // Hash password
    let password_hash: string;
    try {
        password_hash = await hashPassword(password);
    } catch (error) {
        console.error('Error hashing password', error);
        return NextResponse.json({ error: 'Failed to hash password' }, { status: 500 });
    }

    const name = username?.trim() || null;

    const { data, error } = await supabase
        .from('users')
        .insert({ email: userEmail, password_hash, name })
        .select('id,email,name,created_at')
        .single();

    if (error) {
        // Handle unique violation on email gracefully
        const msg = (error as { message?: string }).message || '';
        if (msg.toLowerCase().includes('duplicate') || msg.toLowerCase().includes('unique')) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to create user', details: msg }, { status: 500 });
    }

    return NextResponse.json({ user: data }, { status: 201 });
}
