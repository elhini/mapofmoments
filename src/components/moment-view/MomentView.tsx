import { Modal, ModalContent } from '@heroui/modal';

import type { PublicMoment } from '@/types/moment';
import { NavButton } from '@/components/nav-button/NavButton';
import { MomentImages } from '@/components/moment-images/MomentImages';
import { useGetSharedMomentImagesQuery } from '@/hooks/useMomentImagesApi';

type Props = {
    moment: PublicMoment;
    hasPrev: boolean;
    hasNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    onClose: () => void;
};

export const MomentView = ({ moment, hasPrev, hasNext, onPrev, onNext, onClose }: Props) => {
    const { data: images = [], isError } = useGetSharedMomentImagesQuery(moment.id);

    return (
        <Modal
            className="fixed top-10 w-[300px] overflow-visible p-3 sm:top-[50%] sm:left-[50%] sm:m-0"
            isOpen
            onClose={onClose}
        >
            <ModalContent className="flex flex-col gap-3">
                <div className="relative -z-1 flex flex-col gap-2 p-2 text-left">
                    <div>{moment.title}</div>
                    <div className="text-foreground-700 text-sm">{moment.description}</div>
                    <div className="text-foreground-500 text-xs">
                        {moment.date} {moment.not_exact_date ? '(примерная дата)' : ''}
                    </div>
                    {hasPrev && <NavButton onPress={onPrev} direction="prev" />}
                    {hasNext && <NavButton onPress={onNext} direction="next" />}
                </div>
                <MomentImages images={images} isError={isError} momentId={moment.id} />
            </ModalContent>
        </Modal>
    );
};
