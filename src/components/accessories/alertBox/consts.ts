import type { SxProps, Theme } from '@mui/material';

export const makeStyles = (type: 'error' | 'warning' | 'info' | 'success') => ({
	root: (theme: Theme) => ({
		display: 'flex',
		border: `0.5px solid ${theme.palette[type].main}`,
		borderLeft: `8px solid ${theme.palette[type].main}`,
		borderRadius: 1,
		margin: '20px 0px',
		boxShadow: `0 1px 2px 0px black`,
		padding: '16px',
		columnGap: 8,
	}),
	main: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	title: ((theme: Theme) => ({
		...theme.typography.h6,
		color: theme.palette[type].main,
	})) as SxProps,
	content: ((theme: Theme) => ({
		flexGrow: 1,
		...theme.typography.caption,
	})) as SxProps,
	icon: (theme: Theme) => ({
		color: theme.palette[type].main,
		display: 'flex',
		alignItems: 'center',
		padding: 8,
		height: "'100%'",
	}),
});
