import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectAgeTypesState = (state: IState) => state.types.ageTypes;

export const selectGetAllAgeTypesState = createSelector(
	[selectAgeTypesState],
	(ageTypesState) => ageTypesState.getAll,
);

export const selectGetAllAgeTypesLoading = createSelector(
	[selectGetAllAgeTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllAgeTypesError = createSelector(
	[selectGetAllAgeTypesState],
	(getAllState) => getAllState.error,
);

export const selectAgeTypes = createSelector(
	[selectGetAllAgeTypesState],
	(getAllState) => getAllState.data,
);

export const selectUpdateAgeTypesState = createSelector(
	[selectAgeTypesState],
	(ageTypesState) => ageTypesState.update,
);

export const selectUpdateAgeTypesLoading = createSelector(
	[selectUpdateAgeTypesState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateAgeTypesError = createSelector(
	[selectUpdateAgeTypesState],
	(updateState) => updateState.error,
);
