'use client';

import { Link } from '@heroui/link';

import { usePublicPage } from '@/hooks/usePublicPage';

export const Footer = () => {
    const { isPublic } = usePublicPage();

    return isPublic ? null : (
        <footer className="fixed right-0 bottom-0 left-0 z-2 flex w-full items-center justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
            <div className="flex gap-6">
                <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfddRpKAD-HxTAyqK9LPLsT0nAajq8pXHfnEoI3JXVVbOAH-w/viewform?usp=dialog"
                    target="_blank"
                    className="text-sm text-white/70 transition hover:text-white"
                >
                    Отзыв или идея
                </Link>
                <Link
                    href="https://elhini.ru"
                    target="_blank"
                    className="text-sm text-white/70 transition hover:text-white"
                >
                    Сайт автора
                </Link>
                <Link
                    href="https://github.com/elhini/mapofmoments"
                    target="_blank"
                    className="text-sm text-white/70 transition hover:text-white"
                >
                    Код на GitHub
                </Link>
            </div>
        </footer>
    );
};
