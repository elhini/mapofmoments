import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Header } from '@/components/header/Header';

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
        <Providers>
            <html lang="ru">
                <body className="bg-gradient-to-br from-sky-100 via-emerald-100 to-cyan-100 text-center antialiased dark:from-slate-800 dark:via-slate-900 dark:to-black">
                    <Header />
                    {children}
                </body>
            </html>
        </Providers>
    );
}
