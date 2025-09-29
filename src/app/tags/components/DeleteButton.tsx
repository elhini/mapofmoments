import { Button } from '@heroui/button';
import { Trash } from 'lucide-react';
import { useDeleteTagMutation } from '@/hooks/useTagsApi';

type Props = {
    tagId: string;
};

export const DeleteButton = ({ tagId }: Props) => {
    const { mutate: deleteTag, isPending: isDeleting } = useDeleteTagMutation(tagId);

    return (
        <Button onPress={deleteTag} isLoading={isDeleting} variant="light" size="sm" isIconOnly>
            <Trash size={16} />
        </Button>
    );
};
