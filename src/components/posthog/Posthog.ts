'use client';

import { useEffect } from 'react';

import posthog from 'posthog-js';

export const Posthog = () => {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return;

        posthog.init('phc_ouqVn1MuqRwPrSqesntEteA0BcxRcxflNtkbUVUt5pN', {
            api_host: 'https://us.i.posthog.com',
            defaults: '2025-05-24',
            person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        });
    }, []);

    return null;
};
