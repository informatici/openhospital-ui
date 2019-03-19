import * as React from "react";
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as LinkRouter, LinkProps } from 'react-router-dom';
import { MaterialNavLinkRouter, MaterialLinkRouter, MaterialButtonRouter } from '../../utils/LinkHelper';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Select from '@material-ui/core/Select';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import ChatIcon from '@material-ui/icons/Sms';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import maleAvatar from "../../../assets/images/male.png";
import femaleAvatar from '../../../assets/images/female.png';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import CardContent from '@material-ui/core/CardContent';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';

import styles from './NewPatient.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
  anchorEl?: any,
  openOptionalInfo: boolean,
}

class ColleagueDetails extends React.Component<Props, State> {

  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    items: [],
    anchorEl: null,
    openOptionalInfo: false,
  };

  componentDidMount() {
    // fetch("https://uinames.com/api/?ext&amount=9")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {

    //       setTimeout(() => {
    //         this.setState({
    //           isLoaded: true,
    //           items: result
    //         });
    //       }, 300)
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  };

  handleClickCollapseOptionalInfo = () => {
    this.setState(state => ({ openOptionalInfo: !state.openOptionalInfo }));
  };


  public render() {
    const { classes } = this.props;
    const { anchorEl, openOptionalInfo } = this.state;
    // const { items, isLoaded, error } = this.state;

    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
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
          <Grid container item justify='center' spacing={24}>
            <Grid container item justify='center' spacing={24}>
              <Grid item xs={12} sm={3} className={classes.sidebar}>
                {/* <Typography color="inherit" className={classes.contacts}>PATIENT REGISTRATION</Typography>
                <Divider className={classes.divider} /> */}


                <Avatar alt="Remy Sharp" src={''} className={classes.avatar} >
                  {/* _.sample([maleAvatar, femaleAvatar]) */}
                  <AddPhotoIcon />
                </Avatar>

                <Typography color="inherit" className={classes.avatarTitle}>Take a photo of the patient or go to gallery</Typography>


              </Grid>
              <Grid container item xs={12} sm={9} className={classes.colleagueContent} spacing={24}>
                <Typography color="inherit" className={classes.formDescription}>All fields with * are mandatory.
                Patient data will be saved within the archive patients.
                    At the end of the process you will be able to register a visit.</Typography>

                <Grid container item xs={12} spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      label="First name"
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
                      required
                      id="otherName"
                      label="Other name"
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
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      id="years"
                      label="Years"
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
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      id="months"
                      label="Months"
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
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      id="days"
                      label="Days"
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
                      required
                      id="birthdate"
                      label="Birthdate"
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
                    <FormControl variant="outlined"
                      className={classNames(classes.formField, classes.formFieldSelect)}>
                      <InputLabel
                        required
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="sex"
                        classes={{
                          root: classes.formFieldInputLabel,
                          focused: classes.selectLabel
                        }}
                      >
                        Sex
                      </InputLabel>
                      <Select

                        className={classes.select}
                        // value={this.state.age}
                        // onChange={this.handleChange}
                        input={
                          <OutlinedInput

                            labelWidth={this.state.InputLabelRef}
                            name="​sex"
                            id="sex"
                            // inputProps={{                          
                            classes={{
                              // root: classes.formFieldSelectInput,
                              input: classes.formFieldSelectInput
                            }}
                          // }}
                          />
                        }
                      >
                        <MenuItem value={10}>M</MenuItem>
                        <MenuItem value={20}>F</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="taxNumber"
                      label="Tax Number"
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
                      id="otherNumber"
                      label="Other number"
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
                      required
                      id="city"
                      label="City"
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
                      required
                      id="address"
                      label="Address"
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
                      required
                      id="contact"
                      label="Contact"
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
                      required
                      id="nextOfKin"
                      label="Next of kin"
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
                      required
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
                  <Typography style={{display: 'flex', alignItems: 'center'}} color="inherit" className={classes.test} onClick={this.handleClickCollapseOptionalInfo}>
                    Other optional information
                  {openOptionalInfo ?
                      <ExpandLess /> : <ExpandMore />}
                  </Typography>
                </Grid>
                {/* <Grid container item xs={12} spacing={24}> */}
                <Collapse in={openOptionalInfo} style={{ width: '100%' }} timeout="auto" unmountOnExit>

                  <Grid container xs={12} spacing={24}>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant="outlined"
                        className={classNames(classes.formField, classes.formFieldSelect)}>
                        <InputLabel
                          required
                          ref={ref => {
                            this.InputLabelRef = ref;
                          }}
                          htmlFor="bloodGroup"
                          classes={{
                            root: classes.formFieldInputLabel,
                            focused: classes.selectLabel
                          }}
                        >
                          Blood Group
                      </InputLabel>
                        <Select

                          className={classes.select}
                          // value={this.state.age}
                          // onChange={this.handleChange}
                          input={
                            <OutlinedInput

                              labelWidth={this.state.InputLabelRef}
                              name="​sex"
                              id="sex"
                              // inputProps={{                          
                              classes={{
                                // root: classes.formFieldSelectInput,
                                input: classes.formFieldSelectInput
                              }}
                            // }}
                            />
                          }
                        >
                          <MenuItem value={10}>0+</MenuItem>
                          <MenuItem value={10}>0-</MenuItem>
                          <MenuItem value={10}>A+</MenuItem>
                          <MenuItem value={10}>A-</MenuItem>
                          <MenuItem value={10}>B+</MenuItem>
                          <MenuItem value={10}>B-</MenuItem>
                          <MenuItem value={10}>AB+</MenuItem>
                          <MenuItem value={10}>AB-</MenuItem>
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
                        id="insurance"
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

                </Collapse>
                {/* </Grid> */}

                <Grid item xs={12} spacing={24} className={classes.detailButtonContainer}>
                  <MaterialButtonRouter component={LinkRouter} to="/patientsDatabase" variant="contained" color="secondary" classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                    <KeyboardArrowRightIcon />
                    Save and start a visit
                    </MaterialButtonRouter>
                  <MaterialButtonRouter component={LinkRouter} to="/patientsDatabase" variant="outlined" color="inherit" classes={{ root: classes.detailButton }}>
                    <KeyboardArrowRightIcon />
                    Save the information
                    </MaterialButtonRouter>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(ColleagueDetails);
export default styledComponent;