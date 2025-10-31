import type { NextConfig } from 'next';

import { supabaseUrl } from '@/utils/supabaseConfig';
import { momentImagesBucket } from '@/constants/buckets';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL(`${supabaseUrl}/storage/v1/object/public/${momentImagesBucket}/**`),
        ],
    },
};

export default nextConfig;
