import { useEffect, useState } from 'react';
import type { Marker } from 'mapbox-gl';

import type { Moment } from '@/api-client/moments/momentsApi';

export const useDragging = (marker: Marker | null, moment?: Moment) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        marker?.setDraggable(enabled);
    }, [enabled, marker]);

    const applyCoords = () => {
        const { lng = 0, lat = 0 } = marker?.getLngLat() || {};
        if (moment) moment.location = { coordinates: [lng, lat] };
    };
    const rollbackCoords = () => {
        marker?.setLngLat(moment?.location.coordinates || [0, 0]);
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
