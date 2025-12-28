import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

export default function HomePage() {
    return (
        <div
            className="animate-fade-in m-5 flex w-80 max-w-3xl flex-col items-center gap-4 rounded-2xl bg-white/70 p-5 text-center shadow-xl sm:w-full sm:gap-8 sm:p-10 dark:bg-slate-800/70"
            role="main"
        >
            <h2 className="bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-extrabold text-transparent">
                Map of Moments
            </h2>
            <h3 className="text-2xl text-slate-700 dark:text-slate-200">
                Сохрани свои памятные моменты на&nbsp;карте
            </h3>

            <div className="-mx-2 flex flex-wrap justify-center gap-4">
                <span className="rotate-2 rounded-lg bg-sky-100 px-4 py-2 text-lg text-sky-700 shadow-md dark:bg-sky-800 dark:text-sky-200">
                    🏖️ первая поездка на море 🌊
                </span>
                <span className="-rotate-2 rounded-lg bg-emerald-100 px-4 py-2 text-base text-emerald-700 shadow-md dark:bg-emerald-800 dark:text-emerald-200">
                    🌲 поход с одноклассниками 🎒
                </span>
                <span className="rotate-1 rounded-lg bg-cyan-100 px-4 py-2 text-lg text-cyan-700 shadow-md dark:bg-cyan-800 dark:text-cyan-200">
                    🍻 тусовка с друзьями 🔥
                </span>
                <span className="-rotate-3 rounded-lg bg-cyan-50 px-4 py-2 text-lg text-cyan-600 shadow-md dark:bg-cyan-700 dark:text-cyan-100">
                    🎓 экватор универа 🏡
                </span>
                <span className="rotate-1 rounded-lg bg-cyan-50 px-4 py-2 text-lg text-cyan-600 shadow-md dark:bg-cyan-700 dark:text-cyan-100">
                    💍 свадебная фотосессия 📸
                </span>
                <span className="rotate-2 rounded-lg bg-cyan-100 px-4 py-2 text-lg text-cyan-700 shadow-md dark:bg-cyan-800 dark:text-cyan-200">
                    👶 выписка ребёнка 🎀
                </span>
                <span className="-rotate-1 rounded-lg bg-emerald-100 px-4 py-2 text-base text-emerald-700 shadow-md dark:bg-emerald-800 dark:text-emerald-200">
                    ✈️ путешествие за границу 🌍
                </span>
                <span className="rotate-3 rounded-lg bg-sky-100 px-4 py-2 text-lg text-sky-700 shadow-md dark:bg-sky-800 dark:text-sky-200">
                    🥂 корпоратив с коллегами 👔
                </span>
                <span className="-rotate-2 rounded-lg bg-cyan-100 px-4 py-2 text-lg text-cyan-700 shadow-md dark:bg-cyan-800 dark:text-cyan-200">
                    ⛷️ зимний отдых в горах 🏔
                </span>
            </div>

            <h4 className="text-xl text-slate-600 dark:text-slate-300">
                Отмечай места, добавляй впечатления&nbsp;— и&nbsp;делись ими с&nbsp;друзьями
            </h4>

            <div className="sticky bottom-0 flex w-full flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_0_20px_20px_white]">
                <div className="flex gap-4">
                    <Button
                        as={Link}
                        size="lg"
                        href="/register"
                        className="rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md"
                    >
                        Начать
                    </Button>
                    <Button
                        as={Link}
                        size="lg"
                        href="/login"
                        variant="bordered"
                        className="rounded-xl border-1 border-sky-400 text-sky-600 transition-colors hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-slate-700"
                    >
                        Продолжить
                    </Button>
                </div>
                <Link href="/about" className="text-sm text-sky-600">
                    О проекте
                </Link>
            </div>
        </div>
    );
}
