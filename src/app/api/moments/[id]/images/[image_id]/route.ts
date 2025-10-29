import { type NextRequest, NextResponse } from 'next/server';

import { getCurrentUser } from '@/app/api/authUtils';
import { deleteImage } from '@/app/api/moments/[id]/images/[image_id]/deleteImage';

// Удаление существующего изображения
export async function DELETE(req: NextRequest, context: { params: Promise<{ image_id: string }> }) {
    const user = await getCurrentUser(req);
    const id = (await context.params).image_id;

    const { error } = await deleteImage(id, user.id);
    if (error) {
        return NextResponse.json({ error: 'Delete image error, ' + error }, { status: 500 });
    }

    return NextResponse.json({});
}
