import type React from 'react';
import { useRef, useState } from 'react';

export const useFileDragging = (onFilesSelected: (files: FileList | null) => void) => {
    const dragCounter = useRef(0); // to avoid blinking from nested elements
    const [isDragActive, setIsDragActive] = useState(false);

    const isFileDrag = (e: React.DragEvent) =>
        Array.from(e.dataTransfer?.types || []).includes('Files');

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current = 0;
        setIsDragActive(false);
        onFilesSelected(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isFileDrag(e)) return;
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        setIsDragActive(true);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isFileDrag(e)) return;
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current += 1;
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (!isFileDrag(e)) return;
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current -= 1;
        if (dragCounter.current <= 0) {
            setIsDragActive(false);
        }
    };

    return { handleDrop, handleDragOver, handleDragEnter, handleDragLeave, isDragActive };
};
