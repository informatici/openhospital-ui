import React, { Component } from "react";

// local imports
import styles from "./styles/AppointmentsItem.style";

// material imports
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles, WithStyles } from "@material-ui/core/styles";

export interface Props extends WithStyles<typeof styles> {}

class AppointmentsItem extends Component<Props>{

	render(){
		const { classes } = this.props;
		return(
			<ListItem disableGutters className={classes.appointmentsListItem}>
				<Grid container justify="center" spacing={24} className={classes.appointmentsListItemGrid}>
					<Grid item xs={3} className={classes.materialsListItemTitleContainer}>
						<Typography className={classes.materialsListItemBigNumberDesc} variant="inherit">
							<b>7.00 am</b>
						</Typography>
					</Grid>
					<Grid item xs={9} className={classes.materialsListItemTitleContainer}>
						<Typography className={classes.materialsListItemBigNumberDesc} variant="inherit">
							Daily brief with the staff
						</Typography>
					</Grid>
				</Grid>
				<ListItemSecondaryAction>
					<Checkbox
					className={classes.appointmentsListItemCheckbox}
					// onChange={this.handleToggle(value)}
					// checked={this.state.checked.indexOf(value) !== -1}
					/>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(AppointmentsItem);
export default styledComponent;