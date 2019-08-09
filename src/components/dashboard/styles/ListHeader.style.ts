import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
	createStyles({
		appointmentsTitle: {
			marginRight: "auto",
		},
		appointmentsTitleContainer: {
			borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
			margin: "0 16px 16px 16px",
			width: "auto",
			paddingBottom: 5,
		},
		appointmentsDWM: {
			borderRadius: 20,
			color: theme.palette.primary.grey,
		},
	});

export default styles;