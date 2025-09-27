'use client';

import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/api-client/getSupabaseBrowserClient';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const supabase = getSupabaseBrowserClient();
        setIsSending(true);
        const { error } = await supabase.auth.updateUser({ password });
        setIsSending(false);

        if (error) {
            setStatus(error.message);
        } else {
            setStatus('Пароль успешно обновлён! Перенаправляем...');
            setTimeout(() => (window.location.href = '/login'), 2000);
        }
    };

    return (
        <Form
            className="animate-fade-in m-5 flex w-80 max-w-3xl flex-col items-center gap-4 rounded-2xl bg-white/70 p-5 text-center shadow-xl backdrop-blur-md sm:gap-8 sm:p-10 dark:bg-slate-800/70"
            onSubmit={handleSubmit}
        >
            <h2 className="text-foreground mb-3 text-xl">Сброс пароля, шаг 2</h2>

            <Input
                label="Новый пароль"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" color="primary" size="lg" fullWidth isLoading={isSending}>
                Обновить пароль
            </Button>

            {status && <p className="text-center text-sm text-gray-600">{status}</p>}
        </Form>
    );
}
