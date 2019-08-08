import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  	createStyles({
		cardTitle: {
			paddingBottom: 30,
			fontSize: 16,
			letterSpacing: 1,
		},
		paper: {
			padding: theme.spacing.unit * 2,
			textAlign: "center",
			borderRadius: 10,
			background: theme.palette.primary.main,
			boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
	    },
	    cardMaterials: {
			padding: 0,
		},
		tabs: {
			boxShadow: " 0 4px 8px 0 rgba(48,49,51,0.1)",
		},
		tab: {
			textTransform: "none",
			fontSize: 14,
			fontWeight: 600,
			letterSpacing: 0.26,
			padding: 16,
		},
		tabRadiusSx: {
			borderRadius: "10px 0 0 0",
		},
		tabSelected: {
			color: theme.palette.primary.red,
		},
		materialsList: {
			padding: 0,
		},
		allMaterialsButton: {
			justifyContent: "center",
			color: theme.palette.primary.red,
			borderRadius: "0 0 10px 10px",
			padding: "30px 0",
			fontSize: 16,
			letterSpacing: 1,
			"&:hover": {
				color: theme.palette.primary.white,
				background: theme.palette.primary.red,
			},
		},
  	});

export default styles;
