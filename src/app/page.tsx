import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

export default function HomePage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-100 to-cyan-100 px-4 dark:from-slate-800 dark:via-slate-900 dark:to-black">
            <div className="animate-fade-in flex max-w-3xl flex-col items-center gap-8 rounded-2xl bg-white/70 p-10 text-center shadow-xl backdrop-blur-md dark:bg-slate-800/70">
                <h2 className="bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-4xl font-extrabold text-transparent">
                    Map of Moments
                </h2>
                <h3 className="text-2xl text-slate-700 dark:text-slate-200">
                    Сохрани свои памятные моменты на карте
                </h3>

                <div className="flex max-w-2xl flex-wrap justify-center gap-4">
                    <span className="rotate-2 rounded-lg bg-sky-100 px-4 py-2 text-lg text-sky-700 shadow-md dark:bg-sky-800 dark:text-sky-200">
                        🏖️ первая поездка на море 🌊
                    </span>
                    <span className="-rotate-2 rounded-lg bg-emerald-100 px-4 py-2 text-base text-emerald-700 shadow-sm dark:bg-emerald-800 dark:text-emerald-200">
                        🌲 поход с одноклассниками 🎒
                    </span>
                    <span className="rotate-1 rounded-lg bg-cyan-100 px-4 py-2 text-lg text-cyan-700 shadow-md dark:bg-cyan-800 dark:text-cyan-200">
                        🍻 тусовка с друзьями 🔥
                    </span>
                    <span className="-rotate-3 rounded-lg bg-sky-50 px-4 py-2 text-lg text-sky-600 shadow-sm dark:bg-sky-700 dark:text-sky-100">
                        🎓 экватор универа 🏡
                    </span>
                    <span className="rotate-1 rounded-lg bg-emerald-50 px-4 py-2 text-lg text-emerald-600 shadow-sm dark:bg-emerald-700 dark:text-emerald-100">
                        💍 свадебная фотосессия 📸
                    </span>
                    <span className="rotate-2 rounded-lg bg-cyan-50 px-4 py-2 text-lg text-cyan-600 shadow-md dark:bg-cyan-700 dark:text-cyan-100">
                        👶 выписка ребёнка 🎀
                    </span>
                    <span className="-rotate-1 rounded-lg bg-sky-100 px-4 py-2 text-base text-sky-700 shadow-sm dark:bg-sky-800 dark:text-sky-200">
                        ✈️ путешествие за границу 🌍
                    </span>
                    <span className="rotate-3 rounded-lg bg-emerald-100 px-4 py-2 text-lg text-emerald-700 shadow-md dark:bg-emerald-800 dark:text-emerald-200">
                        🥂 корпоратив с коллегами 👔
                    </span>
                    <span className="-rotate-2 rounded-lg bg-cyan-100 px-4 py-2 text-lg text-cyan-700 shadow-sm dark:bg-cyan-800 dark:text-cyan-200">
                        ⛷️ зимний отдых в горах 🏔
                    </span>
                </div>

                <h4 className="text-xl text-slate-600 dark:text-slate-300">
                    Отмечай места, добавляй впечатления — и делись ими с друзьями
                </h4>

                <div className="flex gap-4">
                    <Button
                        as={Link}
                        href="/register"
                        className="rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-6 py-3 text-lg text-white shadow-md transition-transform hover:scale-105"
                    >
                        Начать
                    </Button>
                    <Button
                        as={Link}
                        href="/login"
                        variant="bordered"
                        className="rounded-xl border-1 border-sky-400 px-6 py-3 text-lg text-sky-600 transition-colors hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-700"
                    >
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    );
}
