import type { FunctionComponent } from 'react';
import Image from 'next/image';

export const ViewToggle: FunctionComponent = () => {
    return (
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="/list"
            >
                <Image aria-hidden src="/file.svg" alt="Список" width={16} height={16} />
                Список
            </a>
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="/map"
            >
                <Image aria-hidden src="/globe.svg" alt="Карта" width={16} height={16} />
                Карта
            </a>
        </footer>
    );
};
