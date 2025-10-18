import type { Metadata } from 'next';

import { getSupabaseServiceClient } from '@/app/api/getSupabaseServiceClient';

import ShareTagView from './view';

type PageProps = {
    params: Promise<{ public_id: string }>;
    searchParams: Promise<{ lines: string }>;
};

const getTitle = (tag: string) =>
    `Пользователь сервиса MapOfMoments делится с вами своими воспоминаниями по тэгу "${tag}"`;
const description = 'Вы можете посмотреть их, а также создать свою карту моментов!';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const publicId = (await params).public_id;
    const supabase = getSupabaseServiceClient();
    const { data } = await supabase.from('tags').select('name').eq('public_id', publicId).single();
    const title = getTitle(data?.name);

    return { title, description, openGraph: { title, description } };
}

export default async function ShareTagPage({ params, searchParams }: PageProps) {
    const publicId = (await params).public_id;
    const withLines = (await searchParams).lines === '1';

    return <ShareTagView publicId={publicId} withLines={withLines} />;
}
