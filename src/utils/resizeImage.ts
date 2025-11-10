type ResizeOptions = {
    maxSize?: number;
    quality?: number;
};

/**
 * Client-size image resizing
 */
export async function resizeImage(file: File, options: ResizeOptions = {}): Promise<Blob> {
    const { maxSize = 1920, quality = 1 } = options;

    // load original image
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => (img.onload = resolve));

    // calc dimensions
    const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
    const newWidth = Math.round(img.width * scale);
    const newHeight = Math.round(img.height * scale);

    // make canvas
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    // draw resized image
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // export blob
    const ext = file.name.split('.').pop() || 'jpg';
    const mimeType = 'image/' + ext;
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob!), mimeType, quality));
}
