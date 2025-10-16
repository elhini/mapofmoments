import { useEffect, useState } from 'react';

export const useScreenWidth = (breakpoint = 768) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { width, isMobile: width < breakpoint, isDesktop: width >= breakpoint };
};
