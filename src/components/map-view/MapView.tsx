'use client';

import { useEffect, useRef } from 'react';

import type { LngLat, Map, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import type { Moment, PublicMoment } from '@/types/moment';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import './map-view.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';

type Props = {
    moments: (Moment | PublicMoment)[];
    onMarkerClick: (momentId: string, marker: Marker) => void;
    onMarkerCreate?: (lngLat: LngLat, marker: Marker) => void;
    withGeocoder?: boolean;
    withLines?: boolean;
};

export const MapView = ({
    moments,
    onMarkerClick,
    onMarkerCreate,
    withGeocoder,
    withLines,
}: Props) => {
    const mapRef = useRef<Map>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markerIdsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current || document.body,
            zoom: 2.3,
        });
        if (onMarkerCreate) {
            map.addInteraction('click-to-create', {
                type: 'click',
                handler: (e) => {
                    const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
                    map.panTo(marker.getLngLat());
                    onMarkerCreate(e.lngLat, marker);
                },
            });
        }
        if (withGeocoder) {
            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    // @ts-expect-error -- geocoder types are outdated
                    mapboxgl: mapboxgl,
                }),
            );
        }
        mapRef.current = map;

        return () => map.remove();
    }, [withGeocoder]);

    useEffect(() => {
        moments.forEach((moment, i) => {
            if (!mapRef.current) return;
            if (markerIdsRef.current.has(moment.id)) return; // skip if already rendered
            const coords = moment.location.coordinates;
            const marker = new mapboxgl.Marker().setLngLat(coords).addTo(mapRef.current);
            markerIdsRef.current.add(moment.id);
            marker.getElement().addEventListener('click', (e) => {
                e.stopPropagation(); // prevent map click event
                onMarkerClick(moment.id, marker);
                mapRef.current?.panTo(marker.getLngLat());
            });
            if (i === 0) {
                mapRef.current?.panTo(coords);
            }
        });

        if (withLines && moments.length) {
            const momentsSortedCoords = [...moments]
                .sort((m1, m2) => (m1.date || '').localeCompare(m2.date || ''))
                .map((m) => m.location.coordinates);
            mapRef.current?.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: momentsSortedCoords,
                    },
                    properties: {},
                },
            });
            mapRef.current?.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
            });
        }
    }, [moments]);

    return (
        <>
            <div
                id="map-container"
                className="h-screen w-full bg-[#04152b]"
                ref={mapContainerRef}
            />
        </>
    );
};
