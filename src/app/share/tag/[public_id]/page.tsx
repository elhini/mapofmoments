import type { Metadata } from 'next';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

import ShareTagView from '@/app/share/tag/[public_id]/view';

type PageProps = {
    params: Promise<{ public_id: string }>;
    searchParams: Promise<{ lines: string }>;
};

const getTitle = (tag: string) => `Пользователь делится с вами своими моментами по тэгу "${tag}"`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const publicId = (await params).public_id;
    const supabase = getSupabaseServiceClient();
    const { data } = await supabase.from('tags').select('name').eq('public_id', publicId).single();

    return { title: getTitle(data?.name) };
}

export default async function ShareTagPage({ params, searchParams }: PageProps) {
    const publicId = (await params).public_id;
    const withLines = (await searchParams).lines === '1';

    return <ShareTagView publicId={publicId} withLines={withLines} />;
}
