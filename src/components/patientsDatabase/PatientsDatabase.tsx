import React, { Component } from "react";
import { Link as LinkRouter } from 'react-router-dom';

// local imports
import { MaterialButtonRouter, MaterialLinkRouter } from '../utils/LinkHelper';
import PatientsListItem from "./PatientsListItem";
import styles from './styles/PatientsDatabase.style';
import { PatientControllerApi, GetPatientsUsingGETRequest } from '../../generate/apis';
import { Patient } from 'generate';
import classNames from 'classnames';
import DeletePatientDialog from "./DeletePatientDialog";
import PatientBasicInfoForm from "../sharedComponents/PatientBasicInfoForm"
import BreadcrumbTrail from "../sharedComponents/BreadcrumbTrail"

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
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

// constants
import { PATH_NEW_PATIENT } from "../../config/constants";

export interface Props extends WithStyles<typeof styles> {}

interface State {
    error: any;
    isLoaded: boolean;
    items: any[];
    selectedDate: any;
    patients: Array<Patient>;
    visible: Number;
    searchedValue: String;
    isDeleteDialogOpen: boolean;
}

class PatientsDatabase extends Component<Props, State> {
    state: State = {
        error: null,
        isLoaded: false,
        items: [],
        selectedDate: new Date(),
        isDeleteDialogOpen: false,
    };
   
    componentDidMount() {
        const patientController: PatientControllerApi = new PatientControllerApi();
        const requestParams: GetPatientsUsingGETRequest = { page: 1, size: 8 }

        // TEST
        const item = {
            patientInfo: {
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
            }
        };

        const items = [item, item, item, item, item, item, item];
        this.setState({ isLoaded: true, items, });
        // TEST

        // patientController.getPatientsUsingGET(requestParams).then(
        //     (result) => {
        //         this.setState({ isLoaded: true, items: result, });
        //     },
        //     (error) => {
        //       this.setState({ isLoaded: true, error });
        //     }
        // )
    }

    keywordInput = (classes, classNames) => {
        // this function defines an extra input for PatientBasicInfoForm
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
                    variant="outlined"/>
            </Grid>
        )
    }

    public render() {
        const { classes, theme } = this.props;
        const { items, isLoaded, error, isDeleteDialogOpen } = this.state;
        return (
            <div className={classes.root}>
                <Grid container className={classes.gridContainer} justify='center' spacing={24}>
                    <Grid container item justify='center' spacing={24}>
                        <Grid item xs={12}>
                            <BreadcrumbTrail/>
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
                                    handleClickClose={() => this.setState({ isDeleteDialogOpen: false })}/>
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
                            <PatientBasicInfoForm extraInput={this.keywordInput}/>
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
                                                    input: classes.formFieldSelectInput}}/>}>
                                    <MenuItem value={10}>Chronic Patient</MenuItem>
                                    <MenuItem value={20}>Properly admission</MenuItem>
                                    <MenuItem value={30}>Visited this month</MenuItem>
                                    <MenuItem value={30}>Visited last month</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item style={{ padding: '47px 0' }} spacing={24}>
                        {items && items.length !== 0 ?
                            (items.map((item) => (<PatientsListItem info={item}/>)))
                            :
                            <CircularProgress className={classes.progress} color="secondary" style={{ margin: '20px auto' }}/>}
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

const styledComponent = withStyles(styles, { withTheme: true })(PatientsDatabase);
export default styledComponent;