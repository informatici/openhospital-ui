import React, { Component } from "react";
import { Link as LinkRouter, RouteProps, RouteComponentProps } from "react-router-dom";
import _ from "lodash";

// local imports
import { MaterialLinkRouter, MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";
import styles from "./styles/PatientDetails.style";
import ListHeader from "../sharedComponents/ListHeader";
import AppoitmentsItem from "../sharedComponents/AppointmentsItem";
import SummaryItem from "../sharedComponents/SummaryItem";
import HealthInfoBar from "./HealthInfoBar";
import Calendar from "../../shared/lib/calendar/index";
import { PatientControllerApi, GetPatientUsingGETRequest } from '../../generate/apis';
import { Patient } from 'generate';

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Tooltip from '@material-ui/core/Tooltip';
import { Collapse, FormControl, InputLabel, Select, MenuItem, OutlinedInput, List, ListItem, ListItemSecondaryAction } from '@material-ui/core';

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

class PatientDetails extends Component<IProps> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        openOptionalInfo: false,
    };

    handleClickCollapseOptionalInfo = () => {
        this.setState(state => ({ openOptionalInfo: !state.openOptionalInfo }));
    };

    render() {
        const { classes } = this.props;
        const patientInfo = {
            isChronic: false,
            lastDocWhoVisitedHim: {
                name: "Marcus",
                surname: "Marcus",
                occupation: "Anesthesiologist",
                phone: "555 911 118",
                email: "doc@hospital.org",
            }
            firstName: "Antônio",
            secondName: "Carlos Jobim",
            code: 123456,
            age: 87,
            sex: "M",
            gender: "undefined",
            photo: null,
            bloodType: "A+",
            nextKin: "Jorge de Oliveira Jobim",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            lastAdmission: "22.01.2019",
            reasonOfVisit: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            treatment: "Bloodletting"
            address: "Rua do Catete 90, Glória, Rio de Janeiro - RJ"
        } //TODO this data has to be fetched from store after redux's ready
        const { openOptionalInfo } = this.state;
        {openOptionalInfo ? <ExpandLess /> : <ExpandMore />;}
        return (
            <Grid item xs={12} sm={9} className={classes.patientContent}>
                <Grid item xs={12} className={classes.patientProfileHeader}>
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                        <Typography color="inherit" className={classes.patientName}>
                            {patientInfo.firstName} {patientInfo.secondName}
                        </Typography>
                        <Typography color="inherit" className={classes.patientAddress}>
                            Address: <b>{patientInfo.address}</b>
                        </Typography>
                    </div>
                    <MaterialButtonRouter component={LinkRouter} to="/PatientDatabase/PatientAdmission" variant="outlined" color="inherit" classes={{ root: classes.admissionButton }}>
                        New Admission
                    </MaterialButtonRouter>
                    <MaterialButtonRouter component={LinkRouter} to="/PatientDatabase/PatientVisit" variant="outlined" color="inherit" classes={{ root: classes.visitButton }}>
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
                        }}/>
                    <Collapse in={openOptionalInfo} style={{ width: "100%" }} timeout="auto">
                        <Grid item xs={12} justify="center">
                            <List classes={{ root: classes.appointments }}>
                                <ListHeader/>
                                <AppoitmentsItem/>
                                <AppoitmentsItem/>
                                <AppoitmentsItem/>
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
                        classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                        <KeyboardArrowRightIcon/>
                            Pay the bill
                    </MaterialButtonRouter>
                    <MaterialButtonRouter
                        component={LinkRouter}
                        to="/PatientDatabase/PatientExamination"
                        variant="contained"
                        color="secondary"
                        classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                        <KeyboardArrowRightIcon/>
                        Examination
                    </MaterialButtonRouter>
                    <MaterialButtonRouter
                        component={LinkRouter}
                        to="/PatientDatabase/PatientVaccine"
                        variant="contained"
                        color="secondary"
                        classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                        <KeyboardArrowRightIcon/>
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
                    <SummaryItem/>
                    <SummaryItem/>
                    <SummaryItem/>
                    <SummaryItem/>
                    <SummaryItem/>
                </Grid>
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientDetails);
export default styledComponent;
