import React from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { DatePicker } from '@heroui/date-picker';
import { getCalendarDate } from '@/utils/getCalendarDate';

type Value = {
    name: string;
    value?: string;
};
type Props = {
    value?: string;
    onChange: ({ name, value }: Value) => void;
};

export const DateField = ({ value = '', onChange }: Props) => (
    <I18nProvider locale="ru">
        <DatePicker
            label="Дата"
            name="date"
            firstDayOfWeek="mon"
            value={getCalendarDate(value)}
            onChange={(v) => onChange({ name: 'date', value: v?.toString() })}
            className="w-34 text-left"
        />
    </I18nProvider>
);
