import { useLogoutMutation, useMeQuery } from './useAuthApi';

export const useAuth = () => {
    const { data: user } = useMeQuery();
    const { mutate: logout } = useLogoutMutation();

    return { user, logout: () => logout() };
};
