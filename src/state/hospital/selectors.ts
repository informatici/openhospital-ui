import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectHospitalState = (state: IState) => state.hospital;

export const selectGetHospitalState = createSelector(
	[selectHospitalState],
	(hospitalState) => hospitalState.getHospital,
);

export const selectGetHospitalLoading = createSelector(
	[selectGetHospitalState],
	(state) => state.isLoading,
);

export const selectGetHospitalError = createSelector(
	[selectGetHospitalState],
	(state) => state.error,
);

export const selectHospital = createSelector(
	[selectGetHospitalState],
	(state) => state.data,
);

export const selectUpdateHospitalState = createSelector(
	[selectHospitalState],
	(hospitalState) => hospitalState.updateHospital,
);

export const selectUpdateHospitalLoading = createSelector(
	[selectUpdateHospitalState],
	(state) => state.isLoading,
);

export const selectUpdateHospitalError = createSelector(
	[selectUpdateHospitalState],
	(state) => state.error,
);
