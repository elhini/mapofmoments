'use client';

import { useRef, useEffect } from 'react';
import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import { Button } from '@/components/button/Button';
import { useCreateMomentMutation, useGetAllMomentsQuery } from '@/hooks/useMomentsApi';

import 'mapbox-gl/dist/mapbox-gl.css';
import './page.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

export default function MapPage() {
    const mapRef = useRef<Map>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { data: moments = [] } = useGetAllMomentsQuery();

    const { mutate } = useCreateMomentMutation();
    const createMoment = () => {
        mutate({
            title: 'My point #' + (moments.length + 1),
            description: 'Awesome moment!',
            location: { lng: Math.random() * 360 - 180, lat: Math.random() * 180 - 90 },
        });
    };

    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current || document.body,
        });

        return () => mapRef.current?.remove();
    }, []);

    useEffect(() => {
        const lastMoment = moments.at(-1);
        if (!mapRef.current || !lastMoment) return;
        const coords = lastMoment.location.coordinates || [0, 0];
        new mapboxgl.Marker().setLngLat(coords).addTo(mapRef.current);
        mapRef.current.panTo(coords);
    }, [moments]);

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
            <div id="call-to-action" className="flex flex-col items-center gap-4 rounded-xl p-4">
                Моментов в базе: {moments.length}
                <div className="flex items-center">
                    <Button variant="primary" onClick={createMoment}>
                        Добавить момент
                    </Button>
                </div>
            </div>
        </>
    );
}
