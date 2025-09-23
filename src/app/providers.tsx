'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroUIProvider } from '@heroui/system';

export function Providers({ children }: { children: React.ReactNode }) {
    const client = React.useMemo(() => new QueryClient(), []);
    return (
        <HeroUIProvider>
            <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </HeroUIProvider>
    );
}
