'use client';

import { useRef, useState } from 'react';

import type { Map } from 'mapbox-gl';

import { MapView } from '@/components/map-view/MapView';
import { MomentView } from '@/components/moment-view/MomentView';
import { MapStatus } from '@/components/map-status/MapStatus';

import { useGetSharedMomentsQuery } from '@/hooks/useMomentsApi';
import type { PublicMoment } from '@/types/moment';

type Props = {
    publicId: string;
    withLines: boolean;
};

export default function ShareTagView({ publicId, withLines }: Props) {
    const mapRef = useRef<Map | null>(null);
    const [momentId, setMomentId] = useState<string>('');

    const openView = (momentId: string) => {
        setMomentId(momentId);
    };

    const closeView = () => {
        setMomentId('');
    };

    const { data: moments = [], isPending } = useGetSharedMomentsQuery(publicId);
    const moment = moments?.find((m) => m.id === momentId);
    const currMomentIdx = moments?.findIndex((m) => m.id === momentId);
    const hasPrev = currMomentIdx > 0;
    const hasNext = currMomentIdx < moments.length - 1;

    const goToMoment = (moment: PublicMoment) => {
        setMomentId(moment?.id);
        mapRef.current?.panTo(moment?.location.coordinates);
    };

    const onPrev = () => {
        const prevMoment = moments[currMomentIdx - 1];
        goToMoment(prevMoment);
    };

    const onNext = () => {
        const nextMoment = moments[currMomentIdx + 1];
        goToMoment(nextMoment);
    };

    return (
        <>
            <MapView
                moments={moments}
                momentId={momentId}
                onMarkerClick={openView}
                withLines={withLines}
                viewOnly
                outerMapRef={mapRef}
            />
            {moment ? (
                <MomentView
                    moment={moment}
                    onClose={closeView}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                    onPrev={onPrev}
                    onNext={onNext}
                />
            ) : (
                <MapStatus isPending={isPending} momentsCount={moments.length} />
            )}
        </>
    );
}
