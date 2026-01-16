import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectMedicalTypesState = (state: IState) => state.types.medicals;

export const selectGetAllMedicalTypesState = createSelector(
	[selectMedicalTypesState],
	(medicalTypesState) => medicalTypesState.getAll,
);

export const selectGetAllMedicalTypesLoading = createSelector(
	[selectGetAllMedicalTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllMedicalTypesError = createSelector(
	[selectGetAllMedicalTypesState],
	(getAllState) => getAllState.error,
);

export const selectMedicalTypes = createSelector(
	[selectGetAllMedicalTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateMedicalTypeState = createSelector(
	[selectMedicalTypesState],
	(medicalTypesState) => medicalTypesState.create,
);

export const selectCreateMedicalTypeLoading = createSelector(
	[selectCreateMedicalTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateMedicalTypeError = createSelector(
	[selectCreateMedicalTypeState],
	(createState) => createState.error,
);

export const selectUpdateMedicalTypeState = createSelector(
	[selectMedicalTypesState],
	(medicalTypesState) => medicalTypesState.update,
);

export const selectUpdateMedicalTypeLoading = createSelector(
	[selectUpdateMedicalTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateMedicalTypeError = createSelector(
	[selectUpdateMedicalTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteMedicalTypeState = createSelector(
	[selectMedicalTypesState],
	(medicalTypesState) => medicalTypesState.delete,
);

export const selectDeleteMedicalTypeLoading = createSelector(
	[selectDeleteMedicalTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteMedicalTypeError = createSelector(
	[selectDeleteMedicalTypeState],
	(deleteState) => deleteState.error,
);
