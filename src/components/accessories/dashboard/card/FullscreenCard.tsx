import { Dialog, Fab } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import type { FC } from 'react';
import { useAppSelector } from '~/libraries/hooks/redux';
import { DashboardWidget } from '../layouts/item/GridLayoutItem';
import type { TFullscreenCardProps } from './types';

export const FullscreenCard: FC<TFullscreenCardProps> = ({
	dashboard,
	onClose,
}) => {
	const period = useAppSelector((state) => state.dashboard.period);

	return (
		<Dialog fullScreen open={dashboard !== undefined} onClose={onClose}>
			{dashboard && <DashboardWidget dashboard={dashboard} period={period} />}
			<Fab
				title="Exit fullscreen"
				aria-label="Exit fullscreen"
				style={{ position: 'absolute', top: 5, right: 5 }}
				onClick={onClose}
				color="primary"
			>
				<GridCloseIcon />
			</Fab>
		</Dialog>
	);
};
