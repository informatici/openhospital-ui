import React from "react";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialCardActionAreaRouter } from "../utils/LinkHelper";
import BigSearchIcon from "../utils/icons/svg/BigSearchIcon";
import PlusIcon from "../utils/icons/svg/PlusIcon";
import classNames from "classnames";
import Calendar from "../../shared/lib/calendar/index";
import styles from "./Dashboard.style";
import MaterialPanel from "./MaterialPanel"

// material imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import SvgIcon from "@material-ui/core/SvgIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

export interface Props extends WithStyles<typeof styles> {}

interface State {
  value?: number;
  openAppointments?: boolean;
  anchorEl?: any;
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
    openAppointments: true,
    value: 0,
    anchorEl: null,
  };

  handleClickCalendarAppointmentsDWM = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseCalendarAppointmentsDWM = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (event: React.MouseEvent<HTMLElement>, value: number) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, anchorEl } = this.state;
  
    return (
      <div className={classes.root}>
        <Grid container spacing={24} classes={{ container: classes.gridContainer }}>
          <Grid container justify="center" className={classes.gridPaddingBottom}>
            <Grid item xs={4}>
              <Typography variant="inherit" align="center" className={classes.welcomeTitle}>
                Welcome <b>Mario Rossi</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={24} className={classes.ctaGrid}>
            <Grid item xs={12} sm={4}>
              <MaterialCardActionAreaRouter
                className={classes.ctaPatient}
                component={LinkRouter}
                to="/patientsDatabase/newPatient"
              >
                <SvgIcon component={PlusIcon} />
                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                  <b>REGISTER NEW PATIENT</b>
                </Typography>
              </MaterialCardActionAreaRouter>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MaterialCardActionAreaRouter
                className={classes.ctaPatient}
                component={LinkRouter}
                to="/patientsDatabase"
              >
                <SvgIcon component={BigSearchIcon} />
                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                  <b>SEARCH FOR PATIENTS</b>
                </Typography>
              </MaterialCardActionAreaRouter>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={24} className={classes.gridMaterialsCalendar}>
            <MaterialPanel/>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.cardTitle} variant="inherit" align="left">
                CALENDAR
              </Typography>
              <Paper className={classes.paperCalendar}>
                {/* xs=6 sm=3 */}
                <Calendar
                  className={classes.calendar}
                  accentColor={"red"}
                  orientation={"flex-row"}
                  showHeader={true}
                  onDatePicked={(d: any) => {
                    console.log("onDatePicked", d);
                  }}
                />

                <Grid item xs={12} justify="center" classes={{ item: classes.detailButtonContainer }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}
                  >
                    Add an event
                    <KeyboardArrowRightIcon />
                  </Button>
                </Grid>

                <List classes={{ root: classes.appointments }}>
                  <ListItem disableGutters className={classes.appointmentsTitleContainer}>
                    <Typography className={classes.appointmentsTitle} variant="inherit" align="left">
                      APPOINTMENTS
                    </Typography>
                    <Button
                      aria-owns={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      className={classes.appointmentsDWM}
                      onClick={this.handleClickCalendarAppointmentsDWM}
                    >
                      Day
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleCloseCalendarAppointmentsDWM}
                    >
                      <MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Day</MenuItem>
                      <MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Week</MenuItem>
                      <MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Month</MenuItem>
                    </Menu>
                  </ListItem>
                  {/* <Collapse in={openAppointments} timeout="auto" unmountOnExit> */}
                  <List disablePadding>
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
                    <ListItem disableGutters className={classes.appointmentsListItem}>
                      <Grid container justify="center" spacing={24} className={classes.appointmentsListItemGrid}>
                        <Grid item xs={3} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            <b>9.30 am</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            Meeting with Dr. Ford
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
                    <ListItem disableGutters className={classes.appointmentsListItem}>
                      <Grid container justify="center" spacing={24} className={classes.appointmentsListItemGrid}>
                        <Grid item xs={3} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            <b>10.30 am</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            Meeting team
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
                    <ListItem disableGutters className={classes.appointmentsListItem}>
                      <Grid container justify="center" spacing={24} className={classes.appointmentsListItemGrid}>
                        <Grid item xs={3} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            <b>3.00 pm</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            Daily visits
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
                  </List>
                  {/* </Collapse> */}
                </List>

                <List classes={{ root: classes.summary }}>
                  <ListItem disableGutters className={classes.appointmentsTitleContainer}>
                    <Typography className={classes.appointmentsTitle} variant="inherit" align="left">
                      SUMMARY
                    </Typography>
                    <Button
                      aria-owns={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      className={classes.appointmentsDWM}
                      onClick={this.handleClickCalendarAppointmentsDWM}
                    >
                      Day
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleCloseCalendarAppointmentsDWM}
                    >
                      <MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Day</MenuItem>
                      <MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Week</MenuItem>
                      <MenuItem onClick={this.handleCloseCalendarAppointmentsDWM}>Month</MenuItem>
                    </Menu>
                  </ListItem>
                  <ListItem className={classes.summaryItem}>
                    <Grid container justify="center" spacing={24}>
                      <Grid item xs={12} sm={4}>
                        <Grid item xs>
                          <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                            8
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography
                            className={classes.materialsListItemBigNumberDesc}
                            variant="inherit"
                            align="center"
                          >
                            <span className={classes.textDark}>Patients</span> visited
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Grid item xs>
                          <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                            15
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography
                            className={classes.materialsListItemBigNumberDesc}
                            variant="inherit"
                            align="center"
                          >
                            <span className={classes.textDark}>Appointments</span> remain
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Grid item xs>
                          <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                            91%
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography
                            className={classes.materialsListItemBigNumberDesc}
                            variant="inherit"
                            align="center"
                          >
                            <span className={classes.textDark}>Healings</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default styledComponent;
