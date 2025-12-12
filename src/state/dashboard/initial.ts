import { getCachedPeriod } from '../../components/accessories/dashboard/dashboardContent/filter/consts';
import type { IDashboardState } from './types';

export const initial: IDashboardState = {
	period: getCachedPeriod(),
	resetPeriod: false,
};
