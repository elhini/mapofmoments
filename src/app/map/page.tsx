import { Suspense } from 'react';

import type { Metadata } from 'next';

import { baseMetadata } from '@/app/metadata';

import MapPageView from './view';

export const metadata: Metadata = { ...baseMetadata, title: undefined }; // will be set in MapPageView

export default function MapPage() {
    return (
        <Suspense fallback={null}>
            <MapPageView />
        </Suspense>
    );
}
