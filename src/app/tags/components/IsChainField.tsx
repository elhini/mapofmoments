import { Checkbox } from '@heroui/checkbox';
import { LoaderCircle } from 'lucide-react';
import { useUpdateTagMutation } from '@/hooks/useTagsApi';
import type { Tag } from '@/types/tag';

type Props = {
    tag: Tag;
};

export const IsChainField = ({ tag }: Props) => {
    const { mutate: updateTag, isPending: isUpdating } = useUpdateTagMutation(tag.id);
    const onChange = (isChain: boolean) => updateTag({ ...tag, isChain });

    return isUpdating ? (
        <LoaderCircle className="animate-spin" />
    ) : (
        <Checkbox isSelected={tag.isChain} onValueChange={onChange} />
    );
};
