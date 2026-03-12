import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectOperationsState = (state: IState) => state.operations;

export const selectOperationListState = createSelector(
	[selectOperationsState],
	(operationsState) => operationsState.operationList,
);

export const selectOperationListLoading = createSelector(
	[selectOperationListState],
	(state) => state.isLoading,
);

export const selectOperationListError = createSelector(
	[selectOperationListState],
	(state) => state.error,
);

export const selectOperationList = createSelector(
	[selectOperationListState],
	(state) => state.data,
);

export const selectCreateOperationRowState = createSelector(
	[selectOperationsState],
	(operationsState) => operationsState.createOperationRow,
);

export const selectCreateOperationRowLoading = createSelector(
	[selectCreateOperationRowState],
	(state) => state.isLoading,
);

export const selectCreateOperationRowError = createSelector(
	[selectCreateOperationRowState],
	(state) => state.error,
);

export const selectUpdateOperationRowState = createSelector(
	[selectOperationsState],
	(operationsState) => operationsState.updateOperationRow,
);

export const selectUpdateOperationRowLoading = createSelector(
	[selectUpdateOperationRowState],
	(state) => state.isLoading,
);

export const selectUpdateOperationRowError = createSelector(
	[selectUpdateOperationRowState],
	(state) => state.error,
);

export const selectDeleteOperationRowState = createSelector(
	[selectOperationsState],
	(operationsState) => operationsState.deleteOperationRow,
);

export const selectDeleteOperationRowLoading = createSelector(
	[selectDeleteOperationRowState],
	(state) => state.isLoading,
);

export const selectDeleteOperationRowError = createSelector(
	[selectDeleteOperationRowState],
	(state) => state.error,
);

export const selectOperationRowsByQdmtState = createSelector(
	[selectOperationsState],
	(operationsState) => operationsState.operationRowsByQdmt,
);

export const selectOperationRowsByQdmtLoading = createSelector(
	[selectOperationRowsByQdmtState],
	(state) => state.isLoading,
);

export const selectOperationRowsByQdmtError = createSelector(
	[selectOperationRowsByQdmtState],
	(state) => state.error,
);

export const selectOperationRowsByQdmt = createSelector(
	[selectOperationRowsByQdmtState],
	(state) => state.data,
);

export const selectCreateState = createSelector(
	[selectOperationsState],
	(operationsState) => operationsState.create,
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
	[selectOperationsState],
	(operationsState) => operationsState.update,
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
	[selectOperationsState],
	(operationsState) => operationsState.delete,
);

export const selectDeleteLoading = createSelector(
	[selectDeleteState],
	(state) => state.isLoading,
);

export const selectDeleteError = createSelector(
	[selectDeleteState],
	(state) => state.error,
);
