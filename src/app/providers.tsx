'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';

export function Providers({ children }: { children: React.ReactNode }) {
    const client = React.useMemo(() => new QueryClient(), []);
    return (
        <HeroUIProvider>
            <ToastProvider />
            <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </HeroUIProvider>
    );
}
