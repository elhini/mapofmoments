'use client';

import { useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import posthog from 'posthog-js';

import type { LngLat, Marker, Map } from 'mapbox-gl';

import type { Coordinates } from '@/types/coordinates';
import { MapView } from '@/components/map-view/MapView';
import { MomentForm } from '@/components/moment-form/MomentForm';
import { MapStatus } from '@/components/map-status/MapStatus';
import { useGetAllMomentsQuery } from '@/hooks/useMomentsApi';

const MAP_PAGE = '/map';

export default function MapPage() {
    const [map, setMap] = useState<Map>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const markerRef = useRef<Marker>(null);
    const [location, setLocation] = useState<LngLat>();
    const [momentId, setMomentId] = useState<string>(searchParams.get('momentId') || '');
    const [draggableMomentId, setDraggableMomentId] = useState<string>('');

    const openForm = (momentId: string) => {
        setLocation(undefined);
        setMomentId(momentId);
        router.push(`${MAP_PAGE}?momentId=${momentId}`);
        posthog.capture('momentFormOpened');
    };

    const openDraftForm = (lngLat: LngLat, marker: Marker) => {
        markerRef.current = marker;
        setLocation(lngLat);
        setMomentId('');
        posthog.capture('momentDraftFormOpened');
    };

    const closeForm = () => {
        if (!momentId) markerRef.current?.remove();
        markerRef.current = null;
        setLocation(undefined);
        setMomentId('');
        router.push(MAP_PAGE);
        posthog.capture('momentFormClosed');
    };

    const { data: moments = [], isPending, refetch } = useGetAllMomentsQuery();
    const moment = moments?.find((m) => m.id === momentId);
    const coordinates: Coordinates = [location?.lng || 0, location?.lat || 0];
    const newMoment = { id: '', title: '', tags: [], location: { coordinates } };

    const onSubmit = async () => {
        closeForm();
        await refetch();
    };

    const onDelete = async () => {
        markerRef.current?.remove();
        closeForm();
        await refetch();
    };

    return (
        <>
            <MapView
                moments={moments}
                draggableMomentId={draggableMomentId}
                onMarkerClick={openForm}
                onMarkerCreate={openDraftForm}
                onLoaded={setMap}
                withGeocoder
            />
            {location || moment ? (
                <MomentForm
                    moment={moment || newMoment}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                    onClose={closeForm}
                    onDraggableIdChanged={setDraggableMomentId}
                    map={map}
                />
            ) : (
                <MapStatus isPending={isPending} momentsCount={moments.length} />
            )}
        </>
    );
}
