import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectDiseasesState = (state: IState) => state.types.diseases;

export const selectCreateDiseaseState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.create,
);

export const selectUpdateDiseaseState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.update,
);

export const selectCreateDiseaseLoading = createSelector(
	[selectCreateDiseaseState],
	(createState) => createState.isLoading,
);

export const selectCreateDiseaseError = createSelector(
	[selectCreateDiseaseState],
	(createState) => createState.error,
);

export const selectUpdateDiseaseLoading = createSelector(
	[selectUpdateDiseaseState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateDiseaseError = createSelector(
	[selectUpdateDiseaseState],
	(updateState) => updateState.error,
);

export const selectGetAllDiseaseState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.getAll,
);

export const selectGetAllDiseaseLoading = createSelector(
	[selectGetAllDiseaseState],
	(getAllState) => getAllState.isLoading,
);

export const selectGetAllDiseaseError = createSelector(
	[selectGetAllDiseaseState],
	(getAllState) => getAllState.error,
);

export const selectDiseases = createSelector(
	[selectGetAllDiseaseState],
	(getAllState) => getAllState.data,
);

export const selectDeleteDiseaseState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.delete,
);

export const selectDeleteDiseaseLoading = createSelector(
	[selectDeleteDiseaseState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteDiseaseError = createSelector(
	[selectDeleteDiseaseState],
	(deleteState) => deleteState.error,
);
