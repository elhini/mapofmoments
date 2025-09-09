'use client';

import { useRef, useEffect, useState } from 'react';
import type { LngLat, Map, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { Card } from '@heroui/card';

import { MomentForm } from '@/components/moment-form/MomentForm';
import {
    useCreateMomentMutation,
    useUpdateMomentMutation,
    useGetAllMomentsQuery,
} from '@/hooks/useMomentsApi';
import { buildMomentForForm } from '@/utils/buildMomentForForm';
import type { MomentFormData } from '@/types/moment';

import 'mapbox-gl/dist/mapbox-gl.css';
import './page.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

export default function MapPage() {
    const mapRef = useRef<Map>(null);
    const markerRef = useRef<Marker>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [location, setLocation] = useState<LngLat>();
    const [momentId, setMomentId] = useState<string>('');
    const closeForm = () => {
        setLocation(undefined);
        setMomentId('');
    };

    const { data: moments = [], isPending, refetch } = useGetAllMomentsQuery();
    const moment = moments.find((m) => m.id === momentId);
    const momentForForm = moment ? buildMomentForForm(moment) : undefined;

    const { mutateAsync: create, isPending: isCreating } = useCreateMomentMutation();
    const { mutateAsync: update, isPending: isUpdating } = useUpdateMomentMutation(momentId);
    const submitMoment = async (formData: MomentFormData) => {
        const submit = momentId ? update : create;
        await submit({ ...formData, location: momentId ? formData.location : location });
        setLocation(undefined);
        await refetch();
    };
    const isSubmitting = isCreating || isUpdating;

    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current || document.body,
            zoom: 2.3,
        });
        map.addInteraction('click-to-create', {
            type: 'click',
            handler: (e) => {
                markerRef.current?.remove();
                setLocation(e.lngLat);
                setMomentId('');
                const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
                mapRef.current?.panTo(marker.getLngLat());
                markerRef.current = marker;
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
                setLocation(undefined);
                setMomentId(moment.id);
                mapRef.current?.panTo(marker.getLngLat());
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
                <MomentForm
                    data={momentForForm}
                    onSubmit={submitMoment}
                    onClose={closeForm}
                    isLoading={isSubmitting}
                />
            ) : (
                <Card id="call-to-action" className="p-3">
                    {isPending ? 'Загрузка моментов... ' : 'Сохранено моментов: ' + moments.length}
                    <br />
                    Чтобы добавить ещё один,
                    <br />
                    выберите точку на карте
                </Card>
            )}
        </>
    );
}
