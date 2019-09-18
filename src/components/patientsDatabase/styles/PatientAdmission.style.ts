import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			// marginTop: 50
		},
		gridContainer: {
			margin: "0 auto",
			paddingTop: 60,
		},
		breadCrumb: {
			fontWeight: "bold",
			fontSize: 12,
			letterSpacing: 0.75,
		},
		admissionTitle: {
			fontWeight: "bold",
			fontSize: 20,
			letterSpacing: 1,
		},
		colleagueContent: {
			backgroundColor: "#ffffff",
			padding: "40px !important",
		},
		colleagueProfileHeader: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
		},
		patientName: {
			fontSize: "30px",
			fontWeight: "bold",
			letterSpacing: 1,
		},
		patientAddress: {
			fontSize: "15px",
			fontWeight: "bold",
			letterSpacing: 1,
		},
		divider: {
			backgroundColor: "#808080",
			// opacity: 0.2,
			width: "100%",
		},
		colleagueProfileHeader: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
		},
		formTitle: {
			fontSize: "15px",
			fontWeight: "bold",
			letterSpacing: 1,
		},
		formatFormAdmission: {
			float: "left",
			width: "50%",
			padding: "30px",
			paddingLeft: 0,
		},
		drugPrescribed: {
			fontSize: "15px",
			fontWeight: "bold",
			letterSpacing: 1,
		},
		formField: {
			width: "100%",
			margin: "8px 0 !important",
		},
		cssOutlinedInput: {
			borderColor: `${theme.palette.primary.inputBorder} !important`,
			"& legend": {
				width: "0 !important",
			},
		},
		formFieldInputLabel: {
			transform: "translate(14px, 14px) scale(1)",
		},
		cssFocused: {
			"&$cssFocused": {
				// color: 'purple',
				transform: "translate(0px, -20px) scale(1)",
			},
		},
		formFieldInput: {
			padding: "6px 0",
			"& input": {
				padding: 6,
			},
		},
		formatFormAdmissionDate: {
			float: "left",
			width: "30%",
			padding: "30px",
			paddingLeft: 0,
		},
		detailButtonICD: {
			textTransform: "none",
			color: theme.palette.primary.red,
			fontWeight: "bold",
			borderRadius: 20,
			// marginBottom: '8px',
			marginLeft: "-4px",
			marginTop: 70,
			"&:hover": {
				color: theme.palette.primary.white,
				background: theme.palette.primary.red,
			},
		},
		detailButtonLabelInverse: {
			color: theme.palette.primary.white,
			// justifyContent: 'flex-end'
		},
		selectLabel: {
			// '&$focused': {
			// color: 'purple !important',
			transform: "translate(0px, -20px) scale(1) !important",
			// },
		},
		select: {
			padding: "0px 0 !important",
			"& :focus": {
				borderRadius: "6px !important",
				border: `1px solid ${theme.palette.primary.inputBorder} !important`,
				backgroundColor: theme.palette.primary.white,
				padding: "12px 0 !important",
			},
		},
		formFieldInputNotes: {
			padding: "10px",
		},
		detailButton: {
			textTransform: "none",
			color: theme.palette.primary.red,
			fontWeight: "bold",
			borderRadius: 20,
			// marginBottom: '8px',
			marginLeft: "17px",
			"&:hover": {
				color: theme.palette.primary.white,
				background: theme.palette.primary.red,
			},
		},
	});

export default styles;