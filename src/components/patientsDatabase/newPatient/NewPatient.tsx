import { Button, Icon } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import classNames from "classnames";
import { Patient } from "generate";
import * as React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { NewPatientUsingPOSTRequest, PatientControllerApi } from "../../../generate/apis";
import { MaterialButtonRouter, MaterialLinkRouter } from "../../utils/LinkHelper";
import styles from "./NewPatient.style";
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
export interface IProps extends WithStyles < typeof styles > {}

interface State {
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: Patient;
    anchorEl ? : any;
}


class NewPatient extends React.Component < IProps, State > {


    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        anchorEl: null,
        items: {},
    };

    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: "",
            secondName: "",
            name: "",
            birthDate: Date("1968-07-17"),
            age: Number(),
            agetype: "",
            sex: "",
            taxCode: "",
            address: "",
            city: "",
            telephone: "",
            nextKin: "",
            bloodType: "",
            hasInsurance: "U",
            father: "U",
            mother: "U",
            parentTogether: "U",
            lock: 2,
        };
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        const Patient = this.state;
        const { classes } = this.props;
        const patientController: PatientControllerApi = new PatientControllerApi();
        const requestParams: NewPatientUsingPOSTRequest = {
            newPatient: Patient,
        };

        patientController.newPatientUsingPOST(requestParams)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                    window.location.href = "/PatientDatabase/PatientDetails/" + this.state.items.code
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                    this.setState({ snackbaropen: true, snackbarmsg: "ERROR!! : (check if the data has been entered correctly)" })
                },
            );
    };





    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <SnackBar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={this.state.snackbaropen}
              autoHideDuration={6000}
              TransitionProps={{direction: "left"}}
              onClose={this.snackbarClose}>
              <SnackbarContent
                className={classes.error}
                message={<span className={classes.message}>{this.state.snackbarmsg}</span>}
              />
            </SnackBar>
            <form>
              <Grid container className={classes.gridContainer} justify="center" spacing={24}>
                <Grid container item spacing={24}>
                  <Grid item xs={12}>
                    <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                      <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                        Home
                      </MaterialLinkRouter>
                      <MaterialLinkRouter color="secondary" component={LinkRouter} to="/patientsDatabase">
                        <Typography color="inherit">Patients</Typography>
                      </MaterialLinkRouter>
                      <Typography color="inherit">New patient registration</Typography>
                    </Breadcrumbs>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="inherit" className={classes.colleaguesTitle}>
                      NEW PATIENT REGISTRATION
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item justify="center" spacing={24}>
                  <Grid container item justify="center" spacing={24}>
                    <Grid item xs={12} sm={3} className={classes.sidebar}>
                      {/* <Typography color="inherit" className={classes.contacts}>PATIENT REGISTRATION</Typography>
                    <Divider className={classes.divider} /> */}
                      <Avatar alt="Remy Sharp" src={""} className={classes.avatar}>
                        <AddPhotoIcon />
                      </Avatar>
                      <Typography color="inherit" className={classes.avatarTitle}>
                        Take a photo of the patient or go to gallery
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={9} className={classes.colleagueContent} spacing={24}>
                      <Typography color="inherit" className={classes.formDescription}>
                        All fields with * are mandatory. Patient data will be saved within the archive patients. At the end
                        of
                        the process you will be able to register a visit.
                      </Typography>
                      <Grid container item xs={12} spacing={24}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required={true}
                            name='firstName'
                            label="FirstName"
                            onChange={event => this.handleChange(event)}
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
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required={true}
                            name='secondName'
                            label="SecondName"
                            onChange={event => this.handleChange(event)}
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
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container item xs={12} spacing={24}>
                        <Grid item xs={12} sm={2}>
                          <TextField
                            required={true}
                            name="age"
                            label="Years"
                            onChange={event => this.handleChange(event)}
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

                        <Grid item xs={4} sm={2}>
                          <TextField
                            required={true}
                            name='birthDate'
                            label="Birthdate"
                            onChange={event => this.handleChange(event)}
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
                        <Grid item xs={2} sm={2}>
                          <FormControl variant="outlined"
                            className={classNames(classes.formField, classes.formFieldSelect)}>
                            <InputLabel
                              ref={ref => {
                                this.InputLabelRef = ref;
                              }}
                              htmlFor="sex"
                              classes={{
                                root: classes.formFieldInputLabel,
                                focused: classes.selectLabel,
                              }}
                            >
                              Sex *
                            </InputLabel>
                            <Select
                              required={true}
                              className={classes.select}
                              onChange={event => this.handleChange(event)}
                              input={
                                <OutlinedInput
                                  labelWidth={this.state.InputLabelRef}
                                  label="​sex"
                                  name='sex'
                                  // inputProps={{
                                  classes={{
                                    // root: classes.formFieldSelectInput,
                                    input: classes.formFieldSelectInput,
                                  }}
                                // }}
                                />
                              }
                            >
                              <MenuItem value={"M"}>M</MenuItem>
                              <MenuItem value={"F"}>F</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required={true}
                            name='taxCode'
                            label="Tax Number"
                            onChange={event => this.handleChange(event)}
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
                      </Grid>

                      <Grid container item xs={12} spacing={24}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required={true}
                            name='city'
                            label="City"
                            onChange={event => this.handleChange(event)}
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
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required={true}
                            name='address'
                            label="Address"
                            onChange={event => this.handleChange(event)}
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
                      </Grid>
                      <Grid container item xs={12} spacing={24}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name='telephone'
                            label="Contact"
                            onChange={event => this.handleChange(event)}
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
                      </Grid>

                      <Grid container item xs={12} spacing={24}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required={true}
                            name='nextKin'
                            label="Next of kin"
                            onChange={event => this.handleChange(event)}
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
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="nextOfKinContact"
                            label="Next of kin contact"

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
                      </Grid>
                      <Grid container item xs={12} spacing={24}>
                        <Typography
                          style={{ display: "flex", alignItems: "center" }}
                          color="inherit"
                          className={classes.test}
                         
                        >
                          Other optional information
                         
                        </Typography>
                      </Grid>
                      {/* <Grid container item xs={12} spacing={24}> */}
                        <Grid container xs={12} spacing={24}>
                          <Grid item xs={12} sm={3}>
                            <FormControl
                              variant="outlined"
                              className={classNames(classes.formField, classes.formFieldSelect)}
                            >
                              <InputLabel
                                ref={ref => {
                                  this.InputLabelRef = ref;
                                }}
                                htmlFor="bloodGroup"
                                classes={{
                                  root: classes.formFieldInputLabel,
                                  focused: classes.selectLabel,
                                }}
                              >
                                Blood Group *
                              </InputLabel>
                              <Select
                                required={true}

                                className={classes.select}
                                onChange={event => this.handleChange(event)}
                                input={
                                  <OutlinedInput
                                    labelWidth={this.state.InputLabelRef}

                                    name='bloodType'
                                    // inputProps={{
                                    classes={{
                                      // root: classes.formFieldSelectInput,
                                      input: classes.formFieldSelectInput,
                                    }}
                                  // }}
                                  />
                                }
                              >
                                <MenuItem value={"0+"}>0+</MenuItem>
                                <MenuItem value={"0-"}>0-</MenuItem>
                                <MenuItem value={"A+"}>A+</MenuItem>
                                <MenuItem value={"A-"}>A-</MenuItem>
                                <MenuItem value={"B+"}>B+</MenuItem>
                                <MenuItem value={"B-"}>B-</MenuItem>
                                <MenuItem value={"AB+"}>AB+</MenuItem>
                                <MenuItem value={"AB-"}>AB-</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id="relationship"
                              label="Relationship"
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
                        </Grid>
                        <Grid container xs={12} spacing={24}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id="educationalLevel"
                              label="Educational Level"
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
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id="hasInsurance"
                              label="Insurance"
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
                        </Grid>
                        <Grid container xs={12} spacing={24}>
                          <Grid item xs={12} sm={1}>
                            <TextField
                              id="hh"
                              label="hh"
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
                          <Grid item xs={12} sm={1}>
                            <TextField
                              id="mm"
                              label="mm"
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
                          <Grid item xs={12} sm={1}>
                            <TextField
                              id="dd"
                              label="dd"
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
                          <Grid item xs={12} sm={6}>
                            <TextField
                              id="transport"
                              label="Transport"
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
                        </Grid>
                      {/* </Grid> */}
                      <Grid item xs={12} spacing={24} className={classes.detailButtonContainer}>
                       
                        <Button
                          onClick={this.handleSubmit}
                          variant="contained"
                          color="secondary"
                          classes={{ root: classes.detailInfoButton, label: classes.detailButtonLabelInverse }}
                        >
                          <KeyboardArrowRightIcon />
                          Save the information
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(NewPatient);
export default styledComponent;