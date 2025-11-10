import imageCompression from 'browser-image-compression';

import { MAX_IMAGE_SIZE_IN_PX } from '@/constants/images';

const options = {
    maxSizeMB: 4.5,
    maxWidthOrHeight: MAX_IMAGE_SIZE_IN_PX,
    useWebWorker: true,
};

// client-side
export async function resizeImage(file: File) {
    return await imageCompression(file, options);
}
