'use client';

import { useEffect, useRef } from 'react';

import type { Point } from 'geojson';
import type { GeoJSONSource, LngLat, Map, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import type { Moment, PublicMoment } from '@/types/moment';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import './map-view.css';

const accessToken =
    'pk.eyJ1IjoiZWxoaW5pIiwiYSI6ImNtZjgzamQ2bzB0a20yanM5cnY1ZXFibnIifQ.fN1U6AuZGZhSYIz3UkLxoQ';
const doubleClickDelay = 250;

declare module 'mapbox-gl' {
    export interface MapMouseEvent {
        pointClicked?: boolean;
    }
}

type Props = {
    moments: (Moment | PublicMoment)[];
    onMarkerClick: (momentId: string, marker: Marker) => void;
    onMarkerCreate?: (lngLat: LngLat, marker: Marker) => void;
    withGeocoder?: boolean;
    withLines?: boolean;
    viewOnly?: boolean;
};

export const MapView = ({
    moments,
    onMarkerClick,
    onMarkerCreate,
    withGeocoder,
    withLines,
    viewOnly,
}: Props) => {
    const mapRef = useRef<Map>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current || document.body,
            zoom: 2.3,
        });
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
        const map = mapRef.current;
        if (!map || !moments.length) return;

        const source = map.getSource('points-source');
        if (source) {
            map.removeLayer('points-layer');
            map.removeLayer('clusters-layer');
            map.removeLayer('counters-layer');
            map.removeSource('points-source');
        }
        map.addSource('points-source', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: moments.map((m) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: m.location.coordinates,
                    },
                    properties: { id: m.id },
                })),
            },
            cluster: !viewOnly,
        });
        // слой для одиночных точек
        map.addLayer({
            id: 'points-layer',
            type: 'circle',
            source: 'points-source',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#3FB1CE',
                'circle-radius': 7,
                'circle-stroke-color': '#389DB6',
                'circle-stroke-width': 2,
            },
        });
        // слой для кластеров
        map.addLayer({
            id: 'clusters-layer',
            type: 'circle',
            source: 'points-source',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': '#3FB1CE',
                'circle-radius': 10,
                'circle-stroke-color': '#389DB6',
                'circle-stroke-width': 2,
            },
        });
        // слой для счётчиков
        map.addLayer({
            id: 'counters-layer',
            type: 'symbol',
            source: 'points-source',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-size': 12,
            },
            paint: {
                'text-color': '#ffffff',
            },
        });

        map.on('mouseenter', 'points-layer', () => (map.getCanvas().style.cursor = 'pointer'));
        map.on('mouseleave', 'points-layer', () => (map.getCanvas().style.cursor = ''));

        map.on('mouseenter', 'clusters-layer', () => (map.getCanvas().style.cursor = 'pointer'));
        map.on('mouseleave', 'clusters-layer', () => (map.getCanvas().style.cursor = ''));

        map.on('click', 'points-layer', (e) => {
            e.pointClicked = true;
            const feature = e.features?.[0];
            const momentId = feature?.properties?.id;
            onMarkerClick(momentId, { setDraggable: (_: boolean) => {} } as Marker); // TODO: pass real marker
            const coords = (feature?.geometry as Point).coordinates as [number, number];
            map.panTo(coords);
        });

        map.on('click', 'clusters-layer', (e) => {
            e.pointClicked = true;
            const feature = e.features?.[0];
            const source = map.getSource('points-source') as GeoJSONSource;
            const clusterId = feature?.properties?.cluster_id;
            source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;
                const coords = (feature?.geometry as Point).coordinates as [number, number];
                map.flyTo({
                    center: coords,
                    zoom: Number(zoom) + 1,
                    duration: 1000, // 1s
                });
            });
        });

        if (onMarkerCreate) {
            let clickTimeout: number; // to keep zoom on dblclick
            map.on('click', (e) => {
                if (e.pointClicked) return;
                window.clearTimeout(clickTimeout);
                clickTimeout = window.setTimeout(() => {
                    const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
                    map.panTo(marker.getLngLat());
                    onMarkerCreate(e.lngLat, marker);
                }, doubleClickDelay);
            });
            map.on('dblclick', () => {
                window.clearTimeout(clickTimeout);
            });
        }

        const momentsCoords = moments.map((m) => m.location.coordinates);

        if (viewOnly) {
            const bounds = new mapboxgl.LngLatBounds();
            for (const coords of momentsCoords) {
                bounds.extend(coords);
            }
            map.fitBounds(bounds, {
                padding: 75,
                maxZoom: 15,
            });
        } else {
            map.panTo(momentsCoords[0]); // TODO: run only on first load
        }

        if (withLines) {
            const source = map.getSource('route-source');
            if (source) {
                map.removeLayer('route-layer');
                map.removeSource('route-source');
            }
            map.addSource('route-source', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: momentsCoords,
                    },
                    properties: {},
                },
            });
            map.addLayer({
                id: 'route-layer',
                type: 'line',
                source: 'route-source',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moments, viewOnly, withLines]);

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
