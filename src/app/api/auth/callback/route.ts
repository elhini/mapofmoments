import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { handleAuthorizedRequest } from '@/app/api/authUtils';

export async function GET(req: NextRequest) {
    const accessToken = req.nextUrl.searchParams.get('accessToken');

    if (!accessToken) {
        // Strange case, but we should handle it
        return NextResponse.json({ error: 'No access token returned' }, { status: 500 });
    }
    return handleAuthorizedRequest(accessToken, req.url);
}
