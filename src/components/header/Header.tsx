'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/button/Button';

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
            <div>Map of Moments</div>
            <div className="flex w-50 items-center gap-4">
                <div className="w-100 text-right">
                    {user ? (
                        <div>
                            <p>{user.email}</p>
                            {user.user_metadata.name && <p>{user.user_metadata.name}</p>}
                        </div>
                    ) : (
                        <p>Loading user...</p>
                    )}
                </div>
                <Button onClick={logout} size="small">
                    Logout
                </Button>
            </div>
        </header>
    );
};
