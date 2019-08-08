import * as React from "react";
import ReactDOM from "react-dom";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter, LinkProps } from "react-router-dom";
import { MaterialNavLinkRouter, MaterialLinkRouter } from "../../utils/LinkHelper";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Select from "@material-ui/core/Select";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import ChatIcon from "@material-ui/icons/Sms";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import maleAvatar from "../../../assets/images/male.png";
import femaleAvatar from "../../../assets/images/female.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import styles from "./ColleagueDetails.style";
import _ from 'lodash';
export interface Props extends WithStyles<typeof styles> {}

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
  anchorEl?: any;
}

class ColleagueDetails extends React.Component<Props, State> {
  public state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    items: [],
    anchorEl: null,
    
  };

  

  public handleClickCalendarAppointmentsDWM = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleCloseCalendarAppointmentsDWM = () => {
    this.setState({ anchorEl: null });
  };

  public render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    // const { items, isLoaded, error } = this.state;

    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify="center" spacing={24}>
          <Grid container item spacing={24}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
                </MaterialLinkRouter>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/colleagues">
                  <Typography color="inherit">Your colleagues</Typography>
                </MaterialLinkRouter>
                <Typography color="inherit">Colleague details</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.colleaguesTitle}>
                COLLEAGUE DETAILS
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify="center" spacing={24}>
            <Paper className={classes.paperHeader}>
              <Grid item xs={12} className={classes.colleagueProfileHeader}>
                <Avatar alt="Remy Sharp" src={_.sample([maleAvatar, femaleAvatar])} className={classes.avatar} />
                <div style={{ flexDirection: "column", textAlign: "left" }}>
                  <Typography color="inherit" className={classes.colleagueName}>
                    Dr. Marcus Gross
                  </Typography>
                  <Typography color="inherit" >
                    Profession: <b>Pneumologist</b>
                  </Typography>
                </div>
                <Button
                  variant="outlined"
                  color="inherit"
                  classes={{ root: classes.chatButton, label: classes.chatButtonLabel }}
                >
                  <ChatIcon className={classes.buttonIcon} />
                  Chat with doctor
                </Button>
              </Grid>
            </Paper>
            <Grid container item justify="center" spacing={24}>
              <Grid item xs={12} sm={3} className={classes.sidebar}>
                <Typography color="inherit" className={classes.contacts}>
                  CONTACTS
                </Typography>
                <Divider className={classes.divider} />
                <div className={classes.contactsContainer}>
                  <Typography color="inherit" className={classes.iconAndText}>
                    <PhoneIcon color="secondary" style={{ marginRight: "5px" }} />
                    3451234567
                  </Typography>
                  <Typography color="inherit" className={classes.iconAndText}>
                    <MailIcon color="secondary" style={{ marginRight: "5px" }} />
                    doc@hospital.com
                  </Typography>
                </div>
                <Typography color="inherit" className={classes.contacts}>
                  LAST VISITED PATIENTS
                </Typography>
                <Divider className={classes.divider} />
                <Grid item xs={12} className={classes.sidebarPatients}>
                  <div className={classes.sidebarPatientsItem}>
                    <Avatar
                      alt="Remy Sharp"
                      src={_.sample([maleAvatar, femaleAvatar])}
                      className={classNames(classes.avatar, "avatarSmall")}
                    />
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                      <Typography color="inherit">
                        <b>Gross</b>
                      </Typography>
                      <Typography color="inherit">Marcus</Typography>
                    </div>
                  </div>
                  <div className={classes.sidebarPatientsItem}>
                    <Avatar
                      alt="Remy Sharp"
                      src={_.sample([maleAvatar, femaleAvatar])}
                      className={classNames(classes.avatar, "avatarSmall")}
                    />
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                      <Typography color="inherit">
                        <b>Gross</b>
                      </Typography>
                      <Typography color="inherit">Marcus</Typography>
                    </div>
                  </div>
                  <div className={classes.sidebarPatientsItem}>
                    <Avatar
                      alt="Remy Sharp"
                      src={_.sample([maleAvatar, femaleAvatar])}
                      className={classNames(classes.avatar, "avatarSmall")}
                    />
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                      <Typography color="inherit">
                        <b>Gross</b>
                      </Typography>
                      <Typography color="inherit">Marcus</Typography>
                    </div>
                  </div>
                  <div className={classes.sidebarPatientsItem}>
                    <Avatar
                      alt="Remy Sharp"
                      src={_.sample([maleAvatar, femaleAvatar])}
                      className={classNames(classes.avatar, "avatarSmall")}
                    />
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                      <Typography color="inherit">
                        <b>Gross</b>
                      </Typography>
                      <Typography color="inherit">Marcus</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={9} className={classes.colleagueContent}>
                <Grid item xs={12} className={classes.rosterActions}>
                  <Typography color="inherit" className={classes.rosterTitle}>
                    DUTY ROSTER
                  </Typography>
                  <Grid item xs={12} sm={3}>
                    <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                      <InputLabel
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="​profession"
                        classes={{
                          root: classes.formFieldInputLabel,
                          focused: classes.selectLabel,
                        }}
                      >
                        Today
                      </InputLabel>
                      <Select
                        className={classes.select}
                        // value={this.state.age}
                        // onChange={this.handleChange}
                        input={
                          <OutlinedInput
                            labelWidth={this.state.InputLabelRef}
                            name="​professionSpecializationUsergroup"
                            id="profession"
                            // inputProps={{
                            classes={{
                              // root: classes.formFieldSelectInput,
                              input: classes.formFieldSelectInput,
                            }}
                            // }}
                          />
                        }
                      >
                        <MenuItem value="">
                          <em>Today</em>
                        </MenuItem>
                        <MenuItem value={10}>Tomorrow</MenuItem>
                        <MenuItem value={20}>Next three days</MenuItem>
                        <MenuItem value={30}>Next week</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Button
                    variant="outlined"
                    color="inherit"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}
                  >
                    Go
                  </Button>
                </Grid>
                {/* <Grid item xs={12} sm={2} classes={{ item: classes.detailButtonContainer }}>
                </Grid> */}
                <Grid item xs={12} className={classes.rosterInfo}>
                  <Card className={classNames(classes.rosterInfoItem, "itemDay")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        Day
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        Wednesday
                      </Typography>
                      <Typography className="value" color="inherit">
                        18
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        May
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemHours")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        Hours
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        &nbsp;
                      </Typography>
                      <Typography className="value" color="inherit">
                        06
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemFrom")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        From
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        &nbsp;
                      </Typography>
                      <Typography className="value" color="inherit">
                        03
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        am
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemTo")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        To
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        &nbsp;
                      </Typography>
                      <Typography className="value" color="inherit">
                        09
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        pm
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemHospital")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        Hospital
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        St. Democrito
                      </Typography>
                      <Typography className="value" color="inherit">
                        114
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        Room/East wing
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} className={classes.rosterInfo}>
                  <Card className={classNames(classes.rosterInfoItem, "itemDay")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        Day
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        Wednesday
                      </Typography>
                      <Typography className="value" color="inherit">
                        18
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        May
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemHours")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        Hours
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        &nbsp;
                      </Typography>
                      <Typography className="value" color="inherit">
                        06
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemFrom")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        From
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        &nbsp;
                      </Typography>
                      <Typography className="value" color="inherit">
                        03
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        am
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemTo")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        To
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        &nbsp;
                      </Typography>
                      <Typography className="value" color="inherit">
                        09
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        pm
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className={classNames(classes.rosterInfoItem, "itemHospital")}>
                    <CardContent style={{ width: "100%" }}>
                      <Typography className="title" color="inherit">
                        Hospital
                      </Typography>
                      <Typography className="subTitle" color="inherit">
                        St. Democrito
                      </Typography>
                      <Typography className="value" color="inherit">
                        114
                      </Typography>
                      <Typography className="subValue" color="inherit">
                        Room/East wing
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 55 }}>
                  <Paper className={classes.paperFlat}>
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
                          {/* openAppointments ? */}
                          <ExpandMore className={classes.expandButton} />
                          {/* : <ExpandMore onClick={this.handleClickCollapseAppointments} /> */}
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
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(ColleagueDetails);
export default styledComponent;
