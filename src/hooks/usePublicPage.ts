import { usePathname } from 'next/navigation';

import { publicPages } from '@/constants/pages';

export const usePublicPage = () => {
    const pathname = usePathname();
    const isPublic = pathname === '/' || publicPages.some((r) => pathname.startsWith(r));

    return { isPublic, pathname };
};
