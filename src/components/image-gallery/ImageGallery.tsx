import React from 'react';

import { X } from 'lucide-react';

import { Modal, ModalContent } from '@heroui/modal';

import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './image-gallery.css';

import { getMomentImageUrl } from '@/utils/getMomentImageUrl';

type Props = {
    images: { storage_path: string }[];
    index: number;
    onClose: () => void;
};

export const ImageGallery = ({ images, index, onClose }: Props) => {
    const items = images.map((img) => ({ original: getMomentImageUrl(img.storage_path) }));
    return (
        <Modal isOpen onClose={onClose} size="full" closeButton={<X size={48} />}>
            <ModalContent className="justify-center bg-[#04152b]">
                <Gallery
                    items={items}
                    startIndex={index}
                    showFullscreenButton={false}
                    showBullets={true}
                    showIndex={true}
                    infinite={false}
                />
            </ModalContent>
        </Modal>
    );
};
