import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectSuppliersState = (state: IState) => state.suppliers;

export const selectSupplierListState = createSelector(
	[selectSuppliersState],
	(suppliersState) => suppliersState.supplierList,
);

export const selectSupplierListLoading = createSelector(
	[selectSupplierListState],
	(state) => state.isLoading,
);

export const selectSupplierListError = createSelector(
	[selectSupplierListState],
	(state) => state.error,
);

export const selectSupplierList = createSelector(
	[selectSupplierListState],
	(state) => state.data,
);

export const selectCreateState = createSelector(
	[selectSuppliersState],
	(suppliersState) => suppliersState.create,
);

export const selectCreateLoading = createSelector(
	[selectCreateState],
	(state) => state.isLoading,
);

export const selectCreateError = createSelector(
	[selectCreateState],
	(state) => state.error,
);

export const selectUpdateState = createSelector(
	[selectSuppliersState],
	(suppliersState) => suppliersState.update,
);

export const selectUpdateLoading = createSelector(
	[selectUpdateState],
	(state) => state.isLoading,
);

export const selectUpdateError = createSelector(
	[selectUpdateState],
	(state) => state.error,
);

export const selectDeleteState = createSelector(
	[selectSuppliersState],
	(suppliersState) => suppliersState.delete,
);

export const selectDeleteLoading = createSelector(
	[selectDeleteState],
	(state) => state.isLoading,
);

export const selectDeleteError = createSelector(
	[selectDeleteState],
	(state) => state.error,
);
