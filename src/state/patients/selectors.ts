import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectPatientsState = (state: IState) => state.patients;

export const selectCreatePatientState = createSelector(
	[selectPatientsState],
	(patientsState) => patientsState.createPatient,
);

export const selectCreatePatientLoading = createSelector(
	[selectCreatePatientState],
	(state) => state.isLoading,
);

export const selectCreatePatientError = createSelector(
	[selectCreatePatientState],
	(state) => state.error,
);

export const selectSearchResultsState = createSelector(
	[selectPatientsState],
	(patientsState) => patientsState.searchResults,
);

export const selectSearchResultsLoading = createSelector(
	[selectSearchResultsState],
	(state) => state.isLoading,
);

export const selectSearchResultsError = createSelector(
	[selectSearchResultsState],
	(state) => state.error,
);

export const selectSearchResults = createSelector(
	[selectSearchResultsState],
	(state) => state.data,
);

export const selectSelectedPatientState = createSelector(
	[selectPatientsState],
	(patientsState) => patientsState.selectedPatient,
);

export const selectSelectedPatientLoading = createSelector(
	[selectSelectedPatientState],
	(state) => state.isLoading,
);

export const selectSelectedPatientError = createSelector(
	[selectSelectedPatientState],
	(state) => state.error,
);

export const selectSelectedPatient = createSelector(
	[selectSelectedPatientState],
	(state) => state.data,
);

export const selectUpdatePatientState = createSelector(
	[selectPatientsState],
	(patientsState) => patientsState.updatePatient,
);

export const selectUpdatePatientLoading = createSelector(
	[selectUpdatePatientState],
	(state) => state.isLoading,
);

export const selectUpdatePatientError = createSelector(
	[selectUpdatePatientState],
	(state) => state.error,
);

export const selectGetCitiesState = createSelector(
	[selectPatientsState],
	(patientsState) => patientsState.getCities,
);

export const selectGetCitiesLoading = createSelector(
	[selectGetCitiesState],
	(state) => state.isLoading,
);

export const selectGetCitiesError = createSelector(
	[selectGetCitiesState],
	(state) => state.error,
);

export const selectCities = createSelector(
	[selectGetCitiesState],
	(state) => state.data,
);

export const selectGetPatientsState = createSelector(
	[selectPatientsState],
	(patientsState) => patientsState.getPatients,
);

export const selectGetPatientsLoading = createSelector(
	[selectGetPatientsState],
	(state) => state.isLoading,
);

export const selectGetPatientsError = createSelector(
	[selectGetPatientsState],
	(state) => state.error,
);

export const selectPatients = createSelector(
	[selectGetPatientsState],
	(state) => state.data,
);
