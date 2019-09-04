import React, { Component } from "react";
import { Link as LinkRouter } from 'react-router-dom';
import { connect } from 'react-redux'

// local imports
import { MaterialButtonRouter} from '../utils/LinkHelper';
import PatientsListItem from "./PatientsListItem";
import styles from './styles/PatientsDatabase.style';
import classNames from 'classnames';
import DeletePatientDialog from "./DeletePatientDialog";
import PatientBasicInfoForm from "../sharedComponents/PatientBasicInfoForm"
import BreadcrumbTrail from "../sharedComponents/BreadcrumbTrail"
import { objectToArray } from '../../helpers/objectToArray'
import { AppState } from '../../reducers/index';
import { Patient } from '../../types/patients';

// redux imports
import { getPatientsThunk } from "../../actions/patients";

// material imports
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MergeIcon from '@material-ui/icons//LibraryBooks';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

// constants
import { PATH_NEW_PATIENT } from "../../helpers/constants";

export interface LocalProps extends WithStyles<typeof styles> { 
    classes: any,
    classNames: any,
}

interface StateProps {
    patients: Array<Patient>,
    loading: boolean,
}

interface DispatchProps {
    getPatients: () => void,
}

type Props = StateProps & DispatchProps & LocalProps

interface State {
    isDeleteDialogOpen: boolean
}

class PatientsDatabase extends Component<Props, State> {
    state: State = {
        isDeleteDialogOpen: false,
    }

    componentDidMount() {
        this.props.getPatients();
    }

    keywordInput = (classes: any, classNames: any) => {
        // this function defines an extra input for PatientBasicInfoForm, which has three default inputs,
        // that are responsible for gathering Patient ID, Outpatient number and Inpatient number.
        return (
            <Grid item xs={12} sm={3}>
                <TextField
                    id="keyword"
                    label="Keyword"
                    className={classNames(classes.formField, classes.cssOutlinedInput)}
                    placeholder="First name, last name, tax number..."
                    InputLabelProps={{
                        classes: {
                            root: classes.formFieldInputLabel,
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.formFieldInput,
                            notchedOutline: classes.cssOutlinedInput,
                        },
                    }}
                    margin="normal"
                    variant="outlined" />
            </Grid>
        )
    }

    public render() {
        const { classes, patients, loading } = this.props;
        const { isDeleteDialogOpen } = this.state;
        return (
            <div className={classes.root}>
                <Grid container className={classes.gridContainer} justify='center' spacing={24}>
                    <Grid container item justify='center' spacing={24}>
                        <Grid item xs={12}>
                            <BreadcrumbTrail match={this.props.match} />
                        </Grid>
                        <Grid item xs={12} className={classes.patientActions}>
                            <Typography variant="inherit" className={classes.patientsTitle}>
                                PATIENTS
                            </Typography>
                            <Grid>
                                <Button color="inherit"
                                    onClick={() => this.setState({ isDeleteDialogOpen: true })}
                                    classes={{ root: classes.button, label: classes.buttonLabel }}>
                                    <CancelIcon className={classes.buttonIcon} />
                                    Delete a patient
                                </Button>
                                <DeletePatientDialog
                                    isOpen={isDeleteDialogOpen}
                                    handleClickClose={() => this.setState({ isDeleteDialogOpen: false })} />
                            </Grid>
                            <MaterialButtonRouter component={LinkRouter} to={PATH_NEW_PATIENT} color="inherit" classes={{ root: (classNames(classes.button, 'addButton')), label: classes.buttonLabel }}>
                                <AddIcon className={classes.buttonIcon} />
                                Record new patient
                            </MaterialButtonRouter>
                            <Button color="inherit" classes={{ root: (classNames(classes.button, 'mergeButton')), label: classes.buttonLabel }}>
                                <MergeIcon className={classes.buttonIcon} />
                                Merge double patients' registration
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item justify='center' spacing={24}>
                        <Paper className={classes.paperFlat}>
                            <Grid container item spacing={24} className={classes.inputContainer}>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <Typography variant="inherit" className={classes.findPatients}>
                                        FIND A PATIENT
                                    </Typography>
                                    <Typography variant="inherit" className={classes.insertInfoPatients}>
                                        Insert the information of the patient
                                    </Typography>
                                </Grid>
                            </Grid>
                            <PatientBasicInfoForm extraInput={this.keywordInput} />
                        </Paper>
                    </Grid>
                    <Grid container item spacing={24} className={classes.filterContainer}>
                        <Grid item xs={12} style={{ display: 'flex' }}>
                            <Typography variant="inherit" className={classes.findPatients}>
                                Which patient are you searching for?
                            </Typography>
                            <Typography variant="inherit" className={classes.insertInfoPatients}>
                                Use the filter for a faster search
                            </Typography>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid item xs={12} sm={3}>
                            <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                                <Select
                                    className={classes.select}
                                    input={<OutlinedInput
                                        placeholder="soma"
                                        labelWidth={300} //{this.state.InputLabelRef}
                                        name="filter"
                                        id="filter"
                                        enableSearch
                                        classes={{
                                            input: classes.formFieldSelectInput
                                        }} />}>
                                    <MenuItem value={10}>Chronic Patient</MenuItem>
                                    <MenuItem value={20}>Properly admission</MenuItem>
                                    <MenuItem value={30}>Visited this month</MenuItem>
                                    <MenuItem value={30}>Visited last month</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item style={{ padding: '47px 0' }} spacing={24}>
                        {loading === true ?
                            <CircularProgress className={classes.progress} color="secondary" style={{ margin: '20px auto' }} />
                            :
                            (patients.map((patient) => (<PatientsListItem key={patient.id} patient={patient} />)))}
                    </Grid>
                    <Grid item xs={12} sm={2} className={classes.loadMoreContainer}>
                        <Button type="button" variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
                            Load more
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        patients: objectToArray(state.patients),
        loading: state.loading,
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        getPatients: () => dispatch(getPatientsThunk()),
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientsDatabase);
export default connect<StateProps, DispatchProps, LocalProps>(mapStateToProps, mapDispatchToProps)(styledComponent);