'use client';

import { useState } from 'react';

import { MapView } from '@/components/map-view/MapView';
import { MomentView } from '@/components/moment-view/MomentView';
import { MapStatus } from '@/components/map-status/MapStatus';

import { useGetSharedMomentsQuery } from '@/hooks/useMomentsApi';

type Props = {
    publicId: string;
    withLines: boolean;
};

export default function ShareTagView({ publicId, withLines }: Props) {
    const [momentId, setMomentId] = useState<string>('');

    const openView = (momentId: string) => {
        setMomentId(momentId);
    };

    const closeView = () => {
        setMomentId('');
    };

    const { data: moments = [], isPending } = useGetSharedMomentsQuery(publicId);
    const moment = moments?.find((m) => m.id === momentId);

    return (
        <>
            <MapView moments={moments} onMarkerClick={openView} withLines={withLines} viewOnly />
            {moment ? (
                <MomentView moment={moment} onClose={closeView} />
            ) : (
                <MapStatus isPending={isPending} momentsCount={moments.length} />
            )}
        </>
    );
}
