'use client';

import { useRef, useEffect, useState } from 'react';
import type { LngLat, Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import { MomentForm } from '@/components/moment-form/MomentForm';
import {
    useCreateMomentMutation,
    useUpdateMomentMutation,
    useGetAllMomentsQuery,
} from '@/hooks/useMomentsApi';
import type { MomentFormData } from '@/types/moment';

import 'mapbox-gl/dist/mapbox-gl.css';
import './page.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

export default function MapPage() {
    const mapRef = useRef<Map>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [location, setLocation] = useState<LngLat>();
    const [momentId, setMomentId] = useState<string>('');

    const { data: moments = [], isPending, refetch } = useGetAllMomentsQuery();
    const moment = moments.find((m) => m.id === momentId);
    const locationForForm = moment
        ? { lng: moment.location.coordinates[0], lat: moment.location.coordinates[1] }
        : undefined;
    const momentForForm = { ...moment, title: moment?.title || '', location: locationForForm };

    const { mutateAsync: create } = useCreateMomentMutation();
    const { mutateAsync: update } = useUpdateMomentMutation(momentId);
    const submitMoment = async (formData: MomentFormData) => {
        const submit = momentId ? update : create;
        await submit({ ...formData, location: formData ? formData.location : location });
        setLocation(undefined);
        await refetch();
    };

    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({ container: mapContainerRef.current || document.body });
        map.addInteraction('click-to-create', {
            type: 'click',
            handler: (e) => {
                setLocation(e.lngLat);
                new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
            },
        });
        mapRef.current = map;

        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        moments.forEach((moment, i) => {
            if (!mapRef.current) return;
            const coords = moment.location.coordinates || [0, 0];
            const marker = new mapboxgl.Marker().setLngLat(coords).addTo(mapRef.current);
            marker.getElement().addEventListener('click', (e) => {
                e.stopPropagation();
                setMomentId(moment.id);
            });
            if (i === 0) {
                mapRef.current?.panTo(coords);
            }
        });
    }, [moments]);

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
            {location || moment ? (
                <MomentForm data={momentForForm} onSubmit={submitMoment} />
            ) : (
                <div
                    id="call-to-action"
                    className="flex flex-col items-center gap-4 rounded-xl p-4"
                >
                    Моментов в базе: {isPending ? '...' : moments.length}
                    <br />
                    Чтобы добавить ещё один, выберите точку на карте
                </div>
            )}
        </>
    );
}
