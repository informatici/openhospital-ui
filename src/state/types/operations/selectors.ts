import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectOperationTypesState = (state: IState) =>
	state.types.operations;

export const selectGetAllOperationTypesState = createSelector(
	[selectOperationTypesState],
	(operationTypesState) => operationTypesState.getAll,
);

export const selectGetAllOperationTypesLoading = createSelector(
	[selectGetAllOperationTypesState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllOperationTypesError = createSelector(
	[selectGetAllOperationTypesState],
	(getAllState) => getAllState.error,
);

export const selectOperationTypes = createSelector(
	[selectGetAllOperationTypesState],
	(getAllState) => getAllState.data,
);

export const selectCreateOperationTypeState = createSelector(
	[selectOperationTypesState],
	(operationTypesState) => operationTypesState.create,
);

export const selectCreateOperationTypeLoading = createSelector(
	[selectCreateOperationTypeState],
	(createState) => createState.isLoading,
);

export const selectCreateOperationTypeError = createSelector(
	[selectCreateOperationTypeState],
	(createState) => createState.error,
);

export const selectUpdateOperationTypeState = createSelector(
	[selectOperationTypesState],
	(operationTypesState) => operationTypesState.update,
);

export const selectUpdateOperationTypeLoading = createSelector(
	[selectUpdateOperationTypeState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateOperationTypeError = createSelector(
	[selectUpdateOperationTypeState],
	(updateState) => updateState.error,
);

export const selectDeleteOperationTypeState = createSelector(
	[selectOperationTypesState],
	(operationTypesState) => operationTypesState.delete,
);

export const selectDeleteOperationTypeLoading = createSelector(
	[selectDeleteOperationTypeState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteOperationTypeError = createSelector(
	[selectDeleteOperationTypeState],
	(deleteState) => deleteState.error,
);
