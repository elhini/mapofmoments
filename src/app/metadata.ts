import type { Metadata } from 'next';

export const baseMetadata: Metadata = {
    title: 'Map of Moments — карта твоих событий',
    description: 'Сохрани свои памятные события на карте — отметь важные места и моменты',
    openGraph: {
        title: 'Map of Moments — карта твоих событий',
        description: 'Сохрани свои памятные моменты на карте — отметь важные места и моменты',
        siteName: 'Map of Moments',
        locale: 'ru_RU',
        type: 'website',
        url: 'https://mapofmoments.vercel.app',
        images: [
            {
                url: 'https://mapofmoments.vercel.app/og-image.png',
                width: 1024,
                height: 539,
                alt: 'Map of Moments',
            },
        ],
    },
};
