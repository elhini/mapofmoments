import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

export default function HomePage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
            <h2 className="text-center text-3xl">Map of Moments</h2>

            <div className="flex gap-4">
                <Button as={Link} href="/register">
                    Регистрация
                </Button>
                <Button as={Link} href="/login">
                    Вход
                </Button>
            </div>
        </div>
    );
}
