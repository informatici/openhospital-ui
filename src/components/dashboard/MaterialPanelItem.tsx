import React, { Component } from 'react';

// local imports
import styles from "./styles/MaterialPanelItem.style";
import BigNumberItem from "./BigNumberItem";

// material imports
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export interface Props extends WithStyles<typeof styles> {}

class MaterialPanelItem extends Component<Props>{

	render(){
		const { classes } = this.props
		return (
			<ListItem className={classes.materialsListItem}>
                <Grid container justify="center" spacing={24}>
					<Grid item xs={12} className={classes.materialsListItemTitleContainer}>
						<Typography className={classes.materialsListItemTitle} variant="inherit">
							Amoxicillina antibiotico
						</Typography>
						<Typography className={classes.materialsListItemTitleWarning} variant="inherit">
							{/* <SvgIcon component={AlertIcon} /> */}
							The drug is running out
						</Typography>
					</Grid>
					<BigNumberItem/>
					<BigNumberItem/>
					<Grid item xs={12} sm={4} classes={{ item: classes.detailButtonContainer }}>
						<Button
							variant="outlined"
							color="inherit"
							classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}>
								Go to details
								<KeyboardArrowRightIcon />
						</Button>
					</Grid>
                </Grid>
			</ListItem>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(MaterialPanelItem);
export default styledComponent;
