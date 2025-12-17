import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectTherapiesState = (state: IState) => state.therapies;

export const selectCreateTherapyState = createSelector(
	[selectTherapiesState],
	(therapiesState) => therapiesState.createTherapy,
);

export const selectCreateTherapyLoading = createSelector(
	[selectCreateTherapyState],
	(state) => state.isLoading,
);

export const selectCreateTherapyError = createSelector(
	[selectCreateTherapyState],
	(state) => state.error,
);

export const selectUpdateTherapyState = createSelector(
	[selectTherapiesState],
	(therapiesState) => therapiesState.updateTherapy,
);

export const selectUpdateTherapyLoading = createSelector(
	[selectUpdateTherapyState],
	(state) => state.isLoading,
);

export const selectUpdateTherapyError = createSelector(
	[selectUpdateTherapyState],
	(state) => state.error,
);

export const selectTherapiesByPatientIdState = createSelector(
	[selectTherapiesState],
	(therapiesState) => therapiesState.therapiesByPatientId,
);

export const selectTherapiesByPatientIdLoading = createSelector(
	[selectTherapiesByPatientIdState],
	(state) => state.isLoading,
);

export const selectTherapiesByPatientIdError = createSelector(
	[selectTherapiesByPatientIdState],
	(state) => state.error,
);

export const selectTherapiesByPatientId = createSelector(
	[selectTherapiesByPatientIdState],
	(state) => state.data,
);

export const selectDeleteTherapyState = createSelector(
	[selectTherapiesState],
	(therapiesState) => therapiesState.deleteTherapy,
);

export const selectDeleteTherapyLoading = createSelector(
	[selectDeleteTherapyState],
	(state) => state.isLoading,
);

export const selectDeleteTherapyError = createSelector(
	[selectDeleteTherapyState],
	(state) => state.error,
);
