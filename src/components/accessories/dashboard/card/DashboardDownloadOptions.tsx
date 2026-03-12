import { MenuItem } from '@mui/material';
import React from 'react';
import type { TDashboardDownloadProps } from './types';

type TDashboardDownloadOptions = {
	actions: TDashboardDownloadProps[];
	onClose?: () => void;
};
export const DownloadOptions = React.forwardRef<
	HTMLDivElement,
	TDashboardDownloadOptions
>((props, _ref) => {
	const { actions, onClose } = props;

	return (
		<>
			{actions.map((action, index) => {
				return (
					<MenuItem key={`action-${index}`} onClick={onClose}>
						{action.action}
					</MenuItem>
				);
			})}
		</>
	);
});
