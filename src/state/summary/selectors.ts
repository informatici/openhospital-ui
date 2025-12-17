import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectSummaryState = (state: IState) => state.summary;

export const selectSummaryApisCallState = createSelector(
	[selectSummaryState],
	(summaryState) => summaryState.summaryApisCall,
);

export const selectSummaryApisCallLoading = createSelector(
	[selectSummaryApisCallState],
	(state) => state.isLoading,
);

export const selectSummaryApisCallError = createSelector(
	[selectSummaryApisCallState],
	(state) => state.error,
);

export const selectSummaryApisCall = createSelector(
	[selectSummaryApisCallState],
	(state) => state.data,
);
