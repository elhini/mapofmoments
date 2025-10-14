import { useEffect, useState } from 'react';
import type { Map, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import type { Moment } from '@/types/moment';

export const useDragging = (
    onDraggableIdChanged: (id: string) => void,
    map?: Map,
    moment?: Moment,
) => {
    const [enabled, setEnabled] = useState(false);
    const [marker, setMarker] = useState<Marker>();

    useEffect(() => {
        if (!map) return;
        const coords = moment?.location.coordinates || [0, 0];
        if (enabled) {
            const mrk = new mapboxgl.Marker({ draggable: true }).setLngLat(coords).addTo(map);
            mrk.on('dragend', () => map.panTo(mrk.getLngLat()));
            onDraggableIdChanged(moment?.id || '');
            setMarker(mrk);
        } else {
            map.panTo(coords);
            onDraggableIdChanged('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, moment?.id]);

    const applyCoords = () => {
        const { lng = 0, lat = 0 } = marker?.getLngLat() || {};
        if (moment) moment.location = { coordinates: [lng, lat] };
        setTimeout(() => marker?.remove(), 2000); // TODO: honestly wait for rerender
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
