import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectWardState = (state: IState) => state.wards;

export const selectAllWardsState = createSelector(
	[selectWardState],
	(wardState) => wardState.allWards,
);

export const selectAllWardsLoading = createSelector(
	[selectAllWardsState],
	(allState) => allState.isLoading,
);

export const selectAllWardsError = createSelector(
	[selectAllWardsState],
	(allState) => allState.error,
);

export const selectAllWards = createSelector(
	[selectAllWardsState],
	(allState) => allState.data,
);

export const selectCreateWardState = createSelector(
	[selectWardState],
	(wardState) => wardState.create,
);

export const selectCreateWardLoading = createSelector(
	[selectCreateWardState],
	(createState) => createState.isLoading,
);

export const selectCreateWardError = createSelector(
	[selectCreateWardState],
	(createState) => createState.error,
);

export const selectUpdateWardState = createSelector(
	[selectWardState],
	(wardState) => wardState.update,
);

export const selectUpdateWardLoading = createSelector(
	[selectUpdateWardState],
	(updateState) => updateState.isLoading,
);

export const selectUpdateWardError = createSelector(
	[selectUpdateWardState],
	(updateState) => updateState.error,
);

export const selectDeleteWardState = createSelector(
	[selectWardState],
	(wardState) => wardState.delete,
);

export const selectDeleteWardLoading = createSelector(
	[selectDeleteWardState],
	(deleteState) => deleteState.isLoading,
);

export const selectDeleteWardError = createSelector(
	[selectDeleteWardState],
	(deleteState) => deleteState.error,
);
