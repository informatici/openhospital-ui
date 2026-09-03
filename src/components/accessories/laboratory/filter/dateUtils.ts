import moment from 'moment';

const API_DATE_TIME_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]';

export const isFutureLocalDate = (
	value: string | Date,
	now: Date = new Date(),
): boolean => moment(value).startOf('day').isAfter(moment(now).startOf('day'));

export const formatLocalFilterDateFrom = (value: string | Date): string =>
	moment(value).startOf('day').format(API_DATE_TIME_FORMAT);

export const formatLocalFilterDateTo = (value: string | Date): string =>
	moment(value).endOf('day').format(API_DATE_TIME_FORMAT);
