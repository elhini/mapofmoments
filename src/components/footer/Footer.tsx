'use client';

export const Footer = () => {
    return (
        <footer className="fixed right-0 bottom-0 left-0 z-2 flex w-full items-center justify-end bg-gradient-to-t from-black to-transparent p-4 text-white">
            <div className="flex gap-6">
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfddRpKAD-HxTAyqK9LPLsT0nAajq8pXHfnEoI3JXVVbOAH-w/viewform?usp=dialog"
                    target="_blank"
                    className="inline-flex text-sm font-medium text-white/70 transition hover:text-white"
                >
                    Отзыв или идея
                </a>
                <a
                    href="https://elhini.ru"
                    target="_blank"
                    className="inline-flex text-sm font-medium text-white/70 transition hover:text-white"
                >
                    Сайт автора
                </a>
                <a
                    href="https://github.com/elhini/mapofmoments"
                    target="_blank"
                    className="inline-flex text-sm font-medium text-white/70 transition hover:text-white"
                >
                    Код на GitHub
                </a>
            </div>
        </footer>
    );
};
