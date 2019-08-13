import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		sidebar: {
			backgroundColor: theme.palette.primary.darkGrey,
			color: theme.palette.primary.white,
			padding: "40px 30px !important",
		},
		avatar: {
			height: 200,
			width: 200,
			margin: "0 auto",
			border: "4px solid #e6e6e6",
			"&.avatarSmall": {
				height: 44,
				width: 44,
				margin: 0,
			},
		},
		avatarTitle: {
			marginTop: 30,
			textAlign: "center",
			fontSize: 20,
			fontWeight: "bold",
		},
		patientIdTitle: {
			marginTop: 30,
			textAlign: "left",
			fontSize: 20,
		},
		patientIdNumber: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 40,
			fontWeight: "bold",
		},
		bloodGroup: {
			marginTop: 30,
			textAlign: "left",
			fontSize: 20,
		},
		bloodType: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 40,
			fontWeight: "bold",
		},
		notes: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 20,
			fontWeight: "bold",
		},
		notesDetails: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 15,
		},
		admissionDate: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 15,
		},
		reasonVisit: {
			marginTop: 30,
			textAlign: "left",
			fontSize: 15,
		},
		reasonVisitType: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 15,
			fontWeight: "bold",
		},
		treatment: {
			marginTop: 30,
			textAlign: "left",
			fontSize: 15,
		},
		treatmentType: {
			marginTop: 5,
			textAlign: "left",
			fontSize: 15,
			fontWeight: "bold",
		},
		detailButtonLabelPrint: {
			color: theme.palette.primary.white,
		},
		divider: {
			backgroundColor: "#808080",
			// opacity: 0.2,
			width: "100%",
		},
	});

export default styles;