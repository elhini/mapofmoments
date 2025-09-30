import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';

import { Copy, Share2 } from 'lucide-react';

import { useShareTagMutation } from '@/hooks/useTagsApi';

type Props = {
    tagId: string;
    publicId?: string;
};

export const ShareButton = ({ tagId, publicId }: Props) => {
    const { mutateAsync: shareTag, isPending: isSharing } = useShareTagMutation(tagId);

    const shareOrCopy = async () => {
        if (navigator.clipboard) {
            const publicIdForLink = publicId || (await shareTag(tagId));
            const link = `${window.location.origin}/share/tag/${publicIdForLink}`;
            await navigator.clipboard.writeText(link);
            const createdText = publicId ? '' : 'создана и ';
            addToast({
                title: 'Ссылка ' + createdText + 'скопирована в буфер обмена',
                severity: 'success',
            });
        } else {
            addToast({ title: 'Копирование в буфер обмена не поддерживается', severity: 'danger' });
        }
    };

    return (
        <Button onPress={shareOrCopy} variant="light" size="sm" isIconOnly isLoading={isSharing}>
            {publicId ? <Copy size={16} /> : <Share2 size={16} />}
        </Button>
    );
};
