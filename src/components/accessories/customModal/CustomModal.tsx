import { Box, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { GridCloseIcon } from '@mui/x-data-grid';
import type { FC } from 'react';
import './styles.scss';
import type { ICustomModal } from './types';

export const CustomModal: FC<ICustomModal> = ({
	title,
	description,
	content,
	open,
	onClose,
}) => {
	return (
		<Modal
			aria-labelledby={title}
			aria-describedby={description}
			open={open}
			onClose={onClose}
			slotProps={{ backdrop: { timeout: 200 } }}
		>
			<Box
				sx={(theme) => ({
					position: 'absolute',
					backgroundColor: theme.palette.background.paper,
					boxShadow: theme.shadows[5],
				})}
				className="custom__modal"
			>
				<DialogTitle>
					<Box display="flex" alignItems="center">
						<Box flexGrow={1}>
							<strong>{title}</strong>
							<hr />
						</Box>
						<Box>
							<IconButton onClick={onClose}>
								<GridCloseIcon />
							</IconButton>
						</Box>
					</Box>
				</DialogTitle>
				<DialogContent>{content}</DialogContent>
			</Box>
		</Modal>
	);
};
