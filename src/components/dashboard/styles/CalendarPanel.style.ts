import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		cardTitle: {
			paddingBottom: 30,
			fontSize: 16,
			letterSpacing: 1,
		},
		paperCalendar: {
			// padding: theme.spacing.unit * 2,
			textAlign: "center",
			// color: theme.palette.text.secondary,
			borderRadius: 10,
			background: theme.palette.primary.main,
			boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
		},
		calendar: {
			// padding: theme.spacing.unit * 2,
			padding: 20,
		},
		detailButtonContainer: {
			display: "flex",
			alignItems: "flex-end",
		},
		detailButton: {
			textTransform: "none",
			color: theme.palette.primary.red,
			borderRadius: 20,
			fontWeight: "bold",
			"&:hover": {
				color: theme.palette.primary.white,
				background: theme.palette.primary.red,
			},
		},
		detailButtonLabel: {
			justifyContent: "flex-end",
		},
		appointments: {
			// padding: 0,
		},
		summary: {},
    	summaryItem: {},
	});

export default styles;