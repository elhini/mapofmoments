'use client';

import { useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';

import { MapView } from '@/components/map-view/MapView';
import { MomentView } from '@/components/moment-view/MomentView';
import { MapOverview } from '@/components/map-overview/MapOverview';
import { useGetSharedMomentsQuery } from '@/hooks/useMomentsApi';

export default function ShareTagPage() {
    const { public_id } = useParams<{ public_id: string }>();
    const searchParams = useSearchParams();
    const withLines = searchParams.get('lines') === '1';
    const [momentId, setMomentId] = useState<string>('');

    const openView = (momentId: string) => {
        setMomentId(momentId);
    };

    const closeView = () => {
        setMomentId('');
    };

    const { data: moments = [], isPending } = useGetSharedMomentsQuery(public_id);
    const moment = moments.find((m) => m.id === momentId);

    return (
        <>
            <MapView moments={moments} onMarkerClick={openView} withLines={withLines} viewOnly />
            {moment ? (
                <MomentView moment={moment} onClose={closeView} />
            ) : (
                <MapOverview isPending={isPending} momentsCount={moments.length} />
            )}
        </>
    );
}
