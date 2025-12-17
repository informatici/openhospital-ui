import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectUsergroupsState = (state: IState) => state.usergroups;

export const selectGroupListState = createSelector(
	[selectUsergroupsState],
	(usergroupsState) => usergroupsState.groupList,
);

export const selectGroupListLoading = createSelector(
	[selectGroupListState],
	(state) => state.isLoading,
);

export const selectGroupListError = createSelector(
	[selectGroupListState],
	(state) => state.error,
);

export const selectGroupList = createSelector(
	[selectGroupListState],
	(state) => state.data,
);

export const selectCurrentGroupState = createSelector(
	[selectUsergroupsState],
	(usergroupsState) => usergroupsState.currentGroup,
);

export const selectCurrentGroupLoading = createSelector(
	[selectCurrentGroupState],
	(state) => state.isLoading,
);

export const selectCurrentGroupError = createSelector(
	[selectCurrentGroupState],
	(state) => state.error,
);

export const selectCurrentGroup = createSelector(
	[selectCurrentGroupState],
	(state) => state.data,
);

export const selectCreateState = createSelector(
	[selectUsergroupsState],
	(usergroupsState) => usergroupsState.create,
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
	[selectUsergroupsState],
	(usergroupsState) => usergroupsState.update,
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
	[selectUsergroupsState],
	(usergroupsState) => usergroupsState.delete,
);

export const selectDeleteLoading = createSelector(
	[selectDeleteState],
	(state) => state.isLoading,
);

export const selectDeleteError = createSelector(
	[selectDeleteState],
	(state) => state.error,
);

export const selectSetPermissionState = createSelector(
	[selectUsergroupsState],
	(usergroupsState) => usergroupsState.setPermission,
);

export const selectSetPermissionLoading = createSelector(
	[selectSetPermissionState],
	(state) => state.isLoading,
);

export const selectSetPermissionError = createSelector(
	[selectSetPermissionState],
	(state) => state.error,
);
