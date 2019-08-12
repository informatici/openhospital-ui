import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		boxInfo: {
			display: "flex",
			paddingBottom: 10,
			paddingLeft: 20,
		},
		boxItem: {
			display: "flex",
			flex: 1,
			textAlign: "center",
			borderRadius: 0,
			boxShadow: "none",
			border: "1px solid ",
		},
		numberOf: {
			fontSize: 60,
			fontWeight: "bold",
			letterSpacing: 1,
		},
		object: {
			fontSize: 14,
			fontWeight: "bold",
			letterSpacing: 0.26,
		},
		subTitle: {
			fontSize: 10,
			fontWeight: "bold",
			letterSpacing: 0.2,
		},
		summaryButton: {
			textTransform: "none",
			fontSize: 10,
			fontWeight: "bold",
			borderRadius: 0,
			marginLeft: 0,
			background: theme.palette.primary.white,
		},
	});

export default styles;