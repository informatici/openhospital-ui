import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectBillsState = (state: IState) => state.bills;

export const selectNewBillState = createSelector(
	[selectBillsState],
	(billsState) => billsState.newBill,
);

export const selectNewBillLoading = createSelector(
	[selectNewBillState],
	(newState) => newState.isLoading,
);

export const selectNewBillError = createSelector(
	[selectNewBillState],
	(newState) => newState.error,
);

export const selectUpdateBillState = createSelector(
	[selectBillsState],
	(billsState) => billsState.updateBill,
);

export const selectUpdateBillLoading = createSelector(
	[selectUpdateBillState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateBillError = createSelector(
	[selectUpdateBillState],
	(updateState) => updateState.error,
);

export const selectGetBillState = createSelector(
	[selectBillsState],
	(billsState) => billsState.getBill,
);

export const selectGetBillLoading = createSelector(
	[selectGetBillState],
	(getState) => getState.isLoading,
);

export const selectGetBillError = createSelector(
	[selectGetBillState],
	(getState) => getState.error,
);

export const selectBill = createSelector(
	[selectGetBillState],
	(getState) => getState.data,
);

export const selectSearchBillsState = createSelector(
	[selectBillsState],
	(billsState) => billsState.searchBills,
);

export const selectSearchBillsLoading = createSelector(
	[selectSearchBillsState],
	(searchState) => searchState.isLoading,
);

export const selectSearchBillsError = createSelector(
	[selectSearchBillsState],
	(searchState) => searchState.error,
);

export const selectBills = createSelector(
	[selectSearchBillsState],
	(searchState) => searchState.data,
);

export const selectGetPendingBillsState = createSelector(
	[selectBillsState],
	(billsState) => billsState.getPendingBills,
);

export const selectGetPendingBillsLoading = createSelector(
	[selectGetPendingBillsState],
	(getState) => getState.isLoading,
);

export const selectGetPendingBillsError = createSelector(
	[selectGetPendingBillsState],
	(getState) => getState.error,
);

export const selectPendingBills = createSelector(
	[selectGetPendingBillsState],
	(getState) => getState.data,
);

export const selectSearchPaymentsState = createSelector(
	[selectBillsState],
	(billsState) => billsState.searchPayments,
);

export const selectSearchPaymentsLoading = createSelector(
	[selectSearchPaymentsState],
	(searchState) => searchState.isLoading,
);

export const selectSearchPaymentsError = createSelector(
	[selectSearchPaymentsState],
	(searchState) => searchState.error,
);

export const selectPayments = createSelector(
	[selectSearchPaymentsState],
	(searchState) => searchState.data,
);

export const selectDeleteBillState = createSelector(
	[selectBillsState],
	(billsState) => billsState.delete,
);

export const selectDeleteBillLoading = createSelector(
	[selectDeleteBillState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteBillError = createSelector(
	[selectDeleteBillState],
	(deleteState) => deleteState.error,
);

export const selectPayBillState = createSelector(
	[selectBillsState],
	(billsState) => billsState.payBill,
);

export const selectPayBillLoading = createSelector(
	[selectPayBillState],
	(payState) => payState.isLoading,
);

export const selectPayBillError = createSelector(
	[selectPayBillState],
	(payState) => payState.error,
);

export const selectCloseBillState = createSelector(
	[selectBillsState],
	(billsState) => billsState.closeBill,
);

export const selectCloseBillLoading = createSelector(
	[selectCloseBillState],
	(closeState) => closeState.isLoading,
);

export const selectCloseBillError = createSelector(
	[selectCloseBillState],
	(closeState) => closeState.error,
);

export const selectGetBillsByYearState = createSelector(
	[selectBillsState],
	(billsState) => billsState.getBillsByYear,
);

export const selectGetBillsByYearLoading = createSelector(
	[selectGetBillsByYearState],
	(getState) => getState.isLoading,
);

export const selectGetBillsByYearError = createSelector(
	[selectGetBillsByYearState],
	(getState) => getState.error,
);

export const selectBillsByYear = createSelector(
	[selectGetBillsByYearState],
	(getState) => getState.data,
);
