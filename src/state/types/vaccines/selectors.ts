import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectVaccineTypesState = (state: IState) => state.types.vaccines;

export const selectGetVaccineTypesState = createSelector(
	[selectVaccineTypesState],
	(vaccineTypesState) => vaccineTypesState.getVaccineTypes,
);

export const selectGetVaccineTypesLoading = createSelector(
	[selectGetVaccineTypesState],
	(getState) => getState.isLoading,
);

export const selectGetVaccineTypesError = createSelector(
	[selectGetVaccineTypesState],
	(getState) => getState.error,
);

export const selectVaccineTypes = createSelector(
	[selectGetVaccineTypesState],
	(getState) => getState.data,
);

export const selectCreateVaccineTypeState = createSelector(
	[selectVaccineTypesState],
	(vaccineTypesState) => vaccineTypesState.create,
);

export const selectCreateVaccineTypeLoading = createSelector(
	[selectCreateVaccineTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateVaccineTypeError = createSelector(
	[selectCreateVaccineTypeState],
	(createState) => createState.error,
);

export const selectUpdateVaccineTypeState = createSelector(
	[selectVaccineTypesState],
	(vaccineTypesState) => vaccineTypesState.update,
);

export const selectUpdateVaccineTypeLoading = createSelector(
	[selectUpdateVaccineTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateVaccineTypeError = createSelector(
	[selectUpdateVaccineTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteVaccineTypeState = createSelector(
	[selectVaccineTypesState],
	(vaccineTypesState) => vaccineTypesState.delete,
);

export const selectDeleteVaccineTypeLoading = createSelector(
	[selectDeleteVaccineTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteVaccineTypeError = createSelector(
	[selectDeleteVaccineTypeState],
	(deleteState) => deleteState.error,
);
