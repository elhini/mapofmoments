import { Card } from '@heroui/card';

type Props = {
    isPending: boolean;
    momentsCount: number;
};

export const MapOverview = ({ isPending, momentsCount }: Props) => {
    const summary = momentsCount
        ? `Сохранено моментов: ${momentsCount}`
        : 'Чтобы добавить первый момент, выберите точку на карте';

    return (
        <Card className="fixed bottom-[50px] left-[50%] z-1 max-w-[270px] translate-x-[-50%] p-3">
            {isPending ? 'Загрузка моментов... ' : summary}
        </Card>
    );
};
