import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		appointmentsListItem: {
			"&:hover": {
				backgroundColor: "#F9F9F9",
			},
		},
		appointmentsListItemGrid: {
			// padding: 0,
		},
		appointmentsListItemCheckbox: {
			// paddingRight: 0
		},
		materialsListItemTitleContainer: {
			display: "flex",
			alignItems: "center",
			paddingBottom: "10px !important",
		},
		materialsListItemBigNumberDesc: {
			fontSize: 14,
			letterSpacing: 0.26,
			color: theme.palette.primary.grey,
		},
	});

export default styles;