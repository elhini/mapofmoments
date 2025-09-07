'use client';

import { useRef, useEffect, useState } from 'react';
import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import { MomentForm } from '@/components/moment-form/MomentForm';
import { useCreateMomentMutation, useGetAllMomentsQuery } from '@/hooks/useMomentsApi';
import type { MomentFormData } from '@/types/moment';

import 'mapbox-gl/dist/mapbox-gl.css';
import './page.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

export default function MapPage() {
    const mapRef = useRef<Map>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [location, setLocation] = useState({ lng: 0, lat: 0 });

    const { data: moments = [], isPending, refetch } = useGetAllMomentsQuery();

    const { mutateAsync: create } = useCreateMomentMutation();
    const createMoment = async (formData: MomentFormData) => {
        await create({ ...formData, location });
        setLocation({ lng: 0, lat: 0 });
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
            new mapboxgl.Marker().setLngLat(coords).addTo(mapRef.current);
            if (i === 0) {
                mapRef.current?.panTo(coords);
            }
        });
    }, [moments]);

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
            {location.lng ? (
                <MomentForm mode="create" onSubmit={createMoment} />
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
