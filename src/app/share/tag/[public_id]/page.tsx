import type { Metadata } from 'next';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';
import { baseMetadata } from '@/app/metadata';

import ShareTagView from './view';

type PageProps = {
    params: Promise<{ public_id: string }>;
    searchParams: Promise<{ lines: string }>;
};

const getTitle = (tag: string) =>
    `Посмотрите воспоминания с тэгом "${tag}" на карте событий Map of Moments`;
const description = 'А затем создайте свою карту памятных моментов и поделитесь ей с друзьями!';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const publicId = (await params).public_id;
    const supabase = getSupabaseServiceClient();
    const { data } = await supabase.from('tags').select('name').eq('public_id', publicId).single();
    const title = getTitle(data?.name);

    return {
        ...baseMetadata,
        title,
        description,
        openGraph: { ...baseMetadata.openGraph, title, description },
    };
}

export default async function ShareTagPage({ params, searchParams }: PageProps) {
    const publicId = (await params).public_id;
    const withLines = (await searchParams).lines === '1';

    return <ShareTagView publicId={publicId} withLines={withLines} />;
}
