import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		formField: {
			width: '100%',
		},
		cssOutlinedInput: {
			borderColor: `${theme.palette.primary.inputBorder} !important`,
			'& legend': {
				width: '0 !important'
			}
		},
		formFieldInputLabel: {
			transform: 'translate(14px, 14px) scale(1)',
		},
		cssFocused: {
			'&$cssFocused': {
				// color: 'green',
				transform: 'translate(0px, -20px) scale(1)',
			},
		},
		formFieldInput: {
			padding: '6px 0',
			'& input': {
				padding: 6
			}
		},
	});

export default styles;