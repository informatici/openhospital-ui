
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import NoSsr from '@material-ui/core/NoSsr';
// import { default as Tab, TabProps } from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import { NavLink, NavLinkProps } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import BigSearchIcon from '../utils/icons/svg/BigSearchIcon';
import PlusIcon from '../utils/icons/svg/PlusIcon';
import AlertIcon from '../utils/icons/svg/AlertIcon';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import styles from './Dashboard.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  value?: number;
}

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Dashboard extends React.Component<Props, State> {
  state: State = {
    value: 0,
  };

  handleChange = (event: React.MouseEvent<HTMLElement>, value: number) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} classes={{ container: classes.gridContainer }}>
          <Grid container justify='center' className={classes.gridPaddingBottom}>
            <Grid item xs={4}>
              <Typography variant="inherit" align="center" className={classes.welcomeTitle}>
                Welcome <b>Mario Rossi</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify='center' spacing={24} className={classes.ctaGrid}>
            <Grid item xs={12} sm={4}>
              <CardActionArea className={classes.ctaPatient}>
                <SvgIcon component={PlusIcon} />
                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                  <b>REGISTER NEW PATIENT</b>
                </Typography>
              </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardActionArea className={classes.ctaPatient}>
                <SvgIcon component={BigSearchIcon} />
                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                  <b>SEARCH FOR PATIENTS</b>
                </Typography>
              </CardActionArea>
            </Grid>
          </Grid>
          <Grid container justify='center' spacing={24} className={classes.gridMaterialsCalendar}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.cardTitle} variant="inherit" align="left">
                MATERIALS ARE RUNNING OUT
                        </Typography>
              <Paper className={classNames(classes.paper, classes.cardMaterials)}>
                <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={this.handleChange}>
                  <Tab className={classNames(classes.tab, classes.tabRadiusSx)} classes={{ selected: classes.tabSelected }} label="Running out drugs" />
                  <Tab className={classNames(classes.tab, classes.tabRadiusSx)} classes={{ selected: classes.tabSelected }} label="Running out nursing material" />
                </Tabs>
                {value === 0 &&
                  // <TabContainer>Item One</TabContainer>
                  <div>
                    <List classes={{ root: classes.materialsList }}>
                      <ListItem className={classes.materialsListItem}>
                        <Grid container justify='center' spacing={24}>
                          <Grid item xs={12} className={classes.materialsListItemTitleContainer}>
                            <Typography className={classes.materialsListItemTitle} variant="inherit">
                              Eritromicina
                                                        </Typography>
                            <Typography className={classes.materialsListItemTitleWarning} variant="inherit">
                              {/* <SvgIcon component={AlertIcon} /> */}
                              The drug is running out
                                                        </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                150
                                                        </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                <span className={classes.textDark}>vials</span> remaining
                                                            </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                4
                                                        </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                <span className={classes.textDark}>weeks</span> for the next refueling
                                                            </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4} classes={{ item: classes.detailButtonContainer }}>
                            <Button variant="outlined" color="inherit" classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}>
                              Go to details
                                                            <KeyboardArrowRightIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.materialsListItem}>
                        <Grid container justify='center' spacing={24}>
                          <Grid item xs={12} className={classes.materialsListItemTitleContainer}>
                            <Typography className={classes.materialsListItemTitle} variant="inherit">
                              Amoxicillina antibiotico
                                                        </Typography>
                            <Typography className={classes.materialsListItemTitleWarning} variant="inherit">
                              {/* <SvgIcon component={AlertIcon} /> */}
                              The drug is running out
                                                        </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                1200
                                                        </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                <span className={classes.textDark}>vials</span> remaining
                                                            </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                4
                                                        </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                <span className={classes.textDark}>weeks</span> for the next refueling
                                                            </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4} classes={{ item: classes.detailButtonContainer }}>
                            <Button variant="outlined" color="inherit" classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}>
                              Go to details
                                                            <KeyboardArrowRightIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem className={classes.materialsListItem}>
                        <Grid container justify='center' spacing={24}>
                          <Grid item xs={12} className={classes.materialsListItemTitleContainer}>
                            <Typography className={classes.materialsListItemTitle} variant="inherit">
                              Claritromicina antibiotico
                                                        </Typography>
                            <Typography className={classes.materialsListItemTitleWarning} variant="inherit">
                              {/* <SvgIcon component={AlertIcon} /> */}
                              The drug is running out
                                                        </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                200
                                                        </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                <span className={classes.textDark}>vials</span> remaining
                                                            </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                4
                                                        </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                <span className={classes.textDark}>weeks</span> for the next refueling
                                                            </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={4} classes={{ item: classes.detailButtonContainer }}>
                            <Button variant="outlined" color="inherit" classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}>
                              Go to details
                              <KeyboardArrowRightIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem button classes={{ button: classes.allMaterialsButton }}>
                        SEE ALL MATERIALS
                      </ListItem>
                    </List>
                  </div>
                }
                {value === 1 && <TabContainer>Item Two</TabContainer>}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.cardTitle} variant="inherit" align="left">
                CALENDAR
                        </Typography>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
          </Grid>
        </Grid>
      </div >
    );
  }

}


const styledComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default styledComponent;