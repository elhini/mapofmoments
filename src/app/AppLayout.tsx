'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header/Header';
import type { ReactNode } from 'react';

const publicRoutes = ['/login', '/register', '/verify-email', '/'];

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
