import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		deleteInputField: {
			paddingLeft: "165px",
			width: '104%'
		},
		formDeleteField: {
			width: '50%',
			justifyContent:'center'
		},
		cssOutlinedInput: {
			borderColor: `${theme.palette.primary.inputBorder} !important`,
			'& legend': {
				width: '0 !important'
			}
		},
	});

export default styles;