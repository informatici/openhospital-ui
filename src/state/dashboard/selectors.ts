import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectDashboardState = (state: IState) => state.dashboard;

export const selectDashboardPeriod = createSelector(
	[selectDashboardState],
	(dashboardState) => dashboardState.period,
);

export const selectDashboardResetPeriod = createSelector(
	[selectDashboardState],
	(dashboardState) => dashboardState.resetPeriod,
);
