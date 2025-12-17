import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectPregnantTreatmentTypesState = (state: IState) =>
	state.types.pregnantTreatment;

export const selectGetAllPregnantTreatmentTypesState = createSelector(
	[selectPregnantTreatmentTypesState],
	(pregnantTreatmentTypesState) => pregnantTreatmentTypesState.getAll,
);

export const selectGetAllPregnantTreatmentTypesLoading = createSelector(
	[selectGetAllPregnantTreatmentTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllPregnantTreatmentTypesError = createSelector(
	[selectGetAllPregnantTreatmentTypesState],
	(getAllState) => getAllState.error,
);

export const selectPregnantTreatmentTypes = createSelector(
	[selectGetAllPregnantTreatmentTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreatePregnantTreatmentTypeState = createSelector(
	[selectPregnantTreatmentTypesState],
	(pregnantTreatmentTypesState) => pregnantTreatmentTypesState.create,
);

export const selectCreatePregnantTreatmentTypeLoading = createSelector(
	[selectCreatePregnantTreatmentTypeState],
	(createState) => createState.isLoading,
);

export const selectCreatePregnantTreatmentTypeError = createSelector(
	[selectCreatePregnantTreatmentTypeState],
	(createState) => createState.error,
);

export const selectUpdatePregnantTreatmentTypeState = createSelector(
	[selectPregnantTreatmentTypesState],
	(pregnantTreatmentTypesState) => pregnantTreatmentTypesState.update,
);

export const selectUpdatePregnantTreatmentTypeLoading = createSelector(
	[selectUpdatePregnantTreatmentTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdatePregnantTreatmentTypeError = createSelector(
	[selectUpdatePregnantTreatmentTypeState],
	(updateState) => updateState.error,
);

export const selectDeletePregnantTreatmentTypeState = createSelector(
	[selectPregnantTreatmentTypesState],
	(pregnantTreatmentTypesState) => pregnantTreatmentTypesState.delete,
);

export const selectDeletePregnantTreatmentTypeLoading = createSelector(
	[selectDeletePregnantTreatmentTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeletePregnantTreatmentTypeError = createSelector(
	[selectDeletePregnantTreatmentTypeState],
	(deleteState) => deleteState.error,
);
