import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			marginLeft:"auto",
			marginTop:35
		},
		title: {
			fontSize: 16,
			fontWeight: "bold",
			letterSpacing: 1,
		},
		inputBody:{
			marginLeft:10
		},
		formField: {
			width: "100%",
			margin: "8px 0 !important",
		},
		formFieldSelect: {
			// marginTop: '16px',
			// marginBottom: '8px',
		},
		formFieldInputLabel: {
			transform: "translate(14px, 14px) scale(1)",
		},
		selectLabel: {
			// '&$focused': {
			// color: 'purple !important',
			transform: "translate(0px, -20px) scale(1) !important",
			// },
		},
		formFieldSelectInput: {
			padding: "12px 330px !important",
		},
	});

export default styles;