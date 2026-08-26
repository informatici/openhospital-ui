import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectMedicalsState = (state: IState) => state.medicals;

export const selectMedicalsOrderByNameState = createSelector(
	[selectMedicalsState],
	(medicalsState) => medicalsState.medicalsOrderByName,
);

export const selectMedicalsOrderByNameLoading = createSelector(
	[selectMedicalsOrderByNameState],
	(state) => state.isLoading,
);

export const selectMedicalsOrderByNameError = createSelector(
	[selectMedicalsOrderByNameState],
	(state) => state.error,
);

export const selectMedicalsOrderByName = createSelector(
	[selectMedicalsOrderByNameState],
	(state) => state.data,
);

export const selectCreateState = createSelector(
	[selectMedicalsState],
	(medicalsState) => medicalsState.create,
);

export const selectCreateLoading = createSelector(
	[selectCreateState],
	(state) => state.isLoading,
);

export const selectCreateError = createSelector(
	[selectCreateState],
	(state) => state.error,
);

export const selectUpdateState = createSelector(
	[selectMedicalsState],
	(medicalsState) => medicalsState.update,
);

export const selectUpdateLoading = createSelector(
	[selectUpdateState],
	(state) => state.isLoading,
);

export const selectUpdateError = createSelector(
	[selectUpdateState],
	(state) => state.error,
);

export const selectDeleteState = createSelector(
	[selectMedicalsState],
	(medicalsState) => medicalsState.delete,
);

export const selectDeleteLoading = createSelector(
	[selectDeleteState],
	(state) => state.isLoading,
);

export const selectDeleteError = createSelector(
	[selectDeleteState],
	(state) => state.error,
);
