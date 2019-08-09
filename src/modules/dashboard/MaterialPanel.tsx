import React, { Component } from "react";

// local imports
import MaterialPanelItem from "./MaterialPanelItem";
import styles from "./styles/MaterialPanel.style";
import classNames from "classnames";

// material imports
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";

export interface Props extends WithStyles<typeof styles> {}

class MaterialPanel extends Component<Props>{

	render(){
		const { classes } = this.props;
		//temp
		const value = 0;
		return (
			<Grid item xs={12} sm={6}>
              <Typography className={classes.cardTitle} variant="inherit" align="left">
                MATERIALS ARE RUNNING OUT
              </Typography>
              <Paper className={classNames(classes.paper, classes.cardMaterials)}>
                <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={this.handleChange}>
                  <Tab
                    className={classNames(classes.tab, classes.tabRadiusSx)}
                    classes={{ selected: classes.tabSelected }}
                    label="Running out drugs"
                  />
                  <Tab
                    className={classNames(classes.tab, classes.tabRadiusSx)}
                    classes={{ selected: classes.tabSelected }}
                    label="Running out nursing material"
                  />
                </Tabs>
                {value === 0 && (
                  <div>
                    <List classes={{ root: classes.materialsList }}>
                      
                      <MaterialPanelItem/>
                      <MaterialPanelItem/>
                      <MaterialPanelItem/>

                      <ListItem button classes={{ button: classes.allMaterialsButton }}>
                        SEE ALL MATERIALS
                      </ListItem>
                    </List>
                  </div>
                )}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
              </Paper>
            </Grid>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(MaterialPanel);
export default styledComponent;