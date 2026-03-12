import moment from 'moment';

export const getCachedPeriod = (): string[] => {
	const cachedPeriod = localStorage.getItem(btoa('dfp'));

	if (cachedPeriod && atob(cachedPeriod) !== null) {
		const period = JSON.parse(atob(cachedPeriod));

		return period;
	} else {
		return [
			moment().startOf('day').toISOString(),
			moment().endOf('day').toISOString(),
		];
	}
};
