import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectDiseasesState = (state: IState) => state.diseases;

export const selectAllDiseasesState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.allDiseases,
);

export const selectAllDiseasesLoading = createSelector(
	[selectAllDiseasesState],
	(allState) => allState.isLoading,
);

export const selectAllDiseasesError = createSelector(
	[selectAllDiseasesState],
	(allState) => allState.error,
);

export const selectAllDiseases = createSelector(
	[selectAllDiseasesState],
	(allState) => allState.data,
);

export const selectDiseasesOpdState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.diseasesOpd,
);

export const selectDiseasesOpdLoading = createSelector(
	[selectDiseasesOpdState],
	(opdState) => opdState.isLoading,
);

export const selectDiseasesOpdError = createSelector(
	[selectDiseasesOpdState],
	(opdState) => opdState.error,
);

export const selectDiseasesOpd = createSelector(
	[selectDiseasesOpdState],
	(opdState) => opdState.data,
);

export const selectDiseasesIpdInState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.diseasesIpdIn,
);

export const selectDiseasesIpdInLoading = createSelector(
	[selectDiseasesIpdInState],
	(ipdInState) => ipdInState.isLoading,
);

export const selectDiseasesIpdInError = createSelector(
	[selectDiseasesIpdInState],
	(ipdInState) => ipdInState.error,
);

export const selectDiseasesIpdIn = createSelector(
	[selectDiseasesIpdInState],
	(ipdInState) => ipdInState.data,
);

export const selectDiseasesIpdOutState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.diseasesIpdOut,
);

export const selectDiseasesIpdOutLoading = createSelector(
	[selectDiseasesIpdOutState],
	(ipdOutState) => ipdOutState.isLoading,
);

export const selectDiseasesIpdOutError = createSelector(
	[selectDiseasesIpdOutState],
	(ipdOutState) => ipdOutState.error,
);

export const selectDiseasesIpdOut = createSelector(
	[selectDiseasesIpdOutState],
	(ipdOutState) => ipdOutState.data,
);

export const selectCreateDiseaseState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.create,
);

export const selectCreateDiseaseLoading = createSelector(
	[selectCreateDiseaseState],
	(createState) => createState.isLoading,
);

export const selectCreateDiseaseError = createSelector(
	[selectCreateDiseaseState],
	(createState) => createState.error,
);

export const selectUpdateDiseaseState = createSelector(
	[selectDiseasesState],
	(diseasesState) => diseasesState.update,
);

export const selectUpdateDiseaseLoading = createSelector(
	[selectUpdateDiseaseState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateDiseaseError = createSelector(
	[selectUpdateDiseaseState],
	(updateState) => updateState.error,
);
