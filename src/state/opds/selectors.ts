import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectOpdsState = (state: IState) => state.opds;

export const selectGetOpdsState = createSelector(
	[selectOpdsState],
	(opdsState) => opdsState.getOpds,
);

export const selectGetOpdsLoading = createSelector(
	[selectGetOpdsState],
	(state) => state.isLoading,
);

export const selectGetOpdsError = createSelector(
	[selectGetOpdsState],
	(state) => state.error,
);

export const selectOpds = createSelector(
	[selectGetOpdsState],
	(state) => state.data,
);

export const selectLastOpdState = createSelector(
	[selectOpdsState],
	(opdsState) => opdsState.lastOpd,
);

export const selectLastOpdLoading = createSelector(
	[selectLastOpdState],
	(state) => state.isLoading,
);

export const selectLastOpdError = createSelector(
	[selectLastOpdState],
	(state) => state.error,
);

export const selectLastOpd = createSelector(
	[selectLastOpdState],
	(state) => state.data,
);

export const selectSearchOpdsState = createSelector(
	[selectOpdsState],
	(opdsState) => opdsState.searchOpds,
);

export const selectSearchOpdsLoading = createSelector(
	[selectSearchOpdsState],
	(state) => state.isLoading,
);

export const selectSearchOpdsError = createSelector(
	[selectSearchOpdsState],
	(state) => state.error,
);

export const selectSearchOpds = createSelector(
	[selectSearchOpdsState],
	(state) => state.data,
);

export const selectCreateOpdState = createSelector(
	[selectOpdsState],
	(opdsState) => opdsState.createOpd,
);

export const selectCreateOpdLoading = createSelector(
	[selectCreateOpdState],
	(state) => state.isLoading,
);

export const selectCreateOpdError = createSelector(
	[selectCreateOpdState],
	(state) => state.error,
);

export const selectUpdateOpdState = createSelector(
	[selectOpdsState],
	(opdsState) => opdsState.updateOpd,
);

export const selectUpdateOpdLoading = createSelector(
	[selectUpdateOpdState],
	(state) => state.isLoading,
);

export const selectUpdateOpdError = createSelector(
	[selectUpdateOpdState],
	(state) => state.error,
);

export const selectDeleteOpdState = createSelector(
	[selectOpdsState],
	(opdsState) => opdsState.deleteOpd,
);

export const selectDeleteOpdLoading = createSelector(
	[selectDeleteOpdState],
	(state) => state.isLoading,
);

export const selectDeleteOpdError = createSelector(
	[selectDeleteOpdState],
	(state) => state.error,
);
