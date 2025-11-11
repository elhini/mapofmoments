import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Counters } from '@/components/counters/Counters';
import { Posthog } from '@/components/posthog/Posthog';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';

import { baseMetadata } from './metadata';
import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className="bg-gradient-to-br from-sky-100 via-emerald-100 to-cyan-100 text-center antialiased dark:from-slate-800 dark:via-slate-900 dark:to-black">
                <Counters />
                <Posthog />
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
