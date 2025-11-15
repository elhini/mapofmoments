import { Suspense } from 'react';

import MapPageView from './view';

export default function MapPage() {
    return (
        <Suspense fallback={null}>
            <MapPageView />
        </Suspense>
    );
}
