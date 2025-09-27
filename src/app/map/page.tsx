'use client';

import { useRef, useEffect, useState } from 'react';

import type { LngLat, Map, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { Card } from '@heroui/card';

import type { Coordinates } from '@/types/coordinates';
import { MomentForm } from '@/components/moment-form/MomentForm';
import { useGetAllMomentsQuery } from '@/hooks/useMomentsApi';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import './page.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

export default function MapPage() {
    const mapRef = useRef<Map>(null);
    const markerRef = useRef<Marker>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markerIdsRef = useRef<Set<string>>(new Set());
    const [location, setLocation] = useState<LngLat>();
    const [momentId, setMomentId] = useState<string>('');

    const closeForm = () => {
        if (!momentId) markerRef.current?.remove();
        markerRef.current = null;
        setLocation(undefined);
        setMomentId('');
    };

    const { data: moments = [], isPending, refetch } = useGetAllMomentsQuery();
    const moment = moments.find((m) => m.id === momentId);
    const coordinates: Coordinates = [location?.lng || 0, location?.lat || 0];
    const newMoment = { id: '', title: '', tags: [], location: { coordinates } };

    const onSubmit = async () => {
        closeForm();
        await refetch();
    };
    const onDelete = async () => {
        markerIdsRef.current.delete(momentId);
        markerRef.current?.remove();
        closeForm();
        await refetch();
    };

    useEffect(() => {
        mapboxgl.accessToken = accessToken;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current || document.body,
            zoom: 2.3,
        });
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                // @ts-expect-error -- geocoder types are outdated
                mapboxgl: mapboxgl,
            }),
        );
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
            if (markerIdsRef.current.has(moment.id)) return;
            const coords = moment.location.coordinates || [0, 0];
            const marker = new mapboxgl.Marker().setLngLat(coords).addTo(mapRef.current);
            markerIdsRef.current.add(moment.id);
            marker.getElement().addEventListener('click', (e) => {
                e.stopPropagation();
                setLocation(undefined);
                setMomentId(moment.id);
                markerRef.current = marker;
                mapRef.current?.panTo(marker.getLngLat());
            });
            if (i === 0) {
                mapRef.current?.panTo(coords);
            }
        });
    }, [moments]);

    return (
        <>
            <div id="map-container" className="h-full bg-[#04152b]" ref={mapContainerRef} />
            {location || moment ? (
                <MomentForm
                    moment={moment || newMoment}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                    onClose={closeForm}
                    marker={markerRef.current}
                />
            ) : (
                <Card className="fixed bottom-[50px] left-[50%] z-1 w-[230px] translate-x-[-50%] p-3">
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
