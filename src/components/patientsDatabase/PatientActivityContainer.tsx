import React, { Component } from "react";
import { Link as LinkRouter, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux'
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
import { getPatientThunk, clearPatientInDetails } from '../../actions/patientInDetails';

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

interface IProps extends RouteComponentProps<Props> { }

class PatientActivityContainer extends Component<IProps> {
    state = {
        patient: {},
    }

    componentDidMount(){
        const { id, patient } = this.props.location

        this.props.getPatient(id);
    }

    componentWillUnmount(){
        this.props.clearPatientInDetails();
    }

    getActivityTitle = () => {
        const currentPath = this.props.location.pathname
        switch(currentPath){
            case PATH_PATIENT_DETAILS:
                return "Patient Details";
            case PATH_PATIENT_ADMISSION:
                return "Patient Admission";
            case PATH_PATIENT_VISIT:
                return "Patient Visit";
            case PATH_OPD:
                return "Outpatient Department History"
            case PATH_NEW_OPD:
                return "New Outpatient Department Registration";
            case PATH_PATIENT_THERAPY:
                return "Patient Therapy";
            case PATH_PATIENT_EXAMINATION:
                return "Patient Examination");
            case PATH_PATIENT_VACCINATION:
                return "Patient Vaccination");
            case PATH_PATIENT_NEW_VACCINATION:
                return "New Vaccionation";
            case PATH_NEW_LAB_TEST:
                return "New Laboratory Test"
            default:
                return "";
        }
    }

    render() {
        const { classes, patientInDetails } = this.props;
        return (
            <div className={classes.root}>
                <Grid container className={classes.gridContainer} justify="center" spacing={24}>
                    <Grid container item spacing={24}>
                        <Grid item xs={12}>
                            <BreadcrumbTrail/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="inherit" className={classes.patientTitle}>
                                {this.getActivityTitle()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item justify="center" spacing={24}>
                        <Grid container item justify="center" spacing={24}>
                            <HealthInfoBar patient={patientInDetails}/>
                            {(() => {
                                switch (this.props.location.pathname) {
                                    case PATH_PATIENT_DETAILS:
                                        return(<PatientDetails patient={patientInDetails}/>);
                                    case PATH_PATIENT_ADMISSION:
                                        return(<PatientAdmission patient={patientInDetails}/>);
                                    case PATH_PATIENT_VISIT:
                                        return(<PatientVisit patient={patientInDetails}/>);
                                    case PATH_OPD:
                                        return(<Opd patient={patientInDetails}/>)
                                    case PATH_NEW_OPD:
                                        return(<NewOpd patient={patientInDetails}/>);
                                    case PATH_PATIENT_THERAPY:
                                        return(<PatientTherapy patient={patientInDetails}/>);
                                    case PATH_PATIENT_EXAMINATION:
                                        return(<PatientExamination patient={patientInDetails}/>);
                                    case PATH_PATIENT_VACCINATION:
                                        return(<PatientVaccination patient={patientInDetails}/>);
                                    case PATH_PATIENT_NEW_VACCINATION:
                                        return(<NewVaccination patient={patientInDetails}/>);
                                    case PATH_NEW_LAB_TEST:
                                        return(<NewLabTest patient={patientInDetails}/>)
                                    default:
                                        return(<div/>);
                                }
                            })()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps ({ patientInDetails }){
    return {
        patientInDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPatient: (id) => dispatch(getPatientThunk(id)),
        clearPatientInDetails: () => dispatch(clearPatientInDetails()),
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientActivityContainer);
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);
