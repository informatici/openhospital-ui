import React, { Component } from "react";

// local imports
import styles from "./styles/ListHeader.style";

// material imports
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, WithStyles } from "@material-ui/core/styles";

export interface Props extends WithStyles<typeof styles> {}

interface State {
	anchorEl?: any;
}

class ListHeader extends Component<Props, State>{
	state: State = {
		anchorEl: null,
	};

	handleClickCalendarAppointmentsDWM = (event: any) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleCloseCalendarAppointmentsDWM = () => {
		this.setState({ anchorEl: null });
	};

	render(){
		const { classes } = this.props;
		const { anchorEl } = this.state;
		return(
			<ListItem disableGutters className={classes.appointmentsTitleContainer}>
				<Typography className={classes.appointmentsTitle} variant="inherit" align="left">
					SUMMARY
				</Typography>
				<Button
					aria-owns={anchorEl ? "simple-menu" : undefined}
					aria-haspopup="true"
					className={classes.appointmentsDWM}
					onClick={this.handleClickCalendarAppointmentsDWM}>
					Day
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleCloseCalendarAppointmentsDWM}>
					<MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Day</MenuItem>
					<MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Week</MenuItem>
					<MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Month</MenuItem>
				</Menu>
			</ListItem>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(ListHeader);
export default styledComponent;