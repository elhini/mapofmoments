'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@heroui/button';

export const Header = () => {
    const { user, logout } = useAuth();
    const username = user?.user_metadata.username;

    return (
        <header className="top-0 flex items-center justify-between p-4">
            <div>Map of Moments</div>
            <div className="flex items-center gap-4">
                <div className="w-50 overflow-hidden text-right text-ellipsis whitespace-nowrap">
                    {user ? user.email + (username ? ' (' + username + ')' : '') : 'Загрузка...'}
                </div>
                <Button onPress={logout} size="sm">
                    Выйти
                </Button>
            </div>
        </header>
    );
};
