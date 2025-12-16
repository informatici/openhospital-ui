import {
	CheckCircleRounded,
	HighlightOffRounded,
	InfoRounded,
	NewReleasesRounded,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { type FunctionComponent, useMemo } from 'react';
import { makeStyles } from './consts';
import type { IProps } from './types';

export const AlertBox: FunctionComponent<IProps> = ({
	type,
	message,
	title,
}) => {
	const classes = useMemo(() => makeStyles(type), [type]);

	return (
		<Box sx={classes.root}>
			<Box sx={classes.icon}>
				{type === 'warning' && <NewReleasesRounded />}
				{type === 'info' && <InfoRounded />}
				{type === 'error' && <HighlightOffRounded />}
				{type === 'success' && <CheckCircleRounded />}
			</Box>
			<Box sx={classes.main}>
				{title && <Box sx={classes.title}>{title}</Box>}
				<Box sx={classes.content}>{message}</Box>
			</Box>
		</Box>
	);
};
