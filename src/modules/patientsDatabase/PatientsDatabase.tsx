import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import classNames from 'classnames';
import * as React from "react";
import { Link as LinkRouter } from 'react-router-dom';
import { MaterialButtonRouter, MaterialLinkRouter } from '../utils/LinkHelper';
import Patients from "./Patients";
import styles from './PatientsDatabase.style';
import { PatientControllerApi, GetPatientsUsingGETRequest } from '../../generate/apis';
import { Patient } from 'generate';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  error: any;
  isLoaded: boolean;
  items: any[];
  selectedDate: any;
  patients: Array<Patient>;
  visible: Number;
  searchedValue: String;
  open: boolean;
 
}

class PatientsDatabase extends React.Component<Props, State> {


  state: State = {
    error: null,
    isLoaded: false,
    items: [],
    selectedDate: new Date(),
    open: false,
    
  };
   
 
   
  componentDidMount() {

    const patientController: PatientControllerApi = new PatientControllerApi();
    const requestParams: GetPatientsUsingGETRequest = {
      page: 1,
      size: 8,
    }

    patientController.getPatientsUsingGET(requestParams)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,

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
  
  


  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClickClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { classes, theme } = this.props;
    const { items, isLoaded, error } = this.state;


    const patients = (
      items && items.length !== 0 ?
        (items.map((item) => (
          <Patients
            info={item}
          />
        ))) :
        <CircularProgress className={classes.progress} color="secondary" style={{ margin: '20px auto' }} />
    )

    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
          <Grid container item justify='center' spacing={24}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
              </MaterialLinkRouter>
                <Typography color="inherit">Patients</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12} className={classes.patientActions}>
              <Typography variant="inherit" className={classes.patientsTitle}>
                PATIENTS
                            </Typography>
              <Grid>
                <Button color="inherit" onClick={this.handleClickOpen} classes={{ root: classes.button, label: classes.buttonLabel }}>
                  <CancelIcon className={classes.buttonIcon} />
                  Delete a patient
              </Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClickClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"ENTER THE PATIENT'S CODE YOU WANT TO DELETE"}</DialogTitle>
                  <DialogContent>
                    &nbsp;
                    <DialogContentText style={{textAlign:'center'}} id="alert-dialog-description">
                     <b>Attention!</b> This action will completely erase patient data! 
              </DialogContentText>
              &nbsp;
              <Grid className={classes.deleteInputField}>
                    <TextField
                    required
                    id="outlined-required"
                    label="Patient ID"
                    className={classNames(classes.formDeleteField, classes.cssOutlinedInput)}
                    margin="normal"
                    variant="outlined"
                    
                    />
              </Grid>      
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClickClose} color="secondary">
                       <b>EXIT</b> 
                 </Button>
                    <Button onClick={this.handleClickClose} color="secondary">
                      <b>DELETE</b> 
                  </Button>
                  </DialogActions>
                </Dialog>
              </Grid>                  
              <MaterialButtonRouter component={LinkRouter} to="/patientsDatabase/newPatient" color="inherit" classes={{ root: (classNames(classes.button, 'addButton')), label: classes.buttonLabel }}>
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
              <form>
                <Grid container item spacing={24}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="patientID"
                      label="Patient ID (PID)"
                      type="text"
                      className={classNames(classes.formField, classes.cssOutlinedInput)}
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
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="outpatientNumber"
                      label="Outpatient Number (OPD)"
                      className={classNames(classes.formField, classes.cssOutlinedInput)}
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
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="inpatientNumber"
                      label="Inpatient Number (IPD)"
                      className={classNames(classes.formField, classes.cssOutlinedInput)}
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
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
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
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container justify="flex-end" item spacing={24}>
                  <Grid item xs={12} sm={9} />
                </Grid>
              </form>
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
              <FormControl variant="outlined"
                className={classNames(classes.formField, classes.formFieldSelect)}>
                <Select
                  className={classes.select}
                  // value={this.state.age}
                  // onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      placeholder="soma"
                      labelWidth={300} //{this.state.InputLabelRef}
                      name="filter"
                      id="filter"
                      enableSearch
                      // inputProps={{                          
                      classes={{
                        // root: classes.formFieldSelectInput,
                        input: classes.formFieldSelectInput
                      }}
                    // }}
                    />
                  }
                >
                  <MenuItem value={10}>Chronic Patient</MenuItem>
                  <MenuItem value={20}>Properly admission</MenuItem>
                  <MenuItem value={30}>Visited this month</MenuItem>
                  <MenuItem value={30}>Visited last month</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
          <Grid container item style={{ padding: '47px 0' }} spacing={24}>
            {patients}
          </Grid>
          <Grid item xs={12} sm={2} className={classes.loadMoreContainer}>
            <Button type="button" variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
              Load more
            </Button>
          </Grid>
        </Grid>
      </div >
    );
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(PatientsDatabase);
export default styledComponent;