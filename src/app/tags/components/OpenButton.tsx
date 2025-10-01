import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

import { ExternalLink } from 'lucide-react';

import { buildLink } from '@/app/tags/utils/buildLink';

type Props = {
    publicId: string;
};

export const OpenButton = ({ publicId }: Props) => {
    const href = buildLink(publicId);

    return (
        <Button as={Link} href={href} target="_blank" variant="light" size="sm" isIconOnly>
            <ExternalLink size={16} className="text-primary" />
        </Button>
    );
};
