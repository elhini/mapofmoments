import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { HeroUIProvider } from '@heroui/system';
import { Providers } from './providers';
import { AppLayout } from './AppLayout';

import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Map of Moments',
    description: 'Created by elhini',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <HeroUIProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <Providers>
                        <AppLayout>{children}</AppLayout>
                    </Providers>
                </body>
            </html>
        </HeroUIProvider>
    );
}
