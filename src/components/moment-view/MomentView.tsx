import { Modal, ModalContent } from '@heroui/modal';

import type { PublicMoment } from '@/types/moment';
import { MomentImages } from '@/components/moment-images/MomentImages';
import { useGetAllMomentImagesQuery } from '@/hooks/useMomentImagesApi';

type Props = {
    moment: PublicMoment;
    onClose: () => void;
};

export const MomentView = ({ moment, onClose }: Props) => {
    const { data: images = [], isError } = useGetAllMomentImagesQuery(moment.id);

    return (
        <Modal
            className="fixed top-10 w-[300px] p-3 sm:top-[50%] sm:left-[50%] sm:m-0"
            isOpen
            onClose={onClose}
        >
            <ModalContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 p-2 text-left">
                    <div>{moment.title}</div>
                    <div className="text-foreground-700 text-sm">{moment.description}</div>
                    <div className="text-foreground-500 text-xs">
                        {moment.date} {moment.not_exact_date ? '(примерная дата)' : ''}
                    </div>
                </div>
                <MomentImages images={images} isError={isError} momentId={moment.id} />
            </ModalContent>
        </Modal>
    );
};
