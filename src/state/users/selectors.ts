import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectUsersState = (state: IState) => state.users;

export const selectUserListState = createSelector(
	[selectUsersState],
	(usersState) => usersState.userList,
);

export const selectUserListLoading = createSelector(
	[selectUserListState],
	(state) => state.isLoading,
);

export const selectUserListError = createSelector(
	[selectUserListState],
	(state) => state.error,
);

export const selectUserList = createSelector(
	[selectUserListState],
	(state) => state.data,
);

export const selectGetByIdState = createSelector(
	[selectUsersState],
	(usersState) => usersState.getById,
);

export const selectGetByIdLoading = createSelector(
	[selectGetByIdState],
	(state) => state.isLoading,
);

export const selectGetByIdError = createSelector(
	[selectGetByIdState],
	(state) => state.error,
);

export const selectUserById = createSelector(
	[selectGetByIdState],
	(state) => state.data,
);

export const selectCreateState = createSelector(
	[selectUsersState],
	(usersState) => usersState.create,
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
	[selectUsersState],
	(usersState) => usersState.update,
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
	[selectUsersState],
	(usersState) => usersState.delete,
);

export const selectDeleteLoading = createSelector(
	[selectDeleteState],
	(state) => state.isLoading,
);

export const selectDeleteError = createSelector(
	[selectDeleteState],
	(state) => state.error,
);
