import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectLaboratoriesState = (state: IState) => state.laboratories;

export const selectCreateLabState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.createLab,
);

export const selectCreateLabLoading = createSelector(
	[selectCreateLabState],
	(state) => state.isLoading,
);

export const selectCreateLabError = createSelector(
	[selectCreateLabState],
	(state) => state.error,
);

export const selectCreateLabRequestState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.createLabRequest,
);

export const selectCreateLabRequestLoading = createSelector(
	[selectCreateLabRequestState],
	(state) => state.isLoading,
);

export const selectCreateLabRequestError = createSelector(
	[selectCreateLabRequestState],
	(state) => state.error,
);

export const selectUpdateLabState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.updateLab,
);

export const selectUpdateLabLoading = createSelector(
	[selectUpdateLabState],
	(state) => state.isLoading,
);

export const selectUpdateLabError = createSelector(
	[selectUpdateLabState],
	(state) => state.error,
);

export const selectDeleteLabState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.deleteLab,
);

export const selectDeleteLabLoading = createSelector(
	[selectDeleteLabState],
	(state) => state.isLoading,
);

export const selectDeleteLabError = createSelector(
	[selectDeleteLabState],
	(state) => state.error,
);

export const selectCancelLabState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.cancelLab,
);

export const selectCancelLabLoading = createSelector(
	[selectCancelLabState],
	(state) => state.isLoading,
);

export const selectCancelLabError = createSelector(
	[selectCancelLabState],
	(state) => state.error,
);

export const selectMaterialsState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.materials,
);

export const selectMaterialsLoading = createSelector(
	[selectMaterialsState],
	(state) => state.isLoading,
);

export const selectMaterialsError = createSelector(
	[selectMaterialsState],
	(state) => state.error,
);

export const selectMaterials = createSelector(
	[selectMaterialsState],
	(state) => state.data,
);

export const selectLabsByPatientIdState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.labsByPatientId,
);

export const selectLabsByPatientIdLoading = createSelector(
	[selectLabsByPatientIdState],
	(state) => state.isLoading,
);

export const selectLabsByPatientIdError = createSelector(
	[selectLabsByPatientIdState],
	(state) => state.error,
);

export const selectLabsByPatientId = createSelector(
	[selectLabsByPatientIdState],
	(state) => state.data,
);

export const selectLabsRequestByPatientIdState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.labsRequestByPatientId,
);

export const selectLabsRequestByPatientIdLoading = createSelector(
	[selectLabsRequestByPatientIdState],
	(state) => state.isLoading,
);

export const selectLabsRequestByPatientIdError = createSelector(
	[selectLabsRequestByPatientIdState],
	(state) => state.error,
);

export const selectLabsRequestByPatientId = createSelector(
	[selectLabsRequestByPatientIdState],
	(state) => state.data,
);

export const selectGetLabByCodeState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.getLabByCode,
);

export const selectGetLabByCodeLoading = createSelector(
	[selectGetLabByCodeState],
	(state) => state.isLoading,
);

export const selectGetLabByCodeError = createSelector(
	[selectGetLabByCodeState],
	(state) => state.error,
);

export const selectLabByCode = createSelector(
	[selectGetLabByCodeState],
	(state) => state.data,
);

export const selectGetLabWithRowsByCodeState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.getLabWithRowsByCode,
);

export const selectGetLabWithRowsByCodeLoading = createSelector(
	[selectGetLabWithRowsByCodeState],
	(state) => state.isLoading,
);

export const selectGetLabWithRowsByCodeError = createSelector(
	[selectGetLabWithRowsByCodeState],
	(state) => state.error,
);

export const selectLabWithRowsByCode = createSelector(
	[selectGetLabWithRowsByCodeState],
	(state) => state.data,
);

export const selectSearchLabsState = createSelector(
	[selectLaboratoriesState],
	(laboratoriesState) => laboratoriesState.searchLabs,
);

export const selectSearchLabsLoading = createSelector(
	[selectSearchLabsState],
	(state) => state.isLoading,
);

export const selectSearchLabsError = createSelector(
	[selectSearchLabsState],
	(state) => state.error,
);

export const selectSearchLabs = createSelector(
	[selectSearchLabsState],
	(state) => state.data,
);
