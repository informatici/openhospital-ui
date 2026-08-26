import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectAdmissionTypesState = (state: IState) =>
	state.types.admissions;

export const selectGetAllAdmissionTypesState = createSelector(
	[selectAdmissionTypesState],
	(admissionTypesState) => admissionTypesState.getAll,
);

export const selectGetAllAdmissionTypesLoading = createSelector(
	[selectGetAllAdmissionTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllAdmissionTypesError = createSelector(
	[selectGetAllAdmissionTypesState],
	(getAllState) => getAllState.error,
);

export const selectAdmissionTypes = createSelector(
	[selectGetAllAdmissionTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateAdmissionTypeState = createSelector(
	[selectAdmissionTypesState],
	(admissionTypesState) => admissionTypesState.create,
);

export const selectCreateAdmissionTypeLoading = createSelector(
	[selectCreateAdmissionTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateAdmissionTypeError = createSelector(
	[selectCreateAdmissionTypeState],
	(createState) => createState.error,
);

export const selectUpdateAdmissionTypeState = createSelector(
	[selectAdmissionTypesState],
	(admissionTypesState) => admissionTypesState.update,
);

export const selectUpdateAdmissionTypeLoading = createSelector(
	[selectUpdateAdmissionTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateAdmissionTypeError = createSelector(
	[selectUpdateAdmissionTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteAdmissionTypeState = createSelector(
	[selectAdmissionTypesState],
	(admissionTypesState) => admissionTypesState.delete,
);

export const selectDeleteAdmissionTypeLoading = createSelector(
	[selectDeleteAdmissionTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteAdmissionTypeError = createSelector(
	[selectDeleteAdmissionTypeState],
	(deleteState) => deleteState.error,
);
