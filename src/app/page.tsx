export default function HomePage() {
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            <main className="row-start-2 flex flex-col items-center gap-[32px]">
                Map of Moments
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <a
                        className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-md border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                        href="/register"
                    >
                        Регистрация
                    </a>
                    <a
                        className="flex h-10 items-center justify-center rounded-md border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                        href="/login"
                    >
                        Вход
                    </a>
                </div>
            </main>
        </div>
    );
}
