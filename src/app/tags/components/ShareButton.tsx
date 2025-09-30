import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { LinkIcon } from 'lucide-react';

type Props = {
    publicId: string;
};

export const ShareButton = ({ publicId }: Props) => {
    const copyToClipboard = async () => {
        if (navigator.clipboard) {
            const link = `${window.location.origin}/share/tag/${publicId}`;
            await navigator.clipboard.writeText(link);
            addToast({ title: 'Ссылка скопирована в буфер обмена', severity: 'success' });
        } else {
            addToast({ title: 'Копирование в буфер обмена не поддерживается', severity: 'danger' });
        }
    };

    return (
        <Button onPress={copyToClipboard} variant="light" size="sm" isIconOnly>
            <LinkIcon size={16} />
        </Button>
    );
};
