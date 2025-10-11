import { useEffect, useState } from 'react';
import type { Map, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import type { Moment } from '@/types/moment';

export const useDragging = (map?: Map, moment?: Moment) => {
    const [enabled, setEnabled] = useState(false);
    const [marker, setMarker] = useState<Marker>();

    useEffect(() => {
        if (enabled && map) {
            const coords = moment?.location.coordinates || [0, 0];
            const m = new mapboxgl.Marker({ draggable: true }).setLngLat(coords).addTo(map);
            setMarker(m);
        }
    }, [enabled, map]);

    const applyCoords = () => {
        const { lng = 0, lat = 0 } = marker?.getLngLat() || {};
        if (moment) moment.location = { coordinates: [lng, lat] };
        setTimeout(() => marker?.remove(), 2000);
    };
    const rollbackCoords = () => {
        marker?.remove();
        setEnabled(false);
    };

    return {
        draggingEnabled: enabled,
        enableDragging: () => setEnabled(true),
        disableDragging: () => setEnabled(false),
        applyCoords,
        rollbackCoords,
    };
};
