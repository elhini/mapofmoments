import { getCurrentUser } from '@/app/api/authUtils';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const user = await getCurrentUser(req);

    const publicUser = { email: user.email, username: user.user_metadata?.username };

    return NextResponse.json(publicUser);
}
