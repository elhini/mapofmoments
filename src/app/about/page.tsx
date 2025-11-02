'use client';

import { Link } from '@heroui/link';
import { Button } from '@heroui/button';

export default function AboutPage() {
    return (
        <div
            className="animate-fade-in m-5 flex w-80 max-w-3xl flex-col items-start gap-2 rounded-2xl bg-white/70 p-5 text-left shadow-xl sm:w-full sm:gap-4 sm:p-10 dark:bg-slate-800/70"
            role="main"
        >
            <h2 className="bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-extrabold text-transparent">
                О проекте
            </h2>
            <p>
                За&nbsp;свою жизнь я&nbsp;много путешествовал&nbsp;— сплавлялся по&nbsp;рекам,
                колесил по&nbsp;горам, гулял по&nbsp;городам. У&nbsp;меня копились яркие впечатления
                и&nbsp;воспоминания.
            </p>
            <p>
                Но&nbsp;помимо впечатлений, в&nbsp;моей памяти оставались и&nbsp;детали: имена
                и&nbsp;топонимы, даты и&nbsp;цифры&nbsp;— те&nbsp;подробности, которые добавляют
                контекста и&nbsp;связей.
            </p>
            <p>
                И&nbsp;чем больше поездок я&nbsp;совершал&nbsp;— тем больше начинал ценить эти
                «хлебные крошки». Ведь они позволяли мне возвращаться в&nbsp;те&nbsp;моменты
                и&nbsp;проживать их&nbsp;снова.
            </p>
            <p>
                Чтобы сохранить всё это, я&nbsp;сделал Map of&nbsp;Moments — карту воспоминаний,
                которая связывает места и&nbsp;события, а&nbsp;в&nbsp;будущем, я&nbsp;надеюсь&nbsp;—
                и&nbsp;людей друг с&nbsp;другом.
            </p>
            <p>
                Прямо сейчас&nbsp;— это сервис, где можно отмечать точки, добавлять к&nbsp;ним
                описания и&nbsp;даты, а&nbsp;также тэги и&nbsp;фотографии. Что именно
                сохранять&nbsp;— каждый решает сам.
            </p>
            <p>
                Например, можно собрать все поездки по&nbsp;странам Европы или сплавы по&nbsp;горным
                рекам&nbsp;— и&nbsp;поделиться этими коллекциями с&nbsp;друзьями, переслав
                им&nbsp;публичную ссылку.
            </p>
            <p>
                А&nbsp;если моменты тесно связаны, можно объединить их&nbsp;в&nbsp;«цепочку»&nbsp;—
                последовательность гео-меток, рассказывающих вашу историю в&nbsp;хронологическом
                порядке.
            </p>
            <p>
                Это мой pet-проект, я&nbsp;делаю его в&nbsp;свободное время, поэтому многие идеи ещё
                не&nbsp;успел реализовать. Но&nbsp;я&nbsp;буду рад любым вашим отзывам
                и&nbsp;комментариям :)
            </p>
            <p>
                Попробуйте, и&nbsp;надеюсь, вам тоже захочется сохранить свои памятные моменты
                на&nbsp;карте!
            </p>
            <Button
                as={Link}
                href="/register"
                className="self-end rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white shadow-md"
            >
                Начать
            </Button>
        </div>
    );
}
