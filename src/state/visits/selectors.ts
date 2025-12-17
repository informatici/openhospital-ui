import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectVisitsState = (state: IState) => state.visits;

export const selectGetVisitsState = createSelector(
	[selectVisitsState],
	(visitsState) => visitsState.getVisits,
);

export const selectGetVisitsLoading = createSelector(
	[selectGetVisitsState],
	(state) => state.isLoading,
);

export const selectGetVisitsError = createSelector(
	[selectGetVisitsState],
	(state) => state.error,
);

export const selectVisits = createSelector(
	[selectGetVisitsState],
	(state) => state.data,
);

export const selectCreateVisitState = createSelector(
	[selectVisitsState],
	(visitsState) => visitsState.createVisit,
);

export const selectCreateVisitLoading = createSelector(
	[selectCreateVisitState],
	(state) => state.isLoading,
);

export const selectCreateVisitError = createSelector(
	[selectCreateVisitState],
	(state) => state.error,
);

export const selectUpdateVisitState = createSelector(
	[selectVisitsState],
	(visitsState) => visitsState.updateVisit,
);

export const selectUpdateVisitLoading = createSelector(
	[selectUpdateVisitState],
	(state) => state.isLoading,
);

export const selectUpdateVisitError = createSelector(
	[selectUpdateVisitState],
	(state) => state.error,
);

export const selectDeleteVisitState = createSelector(
	[selectVisitsState],
	(visitsState) => visitsState.deleteVisit,
);

export const selectDeleteVisitLoading = createSelector(
	[selectDeleteVisitState],
	(state) => state.isLoading,
);

export const selectDeleteVisitError = createSelector(
	[selectDeleteVisitState],
	(state) => state.error,
);
