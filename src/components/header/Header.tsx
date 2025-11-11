'use client';

import { useEffect } from 'react';

import posthog from 'posthog-js';

import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import type { LinkProps } from '@heroui/link';

import { GlobeIcon, TagsIcon } from 'lucide-react';

import { useLogoutMutation, useMeQuery } from '@/hooks/useAuthApi';
import { usePublicPage } from '@/hooks/usePublicPage';

const getLinkProps = (href: string, pathname: string) => {
    return href === pathname
        ? { href: '', isDisabled: true }
        : { href, underline: 'hover' as LinkProps['underline'] };
};

export const Header = () => {
    const { isPublic, pathname } = usePublicPage();
    const needHeader = !isPublic || pathname.startsWith('/share');

    const { data: user, isSuccess: isLoggedIn } = useMeQuery(!isPublic);
    const { mutate: logout, isPending: isLoggingOut, isSuccess: isLoggedOut } = useLogoutMutation();

    useEffect(() => {
        if (isLoggedOut) return posthog.reset();
        if (isLoggedIn) posthog.identify(user.email);
    }, [isLoggedOut, isLoggedIn, user]);

    return needHeader ? (
        <header className="fixed top-0 right-0 left-0 z-1 flex w-full min-w-[360px] items-center justify-between bg-gradient-to-b from-black to-transparent p-4 text-white">
            {isPublic ? (
                <>
                    <div className="flex w-[70%] gap-4">
                        <Link href="" isDisabled={true} className="gap-1 text-white">
                            <GlobeIcon size={16} /> Map of Moments
                        </Link>
                        <Link href="/" underline="hover" className="text-white">
                            Что это?
                        </Link>
                    </div>
                    <div className="flex w-[30%] justify-end">
                        <Button as={Link} href="/login" size="sm">
                            Войти
                        </Button>
                    </div>
                </>
            ) : (
                <>
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
                            {user ? user.email : 'Загрузка...'}
                        </div>
                        <Button onPress={() => logout()} isLoading={isLoggingOut} size="sm">
                            {isLoggingOut ? '' : 'Выйти'}
                        </Button>
                    </div>
                </>
            )}
        </header>
    ) : null;
};
