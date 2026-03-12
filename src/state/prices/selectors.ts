import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectPricesState = (state: IState) => state.prices;

export const selectGetPricesState = createSelector(
	[selectPricesState],
	(pricesState) => pricesState.getPrices,
);

export const selectGetPricesLoading = createSelector(
	[selectGetPricesState],
	(state) => state.isLoading,
);

export const selectGetPricesError = createSelector(
	[selectGetPricesState],
	(state) => state.error,
);

export const selectPrices = createSelector(
	[selectGetPricesState],
	(state) => state.data,
);

export const selectGetPriceListsState = createSelector(
	[selectPricesState],
	(pricesState) => pricesState.getPriceLists,
);

export const selectGetPriceListsLoading = createSelector(
	[selectGetPriceListsState],
	(state) => state.isLoading,
);

export const selectGetPriceListsError = createSelector(
	[selectGetPriceListsState],
	(state) => state.error,
);

export const selectPriceLists = createSelector(
	[selectGetPriceListsState],
	(state) => state.data,
);

export const selectCreatePriceListState = createSelector(
	[selectPricesState],
	(pricesState) => pricesState.createPriceList,
);

export const selectCreatePriceListLoading = createSelector(
	[selectCreatePriceListState],
	(state) => state.isLoading,
);

export const selectCreatePriceListError = createSelector(
	[selectCreatePriceListState],
	(state) => state.error,
);

export const selectUpdatePriceListState = createSelector(
	[selectPricesState],
	(pricesState) => pricesState.updatePriceList,
);

export const selectUpdatePriceListLoading = createSelector(
	[selectUpdatePriceListState],
	(state) => state.isLoading,
);

export const selectUpdatePriceListError = createSelector(
	[selectUpdatePriceListState],
	(state) => state.error,
);

export const selectDeletePriceListState = createSelector(
	[selectPricesState],
	(pricesState) => pricesState.deletePriceList,
);

export const selectDeletePriceListLoading = createSelector(
	[selectDeletePriceListState],
	(state) => state.isLoading,
);

export const selectDeletePriceListError = createSelector(
	[selectDeletePriceListState],
	(state) => state.error,
);
