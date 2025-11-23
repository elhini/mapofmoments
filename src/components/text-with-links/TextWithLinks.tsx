import React, { Fragment } from 'react';

import { Link } from '@heroui/link';

export function TextWithLinks({ text }: { text?: string }) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text?.split(urlRegex) || [];

    return parts.map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <Link key={index} href={part} target="_blank" className="text-sm">
                    {part}
                </Link>
            );
        }

        return <Fragment key={index}>{part}</Fragment>;
    });
}
