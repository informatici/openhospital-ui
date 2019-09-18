import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
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
	});

export default styles;