import { Button } from '@/components/button/Button';

export default function HomePage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
            <h2 className="text-center text-3xl">Map of Moments</h2>

            <div className="flex gap-4">
                <Button href="/register">Регистрация</Button>
                <Button href="/login">Вход</Button>
            </div>
        </div>
    );
}
