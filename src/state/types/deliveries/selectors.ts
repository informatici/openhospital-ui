import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectDeliveryTypesState = (state: IState) =>
	state.types.deliveries;

export const selectGetAllDeliveryTypesState = createSelector(
	[selectDeliveryTypesState],
	(deliveryTypesState) => deliveryTypesState.getAll,
);

export const selectGetAllDeliveryTypesLoading = createSelector(
	[selectGetAllDeliveryTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllDeliveryTypesError = createSelector(
	[selectGetAllDeliveryTypesState],
	(getAllState) => getAllState.error,
);

export const selectDeliveryTypes = createSelector(
	[selectGetAllDeliveryTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateDeliveryTypeState = createSelector(
	[selectDeliveryTypesState],
	(deliveryTypesState) => deliveryTypesState.create,
);

export const selectCreateDeliveryTypeLoading = createSelector(
	[selectCreateDeliveryTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateDeliveryTypeError = createSelector(
	[selectCreateDeliveryTypeState],
	(createState) => createState.error,
);

export const selectUpdateDeliveryTypeState = createSelector(
	[selectDeliveryTypesState],
	(deliveryTypesState) => deliveryTypesState.update,
);

export const selectUpdateDeliveryTypeLoading = createSelector(
	[selectUpdateDeliveryTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateDeliveryTypeError = createSelector(
	[selectUpdateDeliveryTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteDeliveryTypeState = createSelector(
	[selectDeliveryTypesState],
	(deliveryTypesState) => deliveryTypesState.delete,
);

export const selectDeleteDeliveryTypeLoading = createSelector(
	[selectDeleteDeliveryTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteDeliveryTypeError = createSelector(
	[selectDeleteDeliveryTypeState],
	(deleteState) => deleteState.error,
);
