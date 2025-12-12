import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';

import { PATHS } from '../../../../../consts';
import type { UserDTO } from '../../../../../generated';
import { getUserGroups } from '../../../../../state/usergroups';
import {
	getUserById,
	getUserByIdReset,
	updateUser,
	updateUserReset,
} from '../../../../../state/users';
import { EditUserForm } from './EditUserForm';

export const EditUser = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const [user, setUser] = useState<UserDTO | null>();
	const [userNotFound, setUserNotFound] = useState<boolean>(false);
	const { isLoading, hasSucceeded, hasFailed, error } = useAppSelector(
		(state) => state.users.update,
	);
	const getUser = useAppSelector((state) => state.users.getById);
	const groups = useAppSelector((state) => state.usergroups.groupList);

	useEffect(() => {
		dispatch(getUserById(id ?? ''));
		dispatch(getUserGroups());
		return () => {
			dispatch(updateUserReset());
			dispatch(getUserByIdReset());
		};
	}, [dispatch, id]);

	useEffect(() => {
		if (getUser.hasSucceeded) {
			if (getUser.data) setUser(getUser.data);
			else setUserNotFound(true);
		}
	}, [getUser.hasSucceeded, getUser.data]);

	const handleUpdate = (user: UserDTO) => {
		dispatch(updateUser(user));
	};

	if (userNotFound) return <Navigate to={PATHS.admin_users} />;

	if (
		getUser.isLoading ||
		groups.isLoading ||
		!getUser ||
		!user ||
		!groups.data
	) {
		return (
			<CircularProgress style={{ marginLeft: '50%', position: 'relative' }} />
		);
	}
	if (!user) {
		console.log('user not found');
	}

	return (
		<EditUserForm
			groups={groups.data?.filter((group) => !group.deleted)}
			initialValues={user}
			onSubmit={handleUpdate}
			isLoading={isLoading}
			hasSucceeded={hasSucceeded}
			hasFailed={hasFailed}
			error={error}
		/>
	);
};
