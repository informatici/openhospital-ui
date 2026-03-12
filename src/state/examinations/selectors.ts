import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectExaminationsState = (state: IState) => state.examinations;

export const selectCreateExaminationState = createSelector(
	[selectExaminationsState],
	(examinationsState) => examinationsState.createExamination,
);

export const selectCreateExaminationLoading = createSelector(
	[selectCreateExaminationState],
	(createState) => createState.isLoading,
);

export const selectCreateExaminationError = createSelector(
	[selectCreateExaminationState],
	(createState) => createState.error,
);

export const selectUpdateExaminationState = createSelector(
	[selectExaminationsState],
	(examinationsState) => examinationsState.updateExamination,
);

export const selectUpdateExaminationLoading = createSelector(
	[selectUpdateExaminationState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateExaminationError = createSelector(
	[selectUpdateExaminationState],
	(updateState) => updateState.error,
);

export const selectGetDefaultPatientExaminationState = createSelector(
	[selectExaminationsState],
	(examinationsState) => examinationsState.getDefaultPatientExamination,
);

export const selectGetDefaultPatientExaminationLoading = createSelector(
	[selectGetDefaultPatientExaminationState],
	(getState) => getState.isLoading,
);

export const selectGetDefaultPatientExaminationError = createSelector(
	[selectGetDefaultPatientExaminationState],
	(getState) => getState.error,
);

export const selectDefaultPatientExamination = createSelector(
	[selectGetDefaultPatientExaminationState],
	(getState) => getState.data,
);

export const selectGetLastByPatientIdState = createSelector(
	[selectExaminationsState],
	(examinationsState) => examinationsState.getLastByPatientId,
);

export const selectGetLastByPatientIdLoading = createSelector(
	[selectGetLastByPatientIdState],
	(getState) => getState.isLoading,
);

export const selectGetLastByPatientIdError = createSelector(
	[selectGetLastByPatientIdState],
	(getState) => getState.error,
);

export const selectLastExaminationByPatientId = createSelector(
	[selectGetLastByPatientIdState],
	(getState) => getState.data,
);

export const selectExaminationsByPatientIdState = createSelector(
	[selectExaminationsState],
	(examinationsState) => examinationsState.examinationsByPatientId,
);

export const selectExaminationsByPatientIdLoading = createSelector(
	[selectExaminationsByPatientIdState],
	(getState) => getState.isLoading,
);

export const selectExaminationsByPatientIdError = createSelector(
	[selectExaminationsByPatientIdState],
	(getState) => getState.error,
);

export const selectExaminationsByPatientId = createSelector(
	[selectExaminationsByPatientIdState],
	(getState) => getState.data,
);

export const selectDeleteExaminationState = createSelector(
	[selectExaminationsState],
	(examinationsState) => examinationsState.deleteExamination,
);

export const selectDeleteExaminationLoading = createSelector(
	[selectDeleteExaminationState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteExaminationError = createSelector(
	[selectDeleteExaminationState],
	(deleteState) => deleteState.error,
);
