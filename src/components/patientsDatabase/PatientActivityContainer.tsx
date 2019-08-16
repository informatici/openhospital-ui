import React, { Component } from "react";
import { Link as LinkRouter, RouteComponentProps } from "react-router-dom";
import _ from "lodash";

// local imports
import { MaterialLinkRouter } from "../utils/LinkHelper";
import styles from "./styles/PatientDetails.style";
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
import { Patient } from 'generate';
import BreadcrumbTrail from "../sharedComponents/BreadcrumbTrail"

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// constants
import { 
    PATH_PATIENT_DETAILS,
    PATH_PATIENT_VISIT,
    PATH_PATIENT_ADMISSION,
    PATH_NEW_LAB_TEST,
    PATH_PATIENT_THERAPY,
    PATH_PATIENT_EXAMINATION,
    PATH_PATIENT_VACCINATION,
    PATH_PATIENT_NEW_VACCINATION,
    PATH_OPD,
    PATH_NEW_OPD,
} from "../../config/constants"

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
            case PATH_PATIENT_DETAILS:
                return(<PatientDetails/>);
            case PATH_PATIENT_ADMISSION:
                return(<PatientAdmission/>);
            case PATH_PATIENT_VISIT:
                return(<PatientVisit/>);
            case PATH_OPD:
                return(<Opd/>)
            case PATH_NEW_OPD:
                return(<NewOpd/>);
            case PATH_PATIENT_THERAPY:
                return(<PatientTherapy/>);
            case PATH_PATIENT_EXAMINATION:
                return(<PatientExamination/>);
            case PATH_PATIENT_VACCINATION:
                return(<PatientVaccination/>);
            case PATH_PATIENT_NEW_VACCINATION:
                return(<NewVaccination/>);
            case PATH_NEW_LAB_TEST:
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
                            <BreadcrumbTrail/>
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
