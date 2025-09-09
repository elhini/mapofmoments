import type { Moment } from '@/api-client/moments/momentsApi';

export const buildMomentForForm = (moment: Moment) => {
    const location = { lng: moment.location.coordinates[0], lat: moment.location.coordinates[1] };
    return { ...moment, location };
};
