import React, { Component } from "react";

// local imports
import styles from "./styles/BigNumberItem.style";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export interface Props extends WithStyles<typeof styles> {}

class BigNumberItem extends Component<Props>{

	render(){
		const { classes } = this.props;
		return(
			<Grid item xs={12} sm={4}>
				<Grid item xs>
					<Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
						8
					</Typography>
				</Grid>
				<Grid item xs>
					<Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
						<span className={classes.textDark}>Patients</span> visited
					</Typography>
				</Grid>
			</Grid>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(BigNumberItem);
export default styledComponent;