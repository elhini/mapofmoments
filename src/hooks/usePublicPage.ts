import { usePathname } from 'next/navigation';

import { publicRoutes } from '@/constants/public-routes';

export const usePublicPage = () => {
    const pathname = usePathname();
    const isPublic = pathname === '/' || publicRoutes.some((r) => pathname.startsWith(r));

    return { isPublic, pathname };
};
