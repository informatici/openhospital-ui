import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectExamTypesState = (state: IState) => state.types.exams;

export const selectGetAllExamTypesState = createSelector(
	[selectExamTypesState],
	(examTypesState) => examTypesState.getAll,
);

export const selectGetAllExamTypesLoading = createSelector(
	[selectGetAllExamTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllExamTypesError = createSelector(
	[selectGetAllExamTypesState],
	(getAllState) => getAllState.error,
);

export const selectExamTypes = createSelector(
	[selectGetAllExamTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateExamTypeState = createSelector(
	[selectExamTypesState],
	(examTypesState) => examTypesState.create,
);

export const selectCreateExamTypeLoading = createSelector(
	[selectCreateExamTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateExamTypeError = createSelector(
	[selectCreateExamTypeState],
	(createState) => createState.error,
);

export const selectUpdateExamTypeState = createSelector(
	[selectExamTypesState],
	(examTypesState) => examTypesState.update,
);

export const selectUpdateExamTypeLoading = createSelector(
	[selectUpdateExamTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateExamTypeError = createSelector(
	[selectUpdateExamTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteExamTypeState = createSelector(
	[selectExamTypesState],
	(examTypesState) => examTypesState.delete,
);

export const selectDeleteExamTypeLoading = createSelector(
	[selectDeleteExamTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteExamTypeError = createSelector(
	[selectDeleteExamTypeState],
	(deleteState) => deleteState.error,
);
