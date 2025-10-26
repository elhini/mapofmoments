import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL(
                'https://mduigtlmzuzjcaezvhpn.supabase.co/storage/v1/object/public/moment_images/**',
            ),
        ],
    },
};

export default nextConfig;
