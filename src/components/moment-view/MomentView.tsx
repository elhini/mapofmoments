import { Modal, ModalContent } from '@heroui/modal';

import type { PublicMoment } from '@/types/moment';

type Props = {
    moment: PublicMoment;
    onClose: () => void;
};

export const MomentView = ({ moment, onClose }: Props) => (
    <Modal
        className="fixed top-[50px] w-[300px] p-3 sm:top-[50%] sm:left-[50%] sm:m-0"
        isOpen
        onClose={onClose}
    >
        <ModalContent>
            <div className="flex flex-col gap-2 p-2 text-left">
                <div>{moment.title}</div>
                <div>{moment.description}</div>
                <div>
                    {moment.date} {moment.not_exact_date ? '(примерная дата)' : ''}
                </div>
            </div>
        </ModalContent>
    </Modal>
);
