import type { NextConfig } from 'next';

import { momentImagesBucketPath } from '@/constants/buckets';

const nextConfig: NextConfig = {
    images: { remotePatterns: [new URL(`${momentImagesBucketPath}/**`)] },
};

export default nextConfig;
