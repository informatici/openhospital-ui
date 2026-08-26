import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectAdmissionsState = (state: IState) => state.admissions;

export const selectCreateAdmissionState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.createAdmission,
);

export const selectCreateAdmissionLoading = createSelector(
	[selectCreateAdmissionState],
	(createState) => createState.isLoading,
);

export const selectCreateAdmissionError = createSelector(
	[selectCreateAdmissionState],
	(createState) => createState.error,
);

export const selectUpdateAdmissionState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.updateAdmission,
);

export const selectUpdateAdmissionLoading = createSelector(
	[selectUpdateAdmissionState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateAdmissionError = createSelector(
	[selectUpdateAdmissionState],
	(updateState) => updateState.error,
);

export const selectGetAdmissionsState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.getAdmissions,
);

export const selectGetAdmissionsLoading = createSelector(
	[selectGetAdmissionsState],
	(getState) => getState.isLoading,
);

export const selectGetAdmissionsError = createSelector(
	[selectGetAdmissionsState],
	(getState) => getState.error,
);

export const selectAdmissions = createSelector(
	[selectGetAdmissionsState],
	(getState) => getState.data,
);

export const selectGetDischargesState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.getDischarges,
);

export const selectGetDischargesLoading = createSelector(
	[selectGetDischargesState],
	(getState) => getState.isLoading,
);

export const selectGetDischargesError = createSelector(
	[selectGetDischargesState],
	(getState) => getState.error,
);

export const selectDischarges = createSelector(
	[selectGetDischargesState],
	(getState) => getState.data,
);

export const selectGetPatientAdmissionsState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.getPatientAdmissions,
);

export const selectGetPatientAdmissionsLoading = createSelector(
	[selectGetPatientAdmissionsState],
	(getState) => getState.isLoading,
);

export const selectGetPatientAdmissionsError = createSelector(
	[selectGetPatientAdmissionsState],
	(getState) => getState.error,
);

export const selectPatientAdmissions = createSelector(
	[selectGetPatientAdmissionsState],
	(getState) => getState.data,
);

export const selectGetAdmittedPatientsState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.getAdmittedPatients,
);

export const selectGetAdmittedPatientsLoading = createSelector(
	[selectGetAdmittedPatientsState],
	(getState) => getState.isLoading,
);

export const selectGetAdmittedPatientsError = createSelector(
	[selectGetAdmittedPatientsState],
	(getState) => getState.error,
);

export const selectAdmittedPatients = createSelector(
	[selectGetAdmittedPatientsState],
	(getState) => getState.data,
);

export const selectCurrentAdmissionByPatientIdState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.currentAdmissionByPatientId,
);

export const selectCurrentAdmissionByPatientIdLoading = createSelector(
	[selectCurrentAdmissionByPatientIdState],
	(getState) => getState.isLoading,
);

export const selectCurrentAdmissionByPatientIdError = createSelector(
	[selectCurrentAdmissionByPatientIdState],
	(getState) => getState.error,
);

export const selectCurrentAdmissionByPatientId = createSelector(
	[selectCurrentAdmissionByPatientIdState],
	(getState) => getState.data,
);

export const selectDischargePatientState = createSelector(
	[selectAdmissionsState],
	(admissionsState) => admissionsState.dischargePatient,
);

export const selectDischargePatientLoading = createSelector(
	[selectDischargePatientState],
	(dischargeState) => dischargeState.isLoading,
);

export const selectDischargePatientError = createSelector(
	[selectDischargePatientState],
	(dischargeState) => dischargeState.error,
);
