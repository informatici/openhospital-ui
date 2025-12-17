import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectPermissionsState = (state: IState) => state.permissions;

export const selectGetAllState = createSelector(
	[selectPermissionsState],
	(permissionsState) => permissionsState.getAll,
);

export const selectGetAllLoading = createSelector(
	[selectGetAllState],
	(state) => state.isLoading,
);

export const selectGetAllError = createSelector(
	[selectGetAllState],
	(state) => state.error,
);

export const selectPermissions = createSelector(
	[selectGetAllState],
	(state) => state.data,
);
