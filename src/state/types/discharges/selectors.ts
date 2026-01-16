import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectDischargeTypesState = (state: IState) =>
	state.types.discharges;

export const selectGetAllDischargeTypesState = createSelector(
	[selectDischargeTypesState],
	(dischargeTypesState) => dischargeTypesState.getAll,
);

export const selectGetAllDischargeTypesLoading = createSelector(
	[selectGetAllDischargeTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllDischargeTypesError = createSelector(
	[selectGetAllDischargeTypesState],
	(getAllState) => getAllState.error,
);

export const selectDischargeTypes = createSelector(
	[selectGetAllDischargeTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateDischargeTypeState = createSelector(
	[selectDischargeTypesState],
	(dischargeTypesState) => dischargeTypesState.create,
);

export const selectCreateDischargeTypeLoading = createSelector(
	[selectCreateDischargeTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateDischargeTypeError = createSelector(
	[selectCreateDischargeTypeState],
	(createState) => createState.error,
);

export const selectUpdateDischargeTypeState = createSelector(
	[selectDischargeTypesState],
	(dischargeTypesState) => dischargeTypesState.update,
);

export const selectUpdateDischargeTypeLoading = createSelector(
	[selectUpdateDischargeTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateDischargeTypeError = createSelector(
	[selectUpdateDischargeTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteDischargeTypeState = createSelector(
	[selectDischargeTypesState],
	(dischargeTypesState) => dischargeTypesState.delete,
);

export const selectDeleteDischargeTypeLoading = createSelector(
	[selectDeleteDischargeTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteDischargeTypeError = createSelector(
	[selectDeleteDischargeTypeState],
	(deleteState) => deleteState.error,
);
