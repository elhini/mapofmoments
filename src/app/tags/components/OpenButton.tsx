import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

import { ExternalLink } from 'lucide-react';

import { buildLink } from '@/app/tags/utils/buildLink';
import type { Tag } from '@/types/tag';

type Props = {
    tag: Tag;
};

export const OpenButton = ({ tag }: Props) => {
    const href = buildLink(tag.publicId, tag.isChain);

    return (
        <Button as={Link} href={href} target="_blank" variant="light" size="sm" isIconOnly>
            <ExternalLink size={16} className="text-primary" />
        </Button>
    );
};
