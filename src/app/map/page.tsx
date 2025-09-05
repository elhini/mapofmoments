'use client';

import { Button } from '@/components/button/Button';
import React from 'react';

export default function MapPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            Вдохновляющий текст
            <div className="flex items-center">
                <Button variant="primary">Добавить момент</Button>
            </div>
        </div>
    );
}
