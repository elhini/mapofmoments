import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

export default function HomePage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
            <h2 className="text-3xl">Map of Moments - карта твоих событий</h2>
            <h3 className="text-2xl">Сохрани свои памятные моменты на карте</h3>
            <ul className="text-center leading-10">
                <li>🏖️ первая поездка на море 🌊</li>
                <li>🌲 поход с одноклассниками 🎒</li>
                <li>🍻 тусовка с друзьями на даче 🔥</li>
                <li>🎓 экватор универа в коттедже 🏡</li>
                <li>💍 свадебная фотосессия в парке 📸</li>
                <li>👶 выписка ребёнка из роддома 🎀</li>
                <li>✈️ путешествие за границу 🌍</li>
                <li>🥂 корпоратив с коллегами 👔</li>
                <li>⛷️ зимний отдых в горах 🏔</li>
            </ul>
            <h4 className="text-xl">
                Отмечай места, добавляй впечатления - и делись ими с друзьями
            </h4>
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
