import type { ReactNode } from 'react';
import { Permission } from '~/libraries/permissionUtils/Permission';
import classes from './AdminActivityContent.module.scss';

interface IOwnProps {
	title: ReactNode;
	children: ReactNode;
}

export const AdminActivityContent = ({ title, children }: IOwnProps) => {
	return (
		<div className={classes.content}>
			<div className={classes.header}>
				<h2 data-cy="activity-title">{title}</h2>
			</div>
			<Permission require="admin.access">{children}</Permission>
		</div>
	);
};
