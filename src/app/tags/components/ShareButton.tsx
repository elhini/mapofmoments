import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';

import { Copy, Share2 } from 'lucide-react';

import { useShareTagMutation } from '@/hooks/useTagsApi';
import { buildLink } from '@/app/tags/utils/buildLink';
import type { Tag } from '@/types/tag';

type Props = {
    tag: Tag;
};

export const ShareButton = ({ tag }: Props) => {
    const { mutateAsync: shareTag, isPending: isSharing } = useShareTagMutation(tag.id);

    const shareOrCopy = async () => {
        if (navigator.clipboard) {
            const publicIdForLink = tag.publicId || (await shareTag(tag.id));
            const link = buildLink(publicIdForLink, tag.isChain);
            await navigator.clipboard.writeText(link);
            const createdText = tag.publicId ? '' : 'создана и ';
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
            {tag.publicId ? <Copy size={16} /> : <Share2 size={16} />}
        </Button>
    );
};
