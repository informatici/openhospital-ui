import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectLayoutsState = (state: IState) => state.layouts;

export const selectSaveLayoutsState = createSelector(
	[selectLayoutsState],
	(layoutsState) => layoutsState.saveLayouts,
);

export const selectSaveLayoutsLoading = createSelector(
	[selectSaveLayoutsState],
	(state) => state.isLoading,
);

export const selectSaveLayoutsError = createSelector(
	[selectSaveLayoutsState],
	(state) => state.error,
);

export const selectGetLayoutsState = createSelector(
	[selectLayoutsState],
	(layoutsState) => layoutsState.getLayouts,
);

export const selectGetLayoutsLoading = createSelector(
	[selectGetLayoutsState],
	(state) => state.isLoading,
);

export const selectGetLayoutsError = createSelector(
	[selectGetLayoutsState],
	(state) => state.error,
);

export const selectLayoutsData = createSelector(
	[selectGetLayoutsState],
	(state) => state.data,
);

export const selectResetLayoutsState = createSelector(
	[selectLayoutsState],
	(layoutsState) => layoutsState.resetLayouts,
);

export const selectResetLayoutsLoading = createSelector(
	[selectResetLayoutsState],
	(state) => state.isLoading,
);

export const selectResetLayoutsError = createSelector(
	[selectResetLayoutsState],
	(state) => state.error,
);

export const selectBreakpoint = createSelector(
	[selectLayoutsState],
	(layoutsState) => layoutsState.breakpoint,
);

export const selectLayouts = createSelector(
	[selectLayoutsState],
	(layoutsState) => layoutsState.layouts,
);

export const selectToolbox = createSelector(
	[selectLayoutsState],
	(layoutsState) => layoutsState.toolbox,
);
