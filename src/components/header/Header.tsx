'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/button/Button';

export const Header = () => {
    const { user, logout } = useAuth();
    const username = user?.user_metadata.username;

    return (
        <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
            <div>Map of Moments</div>
            <div className="flex items-center gap-4">
                <div className="w-50 overflow-hidden text-right text-ellipsis whitespace-nowrap">
                    {user
                        ? user.email + (username ? ' (' + username + ')' : '')
                        : 'Loading user...'}
                </div>
                <Button onClick={logout} size="small">
                    Logout
                </Button>
            </div>
        </header>
    );
};
