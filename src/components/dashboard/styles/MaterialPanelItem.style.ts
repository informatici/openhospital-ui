import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  	createStyles({
  		materialsListItem: {
			borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
			"&:hover": {
				backgroundColor: "#F9F9F9",
			},
			padding: "50px 30px",
		},
		materialsListItemTitleContainer: {
			display: "flex",
			alignItems: "center",
			paddingBottom: "10px !important",
		},
		materialsListItemTitle: {
			fontSize: 18,
			letterSpacing: 1,
			fontWeight: "bold",
			padding: 5,
		},
		materialsListItemTitleWarning: {
			padding: 5,
			fontSize: 12,
			letterSpacing: 0.3,
			color: theme.palette.primary.red,
		},
		materialsListItemBigNumber: {
			fontSize: 48,
			letterSpacing: 1,
			fontWeight: "bold",
			padding: 5,
		},
		materialsListItemBigNumberDesc: {
			fontSize: 14,
			letterSpacing: 0.26,
			color: theme.palette.primary.grey,
		},
		textDark: {
			color: theme.palette.primary.text,
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
  	});

export default styles;