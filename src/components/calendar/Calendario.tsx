import {CardContent, Grid, Link, Paper, Collapse, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import PropTypes from "prop-types";
import * as React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Link as LinkRouter } from "react-router-dom";
import styles from "./Calendario.style";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Calendar from "../../shared/lib/calendar/index";
export interface Props extends WithStyles<typeof styles> {}

interface State {
  value?: number;
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
  openOptionalInfo: boolean;
}

class Calendario extends React.Component<Props, State> {
  public state: State = {
    error: null,
    isLoaded: false,
    labelWidth: 0,
    value: 0
    openOptionalInfo: false
  };

  public handleChange = (event: React.MouseEvent<HTMLElement>, value: number) => {
    this.setState({ value });
  };

  handleClickCollapseOptionalInfo = () => {
    this.setState(state => ({ openOptionalInfo: !state.openOptionalInfo }));
  };


  public render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { openOptionalInfo } = this.state;

    {
      openOptionalInfo ? <ExpandLess /> : <ExpandMore />;
    }

    return (
      <div className={classes.root}>
        <Grid container={true} item={true} className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item={true} xs={12}>
            <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
              <Link color="secondary" component={LinkRouter} to="/dashboard">
                Home
              </Link>
              <Typography color="inherit">Calendario</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item={true} xs={12}>
            <Typography variant="inherit" className={classes.calendarTitle}>
              CALENDARIO
            </Typography>
            <Grid container={true} item={true} className={classes.gridContainer} style={{ paddingLeft: "570px" }} xs={12}>
              <Button variant="outlined" color="inherit" classes={{ root: classes.button }}>
                Add your personal calendar
              </Button>
              &emsp;
              <Button variant="outlined" color="inherit" classes={{ root: classes.button }}>
                Add an event or reminders
              </Button>
            </Grid>
          </Grid>
          &emsp;
          <Divider className={classes.divider} />
          &emsp;
        </Grid>
        <Grid container={true} item={true} className={classes.gridContainer} spacing={24}>
          <Grid item={true} xs={3}>
            <Paper style={{ backgroundColor: "#fe4641" }} className={classes.paperFlat}>
              <CardContent style={{ width: "100%", padding: "2px" }}>
                <Typography className={classes.object}>TODAY</Typography>
                <Typography className={classes.month}>June</Typography>
                <Typography className={classes.numberOf}>5</Typography>
                <Typography className={classes.day}>Wednesday</Typography>
                <Typography className={classes.year}>2019</Typography>
              </CardContent>
              &emsp;
              <Divider className={classes.dividerDay} />
              &emsp;
              <CardContent style={{ width: "100%", padding: "2px", textAlign: "left" }}>
                <Typography className={classes.notes}>Daily brief with Staff at 7am</Typography>
                <Typography className={classes.subtitleNotes}>No notes</Typography>
                &emsp;
                <Typography className={classes.notes}>Daily visit at 9:30am and 3pm</Typography>
                <Typography className={classes.subtitleNotes}>Room 2 and Room 3</Typography>
              </CardContent>
            </Paper>
            &emsp;
            <Grid item={true} xs={12}>
              <Paper  style={{ padding: "1px", marginLeft: "0px" }} className={classes.paperFlat}>
                <DayPicker style={{ textAlign: "center" }} />
              </Paper>
            </Grid>
          </Grid>
          <Grid item={true} xs={8}>
            <Paper  className={classes.paperFlatEvent}>
              <Grid item={true} xs={10}>
                <Tabs indicatorColor="none" textColor="secondary" value={value} onChange={this.handleChange}>
                  <Tab className={classes.calendarLink} label="Day" />
                  <Tab className={classes.calendarLink} label="Week" />
                  <Tab className={classes.calendarLink} label="Month" />
                </Tabs>
              </Grid>
              {value === 0 && (
                /// DAY CALENDAR ///
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" className={classes.tableTitle}>
                          <b>Wednesday 5 June</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          7AM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          8AM
                          <Grid style={{ backgroundColor: "#4a90e2", marginLeft: "40px", color: "white" }} xs={6}>
                            Daily brief with the staff
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          9AM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          10AM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          11AM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          12AM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          1PM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          2PM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          3PM
                          <Grid style={{ backgroundColor: "#4a90e2", marginLeft: "40px", color: "white" }} xs={6}>
                            Daily brief with the staff
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          4PM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          5PM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          6PM
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" padding="none">
                          7PM
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
              {value === 1 && (
                // WEEK CALENDAR //
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" className={classes.tableTitle}>
                          <b>WEEK</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.dayTable}>MONDAY 10</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.dayTable}>
                          TUESDAY 11
                          <Grid
                            style={{ height: "30px", backgroundColor: "#4a90e2", marginLeft: "200px", color: "white" }}
                            xs={6}
                          >
                            Daily brief with the staff
                          </Grid>
                          <Grid
                            style={{ height: "30px", backgroundColor: "#fe4641", marginLeft: "200px", color: "white" }}
                            xs={6}
                          >
                            Daily brief with the staff
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.dayTable}>WEDNESDAY 12</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.dayTable}>THURSDAY 13</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.dayTable}>FRIDAY 14</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.dayTable}>SATURDAY 15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.dayTable}>SUNDAY 16</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
              {value === 2 && (
                // MONTH CALENDAR//

                <div>
                  <Calendar
                  accentColor={"red"}
                  orientation={"flex-row"}
                  showHeader={true}
                  onDatePicked={(d: any) => {
                   { onclick=this.handleClickCollapseOptionalInfo,d}
                  }}
                />
                <Collapse in={openOptionalInfo} style={{ width: "100%" }} timeout="auto">
                    <Grid item xs={12} justify="center">
                    <List classes={{ root: classes.appointments }}>
                  <ListItem disableGutters={true} className={classes.appointmentsTitleContainer}>
                    <Typography className={classes.appointmentsTitle} variant="inherit" align="left">
                      EVENTS
                    </Typography>
                  </ListItem>
                  {/* <Collapse in={openAppointments} timeout="auto" unmountOnExit> */}
                  <List disablePadding={true}>
                  <ListItem disableGutters={true} className={classes.appointmentsListItem}>
                      <Grid container justify="center" spacing={24} className={classes.appointmentsListItemGrid}>
                        <Grid item xs={3} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            <b>07.30 am</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                             Blood exam
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem disableGutters={true} className={classes.appointmentsListItem}>
                      <Grid container justify="center" spacing={24} className={classes.appointmentsListItemGrid}>
                        <Grid item xs={3} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            <b>10.30 am</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.materialsListItemTitleContainer}>
                          <Typography className={classes.appointmentsListItemText} variant="inherit">
                            Pneumological visit with Dr.Mason
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </List>
                    </Grid>
                  </Collapse>
                   
                 
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Calendar.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withStyles(styles, { withTheme: true })(Calendario);
export default styledComponent;
