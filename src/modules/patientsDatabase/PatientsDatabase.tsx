import * as React from "react";
import ReactDOM from 'react-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as LinkRouter, LinkProps } from 'react-router-dom';
import { MaterialButtonRouter, MaterialLinkRouter } from '../utils/LinkHelper';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/Add';
import MergeIcon from '@material-ui/icons//LibraryBooks';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import maleAvatar from "../../assets/images/male.png";
import femaleAvatar from '../../assets/images/female.png';
import Patient from './Patient';

import styles from './PatientsDatabase.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  error: any;
  isLoaded: boolean;
  items: any;
  selectedDate: any;
}

class PatientsDatabase extends React.Component<Props, State> {

  state: State = {
    error: null,
    isLoaded: false,
    items: [],
    selectedDate: new Date(),
  };

  componentDidMount() {
    fetch("https://uinames.com/api/?ext&amount=9")
      .then(res => res.json())
      .then(
        (result) => {

          setTimeout(() => {
            this.setState({
              isLoaded: true,
              items: result
            });
          }, 300)
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


  public render() {
    const { classes, theme } = this.props;
    const { items, isLoaded, error } = this.state;

    const patients = (
      items && items.length !== 0 ?
        (items.map((item: any) => (
          <Patient
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
              <Button color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
                <CancelIcon className={classes.buttonIcon} />
                Delete a patient
                            </Button>
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
                  <Grid item xs={12} sm={3} classes={{ item: classes.searchButton }}>
                    <Button variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
                      Search
                      <KeyboardArrowRightIcon />
                    </Button>
                  </Grid>
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
            <Button variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
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