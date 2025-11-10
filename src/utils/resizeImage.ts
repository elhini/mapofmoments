import imageCompression from 'browser-image-compression';

const options = {
    maxSizeMB: 4.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
};

// client-side
export async function resizeImage(file: File) {
    return await imageCompression(file, options);
}
