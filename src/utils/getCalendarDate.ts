import { CalendarDate } from '@internationalized/date';

export const getCalendarDate = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : null;
    return date ? new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()) : null;
};
