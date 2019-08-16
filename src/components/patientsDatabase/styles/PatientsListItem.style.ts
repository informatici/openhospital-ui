import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			// padding: theme.spacing.unit * 2,
			textAlign: 'center',
			// color: theme.palette.text.secondary,
			borderRadius: 10,
			padding: 0,
			background: theme.palette.primary.main,
			boxShadow: '0 4px 8px 0 rgba(48,49,51,0.1)',
		},
		cardAction: {
			borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
			'&:hover $avatar': {
			border: `4px solid ${theme.palette.primary.red}`,
			}
		},
		patientContainer: {
			paddingTop: 20,
			paddingBottom: 20,
			'& $infoContainer': {
				padding: '5pxd 12px',
				textAlign: 'left'
			}
		},
		patientName: {
			fontSize: 18,
			letterSpacing: 1,
			fontWeight: 'bold',
			padding: '10px 0',
		},
		infoContainer: {

		},
		avatar: {
			height: 104,
			width: 104,
			margin: '0 auto',
			border: '4px solid #e6e6e6',
			'&.avatarSmall': {
				height: 57,
				width: 57,
				margin: 0,
			},
		},
		iconAndText: {
			display: 'flex',
			alignItems: 'center',
			fontWeight: 'bold',
			padding: '5px 0'
		},
	});

export default styles;