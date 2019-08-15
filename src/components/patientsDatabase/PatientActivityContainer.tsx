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
import PatientDetails from "./PatientDetails";
import PatientAdmission from "./PatientAdmission";
import PatientVisit from "./PatientVisit";
import Opd from "./Opd";
import NewOpd from "./NewOpd";
import PatientTherapy from "./PatientTherapy";
import PatientExamination from "./PatientExamination";
import PatientVaccination from "./PatientVaccination";
import NewVaccination from "./NewVaccination";
import NewLabTest from "./NewLabTest";
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

class PatientActivityContainer extends Component<IProps> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        openOptionalInfo: false,
    };

    activitySwitch = () => {
        const currentPath = this.props.location.pathname
        switch(currentPath){
            case "/patient-database/details/123456":
                return(<PatientDetails/>);
            case "/patient-database/admission":
                return(<PatientAdmission/>);
            case "/patient-database/visit":
                return(<PatientVisit/>);
            case "/patient-database/opd":
                return(<Opd/>)
            case "/patient-database/new-opd":
                return(<NewOpd/>);
            case "/patient-database/therapy":
                return(<PatientTherapy/>);
            case "/patient-database/examination":
                return(<PatientExamination/>);
            case "/patient-database/vaccination":
                return(<PatientVaccination/>);
            case "/patient-database/new-vaccination":
                return(<NewVaccination/>);
            case "/patient-database/new-lab-test":
                return(<NewLabTest/>)
            default:
                return(<div/>);
        }
    }

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
                            <HealthInfoBar patientInfo={patientInfo}/>
                            {this.activitySwitch()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientActivityContainer);
export default styledComponent;
