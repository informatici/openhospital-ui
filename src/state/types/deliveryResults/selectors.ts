import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectDeliveryResultTypesState = (state: IState) =>
	state.types.deliveryResult;

export const selectGetAllDeliveryResultTypesState = createSelector(
	[selectDeliveryResultTypesState],
	(deliveryResultTypesState) => deliveryResultTypesState.getAll,
);

export const selectGetAllDeliveryResultTypesLoading = createSelector(
	[selectGetAllDeliveryResultTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllDeliveryResultTypesError = createSelector(
	[selectGetAllDeliveryResultTypesState],
	(getAllState) => getAllState.error,
);

export const selectDeliveryResultTypes = createSelector(
	[selectGetAllDeliveryResultTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateDeliveryResultTypeState = createSelector(
	[selectDeliveryResultTypesState],
	(deliveryResultTypesState) => deliveryResultTypesState.create,
);

export const selectCreateDeliveryResultTypeLoading = createSelector(
	[selectCreateDeliveryResultTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateDeliveryResultTypeError = createSelector(
	[selectCreateDeliveryResultTypeState],
	(createState) => createState.error,
);

export const selectUpdateDeliveryResultTypeState = createSelector(
	[selectDeliveryResultTypesState],
	(deliveryResultTypesState) => deliveryResultTypesState.update,
);

export const selectUpdateDeliveryResultTypeLoading = createSelector(
	[selectUpdateDeliveryResultTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateDeliveryResultTypeError = createSelector(
	[selectUpdateDeliveryResultTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteDeliveryResultTypeState = createSelector(
	[selectDeliveryResultTypesState],
	(deliveryResultTypesState) => deliveryResultTypesState.delete,
);

export const selectDeleteDeliveryResultTypeLoading = createSelector(
	[selectDeleteDeliveryResultTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteDeliveryResultTypeError = createSelector(
	[selectDeleteDeliveryResultTypeState],
	(deleteState) => deleteState.error,
);
