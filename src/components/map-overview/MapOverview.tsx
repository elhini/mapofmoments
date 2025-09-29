import { Card } from '@heroui/card';

type Props = {
    isPending: boolean;
    momentsCount: number;
};

export const MapOverview = ({ isPending, momentsCount }: Props) => {
    const summary = momentsCount ? (
        <div className="min-w-[180px]">Сохранено моментов: {momentsCount}</div>
    ) : (
        <div className="min-w-[250px]">Чтобы добавить первый момент, выберите точку на карте</div>
    );

    return (
        <Card className="fixed bottom-[50px] left-[50%] z-1 translate-x-[-50%] p-3">
            {isPending ? 'Загрузка моментов... ' : summary}
        </Card>
    );
};
