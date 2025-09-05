import { useState, useEffect, useCallback } from 'react';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/api/supabaseClient';
import { useLogoutMutation } from './useAuthApi';

const supabase = getSupabaseBrowserClient();

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const { mutateAsync: logout } = useLogoutMutation();

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event: AuthChangeEvent, session: Session | null) => {
                setUser(session?.user ?? null);
            },
        );

        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
        setUser(null);
    }, [logout]);

    return { user, logout: handleLogout };
};
