import type { ReactNode } from 'react';
import { withPermission } from '~/libraries/permissionUtils/withPermission';
import PermissionDenied from '../../PermissionDenied/PermissionDenied';
import classes from './AdminActivityContent.module.scss';

interface IOwnProps {
	title: ReactNode;
	children: ReactNode;
}

export const AdminActivityContent = ({ title, children }: IOwnProps) => {
	const RequiredAdminAccess = withPermission(
		'admin.access',
		PermissionDenied,
	)(() => (
		<div className={classes.content}>
			<div className={classes.header}>
				<h2 data-cy="activity-title">{title}</h2>
			</div>
			{children}
		</div>
	));
	return <RequiredAdminAccess />;
};
