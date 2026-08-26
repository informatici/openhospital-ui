import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectExamsState = (state: IState) => state.exams;

export const selectExamListState = createSelector(
	[selectExamsState],
	(examsState) => examsState.examList,
);

export const selectExamListLoading = createSelector(
	[selectExamListState],
	(state) => state.isLoading,
);

export const selectExamListError = createSelector(
	[selectExamListState],
	(state) => state.error,
);

export const selectExamList = createSelector(
	[selectExamListState],
	(state) => state.data,
);

export const selectExamCreateState = createSelector(
	[selectExamsState],
	(examsState) => examsState.examCreate,
);

export const selectExamCreateLoading = createSelector(
	[selectExamCreateState],
	(state) => state.isLoading,
);

export const selectExamCreateError = createSelector(
	[selectExamCreateState],
	(state) => state.error,
);

export const selectExamUpdateState = createSelector(
	[selectExamsState],
	(examsState) => examsState.examUpdate,
);

export const selectExamUpdateLoading = createSelector(
	[selectExamUpdateState],
	(state) => state.isLoading,
);

export const selectExamUpdateError = createSelector(
	[selectExamUpdateState],
	(state) => state.error,
);

export const selectExamDeleteState = createSelector(
	[selectExamsState],
	(examsState) => examsState.examDelete,
);

export const selectExamDeleteLoading = createSelector(
	[selectExamDeleteState],
	(state) => state.isLoading,
);

export const selectExamDeleteError = createSelector(
	[selectExamDeleteState],
	(state) => state.error,
);

export const selectExamRowsByExamCodeState = createSelector(
	[selectExamsState],
	(examsState) => examsState.examRowsByExamCode,
);

export const selectExamRowsByExamCodeLoading = createSelector(
	[selectExamRowsByExamCodeState],
	(state) => state.isLoading,
);

export const selectExamRowsByExamCodeError = createSelector(
	[selectExamRowsByExamCodeState],
	(state) => state.error,
);

export const selectExamRowsByExamCode = createSelector(
	[selectExamRowsByExamCodeState],
	(state) => state.data,
);
