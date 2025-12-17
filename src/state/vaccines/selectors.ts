import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectVaccinesState = (state: IState) => state.vaccines;

export const selectVaccineListState = createSelector(
	[selectVaccinesState],
	(vaccinesState) => vaccinesState.vaccineList,
);

export const selectVaccineListLoading = createSelector(
	[selectVaccineListState],
	(state) => state.isLoading,
);

export const selectVaccineListError = createSelector(
	[selectVaccineListState],
	(state) => state.error,
);

export const selectVaccineList = createSelector(
	[selectVaccineListState],
	(state) => state.data,
);

export const selectCreateState = createSelector(
	[selectVaccinesState],
	(vaccinesState) => vaccinesState.create,
);

export const selectCreateLoading = createSelector(
	[selectCreateState],
	(state) => state.isLoading,
);

export const selectCreateError = createSelector(
	[selectCreateState],
	(state) => state.error,
);

export const selectUpdateState = createSelector(
	[selectVaccinesState],
	(vaccinesState) => vaccinesState.update,
);

export const selectUpdateLoading = createSelector(
	[selectUpdateState],
	(state) => state.isLoading,
);

export const selectUpdateError = createSelector(
	[selectUpdateState],
	(state) => state.error,
);

export const selectDeleteState = createSelector(
	[selectVaccinesState],
	(vaccinesState) => vaccinesState.delete,
);

export const selectDeleteLoading = createSelector(
	[selectDeleteState],
	(state) => state.isLoading,
);

export const selectDeleteError = createSelector(
	[selectDeleteState],
	(state) => state.error,
);
