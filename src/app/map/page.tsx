'use client';

import { Button } from '@/components/button/Button';
import { useRef, useEffect } from 'react';

import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './page.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

export default function MapPage() {
    const mapRef = useRef<Map>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current || document.body,
        });

        return () => mapRef.current?.remove();
    }, []);

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
            <div id="call-to-action" className="flex flex-col items-center gap-4 rounded-xl p-4">
                Вдохновляющий текст
                <div className="flex items-center">
                    <Button variant="primary">Добавить момент</Button>
                </div>
            </div>
        </>
    );
}
