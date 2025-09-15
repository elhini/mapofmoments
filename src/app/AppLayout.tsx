'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { Header } from '@/components/header/Header';
import { publicRoutes } from '@/constants/public-routes';

export function AppLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = publicRoutes.includes(pathname);

    return (
        <>
            {!isPublicPage && <Header />}
            {children}
        </>
    );
}
