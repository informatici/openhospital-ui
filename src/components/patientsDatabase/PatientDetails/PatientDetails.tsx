import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter, RouteProps, RouteComponentProps } from "react-router-dom";
import { MaterialLinkRouter, MaterialButtonRouter } from "../../utils/LinkHelper";
import classNames from "classnames";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import styles from "./PatientDetails.style";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Tooltip from '@material-ui/core/Tooltip';
import Calendar from "../../../shared/lib/calendar/index";
import { PatientControllerApi, GetPatientUsingGETRequest } from '../../../generate/apis';
import { Collapse, FormControl, InputLabel, Select, MenuItem, OutlinedInput, List, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { Patient } from 'generate';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  item: Patient;
  openOptionalInfo: boolean;

}

interface IRouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteParams> { }

class PatientDetails extends React.Component<IProps> {

  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    item: {},
    openOptionalInfo: false,

  };

  componentDidMount() {

    const patientController: PatientControllerApi = new PatientControllerApi();
    const requestParams: GetPatientUsingGETRequest = {
      code: Number(this.props.match.params.id)
    }

    patientController.getPatientUsingGET(requestParams)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result,

          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    this.setState({
      // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });


  }

  handleClickCollapseOptionalInfo = () => {
    this.setState(state => ({ openOptionalInfo: !state.openOptionalInfo }));
  };



  public render() {
    const { classes } = this.props;
    const { openOptionalInfo } = this.state;


    {
      openOptionalInfo ? <ExpandLess /> : <ExpandMore />;
    }

    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify="center" spacing={24}>
          <Grid container item spacing={24}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
                </MaterialLinkRouter>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/patientsDatabase">
                  <Typography color="inherit">Patient Database</Typography>
                </MaterialLinkRouter>
                <Typography color="inherit">Patient Details</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.patientTitle}>
                PATIENT DETAILS
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify="center" spacing={24}>
            <Grid container item justify="center" spacing={24}>
              <Grid item xs={12} sm={3} className={classes.sidebar}>
                <Avatar alt="Remy Sharp" src={""} className={classes.avatar}>
                  <AddPhotoIcon />
                </Avatar>
                <Typography color="inherit" className={classes.avatarTitle}>
                  HEALTH INFORMATION
                </Typography>
                <Typography color="inherit" className={classes.patientIdTitle}>
                  PATIENT ID
                </Typography>
                <Typography color="inherit" className={classes.patientIdNumber}>
                  {this.state.item.code}
                </Typography>
                <Typography color="inherit" className={classes.bloodGroup}>
                  Blood Group
                </Typography>
                <Typography color="inherit" className={classes.bloodType}>
                  {this.state.item.bloodType}
                </Typography>
                <Typography color="inherit" className={classes.notes}>
                  Next Kin:
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  {this.state.item.nextKin}
                </Typography>
                &emsp;
                <Typography color="inherit" className={classes.notes}>
                  Notes:
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  Pneumonia and malnutrition
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  Grasses, Gluten
                </Typography>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Typography color="inherit" className={classes.admissionDate}>
                  Last Admission:&nbsp;<b>22.01.2019</b>
                </Typography>
                <Typography color="inherit" className={classes.reasonVisit}>
                  Reason for visit:
                </Typography>
                <Typography color="inherit" className={classes.reasonVisitType}>
                  {" "}
                  Pneumonia and malnutrition
                </Typography>
                <Typography color="inherit" className={classes.treatment}>
                  Treatment made:
                </Typography>
                <Typography color="inherit" className={classes.treatmentType}>
                  {" "}

                </Typography>
                <MaterialButtonRouter
                  style={{ marginTop: 30 }}
                  component={LinkRouter}
                  to="/"
                  variant="outlined"
                  color="inherit"
                  classes={classes.detailButtonLabelPrint}
                >
                  Print health information
                </MaterialButtonRouter>
              </Grid>
              <Grid item xs={12} sm={9} className={classes.patientContent}>
                <Grid item xs={12} className={classes.patientProfileHeader}>
                  <div style={{ flexDirection: "column", textAlign: "left" }}>
                    <Typography color="inherit" className={classes.patientName}>
                      {this.state.item.firstName} {this.state.item.secondName}
                    </Typography>
                    <Typography color="inherit" className={classes.patientAddress}>
                      Provenance: <b>{this.state.item.address}</b>&emsp;<b>{this.state.item.city}</b>
                    </Typography>
                  </div>
                  <MaterialButtonRouter component={LinkRouter} to="/PatientDatabase/PatientAdmission" variant="outlined" color="inherit" classes={{ root: classes.admissionButton }}
                  >
                    New Admission
                  </MaterialButtonRouter>
                  <MaterialButtonRouter component={LinkRouter} to="/patientDatabase/PatientVisit" variant="outlined" color="inherit" classes={{ root: classes.visitButton }}>
                    New visit
                  </MaterialButtonRouter>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Grid item xs={12} className={classes.patientProfileHeader}>
                  <div style={{ flexDirection: "column", textAlign: "left" }}>
                    <Typography color="inherit" className={classes.patientRecord}>
                      PATIENT RECORD
                    </Typography>
                  </div>
                  <Tooltip title="View Opd patient History" interactive>
                    <MaterialButtonRouter component={LinkRouter} to="/patientDatabase/PatientOpd" variant="outlined" color="inherit" classes={{ root: classes.opdButton }}>
                      OPD
                  </MaterialButtonRouter>
                  </Tooltip>
                  <Tooltip title="Add new patient's therapy" interactive>
                    <MaterialButtonRouter component={LinkRouter} to="/patientDatabase/PatientTherapy" variant="outlined" color="inherit" classes={{ root: classes.therapyButton }}>
                      Therapy
                  </MaterialButtonRouter>
                  </Tooltip>
                </Grid>
                &nbsp;
                <Grid container justify="center" spacing={24}>
                  <Calendar
                    accentColor={"red"}
                    orientation={"flex-row"}
                    showHeader={true}
                    onDatePicked={(d: any) => {
                      { onclick = this.handleClickCollapseOptionalInfo, d }
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
                </Grid>
                <Grid item xs={12} spacing={24} style={{ marginTop: 50, marginBottom: 20 }} className={classes.detailButtonContainer}>
                  <MaterialButtonRouter
                    component={LinkRouter}
                    to="/Billing"
                    variant="contained"
                    color="secondary"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}
                  >
                    <KeyboardArrowRightIcon />
                    Pay the bill
                  </MaterialButtonRouter>
                  <MaterialButtonRouter
                    component={LinkRouter}
                    to="/PatientDatabase/PatientExamination"
                    variant="contained"
                    color="secondary"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}
                  >
                    <KeyboardArrowRightIcon />
                    Examination
                  </MaterialButtonRouter>
                  <MaterialButtonRouter
                    component={LinkRouter}
                    to="/PatientDatabase/PatientVaccine"
                    variant="contained"
                    color="secondary"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}
                  >
                    <KeyboardArrowRightIcon />
                    Vaccination
                  </MaterialButtonRouter>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Typography color="inherit" className={classes.patientSummary}>
                  PATIENT SUMMARY
                </Typography>
                &emsp;
                <Grid container className={classes.patientSummaryCard} style={{ width: "120%" }}>
                  <Grid item xs={2} style={{ padding: 5 }} className={classes.boxInfo}>
                    <Card className={classNames(classes.boxItem)}>
                      <CardContent style={{ width: "100%", paddingBottom: 5 }}>
                        <Typography className={classes.numberOf}>5</Typography>
                        <Typography className={classes.object}>VISITS</Typography>

                        <Typography className={classes.subTitle}>Last visit: 16.03.2019</Typography>
                        <MaterialButtonRouter
                          style={{ marginTop: 10 }}
                          component={LinkRouter}
                          to="/"
                          variant="outlined"
                          color="inherit"
                          className={classes.summaryButton}
                        >
                          Print patient visit history
                        </MaterialButtonRouter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2} style={{ padding: 5 }} className={classes.boxInfo}>
                    <Card className={classNames(classes.boxItem)}>
                      <CardContent style={{ width: "100%", paddingBottom: 5 }}>
                        <Typography className={classes.numberOf}>4</Typography>
                        <Typography className={classes.object}>ADMISSIONS</Typography>

                        <Typography className={classes.subTitle}>Last admission: 16.03.2019</Typography>
                        <MaterialButtonRouter
                          style={{ marginTop: 10 }}
                          component={LinkRouter}
                          to="/"
                          variant="outlined"
                          color="inherit"
                          className={classes.summaryButton}
                        >
                          Print patient admission history
                        </MaterialButtonRouter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2} style={{ padding: 5 }} className={classes.boxInfo}>
                    <Card className={classNames(classes.boxItem)}>
                      <CardContent style={{ width: "100%", paddingBottom: 5 }}>
                        <Typography className={classes.numberOf}>2</Typography>
                        <Typography className={classes.object}>LABORATORY TESTS</Typography>
                        <Typography className={classes.subTitle}>Last labtest: 05.03.2019</Typography>
                        <MaterialButtonRouter
                          style={{ marginTop: 10 }}
                          component={LinkRouter}
                          to="/"
                          variant="outlined"
                          color="inherit"
                          className={classes.summaryButton}
                        >
                          Print labtests history
                        </MaterialButtonRouter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2} style={{ padding: 5 }} className={classes.boxInfo}>
                    <Card className={classNames(classes.boxItem)}>
                      <CardContent style={{ width: "100%", paddingBottom: 5 }}>
                        <Typography className={classes.numberOf}>1</Typography>
                        <Typography className={classes.object}>BILL</Typography>
                        <Typography className={classes.subTitle}>Last visit is not paid!</Typography>
                        <MaterialButtonRouter
                          style={{ marginTop: 10 }}
                          component={LinkRouter}
                          to="/"
                          variant="outlined"
                          color="inherit"
                          className={classes.summaryButton}
                        >
                          Print bill's history
                        </MaterialButtonRouter>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={2} style={{ padding: 5 }} className={classes.boxInfo}>
                    <Card className={classNames(classes.boxItem)}>
                      <CardContent style={{ width: "100%", paddingBottom: 5 }}>
                        <Typography className={classes.numberOf}>0</Typography>
                        <Typography className={classes.object}>PRESCRIPTIONS</Typography>
                        <Typography className={classes.subTitle}>No drugs are prescribed</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientDetails);
export default styledComponent;
