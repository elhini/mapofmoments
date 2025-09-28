'use client';

import { usePathname } from 'next/navigation';

import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import type { LinkProps } from '@heroui/link';

import { GlobeIcon, TagsIcon } from 'lucide-react';

import { publicRoutes } from '@/constants/public-routes';
import { useLogoutMutation, useMeQuery } from '@/hooks/useAuthApi';

const getLinkProps = (href: string, pathname: string) => {
    return href === pathname
        ? { href: '', isDisabled: true }
        : { href, underline: 'hover' as LinkProps['underline'] };
};

export const Header = () => {
    const pathname = usePathname();
    const isPublicPage = publicRoutes.includes(pathname);

    const { data: user } = useMeQuery(!isPublicPage);
    const { mutate: logout } = useLogoutMutation();
    const username = user?.username;

    return isPublicPage ? null : (
        <header className="header fixed top-0 left-0 z-1 flex w-full items-center justify-between bg-gradient-to-b from-black to-transparent p-4 text-white">
            <div className="flex w-[50%] gap-4">
                <Link {...getLinkProps('/map', pathname)} className="gap-1 text-white">
                    <GlobeIcon size={16} /> Карта
                </Link>
                <Link {...getLinkProps('/tags', pathname)} className="gap-1 text-white">
                    <TagsIcon size={16} /> Тэги
                </Link>
            </div>
            <div className="flex w-[50%] items-center justify-end gap-4">
                <div className="overflow-hidden text-right text-ellipsis whitespace-nowrap">
                    {user ? user.email + (username ? ' (' + username + ')' : '') : 'Загрузка...'}
                </div>
                <Button onPress={() => logout()} size="sm">
                    Выйти
                </Button>
            </div>
        </header>
    );
};
