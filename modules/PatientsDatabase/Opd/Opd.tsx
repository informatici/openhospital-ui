import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter } from "react-router-dom";
import { MaterialLinkRouter, MaterialButtonRouter } from "../../utils/LinkHelper";
import classNames from "classnames";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import styles from "./Opd.style";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  InputLabelRef: number;
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
  
}

class Opd extends React.Component<Props, State> {
  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    items: [],
    InputLabelRef: 0
    
  }

  public render() {
    const { classes } = this.props;

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
                <Typography color="inherit">Patient OPD</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.patientTitle}>
                PATIENT OPD
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify="center" spacing={24}>
            <Grid container item justify="center" spacing={24}>
              <Grid item xs={12} sm={3} className={classes.sidebar}>
                <Avatar alt="Remy Sharp" src={""} className={classes.avatar}>
                  <AddPhotoIcon />
                </Avatar>
                <Typography color="inherit" className={classes.avatarTitle}>
                  HEALTH INFORMATION
                </Typography>
                <Typography color="inherit" className={classes.patientIdTitle}>
                  PATIENT ID
                </Typography>
                <Typography color="inherit" className={classes.patientIdNumber}>
                  32040
                </Typography>
                <Typography color="inherit" className={classes.opdTitle}>
                  OPD
                </Typography>
                <Typography color="inherit" className={classes.opdNumber}>
                  8937821
                </Typography>
                <Typography color="inherit" className={classes.bloodGroup}>
                  Blood Group
                </Typography>
                <Typography color="inherit" className={classes.bloodType}>
                  A+
                </Typography>
                <Typography color="inherit" className={classes.notes}>
                  Notes:
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  Pneumonia and malnutrition
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  Grasses, Gluten
                </Typography>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Typography color="inherit" className={classes.admissionDate}>
                  Last Admission:&nbsp;<b>22.01.2019</b>
                </Typography>
                <Typography color="inherit" className={classes.reasonVisit}>
                  Reason for visit:
                </Typography>
                <Typography color="inherit" className={classes.reasonVisitType}>
                  {" "}
                  Pneumonia and malnutrition
                </Typography>
                <Typography color="inherit" className={classes.treatment}>
                  Treatment made:
                </Typography>
                <Typography color="inherit" className={classes.treatmentType}>
                  {" "}
                  Pneumonia and malnutrition
                </Typography>
                <MaterialButtonRouter
                  style={{ marginTop: 30 }}
                  component={LinkRouter}
                  to="/"
                  variant="outlined"
                  color="inherit"
                  classes={classes.detailButtonLabelPrint}
                >
                  Print health information
                </MaterialButtonRouter>
              </Grid>
              <Grid item xs={12} sm={9} className={classes.patientContent}>
                <Grid item xs={12} className={classes.patientProfileHeader}>
                  <div style={{ flexDirection: "column", textAlign: "left" }}>
                    <Typography color="inherit" className={classes.patientName}>
                      Modotoky Tokai
                    </Typography>
                    <Typography color="inherit" className={classes.patientAddress}>
                      Provenance: <b>District, Village</b>
                    </Typography>
                  </div>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Grid item xs={24} justify="center" className={classes.patientRadioOpd}>
                  <FormControlLabel
                    value="End"
                    control={<Radio color="secondary" />}
                    label="Re-Attendance"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="End"
                    control={<Radio color="secondary" />}
                    label=" New-Attendance"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="End"
                    control={<Radio color="secondary" />}
                    label=" Referral from"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="End"
                    control={<Radio color="secondary" />}
                    label=" Referral to"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid container item spacing={24} className={classes.opdHeader} >
                <Grid style={{marginLeft:30}}>
                    <Typography variant="inherit" className={classes.attendanceTitle}>
                      ATTENDANCE DATE
                    </Typography>
                </Grid> 
                <Grid style={{marginLeft:10}}>   
                    &nbsp;
                    <TextField
                      id="date"
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid style={{marginLeft:120}}>
                    <Typography  variant="inherit" className={classes.opdNumberTitle}>
                      OPD N°
                    </Typography>
                    </Grid>
                    <Grid style={{marginLeft:10}}>
                    <TextField
                      id="outlined-input"
                      
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={24} justify="center" className={classes.deseaseHeader}>
                <Grid >
                    <Typography  variant="inherit" className={classes.opdNumberTitle}>
                      DESEASE TYPE
                    </Typography>
                    </Grid>
                    &emsp;
                    <Grid className={classes.formDeseaseField}>
                    <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="​desease type"
                      classes={{
                        root: classes.formFieldInputLabel,
                        focused: classes.selectLabel,
                      }}
                    >
                     Select type from the list below
                    </InputLabel>
                    <Select
                      input={
                        <OutlinedInput
                          labelWidth={this.state.InputLabelRef}
                          
                          id="desease type"
                          classes={{
                            input: classes.formFieldSelectInput,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>item1</MenuItem>
                      <MenuItem value={20}>item2</MenuItem>
                      <MenuItem value={30}>item3</MenuItem>
                      <MenuItem value={40}>item4</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                </Grid>
                <Grid container item spacing={24} justify="center" className={classes.deseaseHeader}>
                <Grid >
                    <Typography  variant="inherit" className={classes.opdNumberTitle}>
                      DIAGNOSIS 
                    </Typography>
                    </Grid>
                    &emsp;
                    <Grid className={classes.formDiagnosisField}>
                    <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="​diagnosis type"
                      classes={{
                        root: classes.formFieldInputLabel,
                        focused: classes.selectLabel,
                      }}
                    >
                    Select type from the list below
                    </InputLabel>
                    <Select
                      
                      input={
                        <OutlinedInput
                          labelWidth={this.state.InputLabelRef}
                          n
                          id="diagnosis type"
                          classes={{
                            input: classes.formFieldSelectInput,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>item1</MenuItem>
                      <MenuItem value={20}>item2</MenuItem>
                      <MenuItem value={30}>item3</MenuItem>
                      <MenuItem value={40}>item4</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                </Grid>
                <Grid container item spacing={24} justify="center" className={classes.deseaseHeader}>
                <Grid >
                    <Typography  variant="inherit" className={classes.opdNumberTitle}>
                      DIAGNOSIS N°2
                    </Typography>
                    </Grid>
                    &emsp;
                    <Grid>
                    <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="​diagnosis type"
                      classes={{
                        root: classes.formFieldInputLabel,
                        focused: classes.selectLabel,
                      }}
                    >
                    Select type from the list below
                    </InputLabel>
                    <Select
                      
                      input={
                        <OutlinedInput
                          labelWidth={this.state.InputLabelRef}
                          id="diagnosis type"
                          classes={{
                            input: classes.formFieldSelectInput,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>item1</MenuItem>
                      <MenuItem value={20}>item2</MenuItem>
                      <MenuItem value={30}>item3</MenuItem>
                      <MenuItem value={40}>item4</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                </Grid>
                <Grid container item spacing={24} justify="center" className={classes.deseaseHeader}>
                <Grid >
                    <Typography  variant="inherit" className={classes.opdNumberTitle}>
                      DIAGNOSIS N°3
                    </Typography>
                    </Grid>
                    &emsp;
                    <Grid>
                    <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="​diagnosis type"
                      classes={{
                        root: classes.formFieldInputLabel,
                        focused: classes.selectLabel,
                      }}
                    >
                    Select type from the list below
                    </InputLabel>
                    <Select
                      
                      input={
                        <OutlinedInput
                          labelWidth={this.state.InputLabelRef}
                          id="diagnosis type"
                          classes={{
                            input: classes.formFieldSelectInput,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>item1</MenuItem>
                      <MenuItem value={20}>item2</MenuItem>
                      <MenuItem value={30}>item3</MenuItem>
                      <MenuItem value={40}>item4</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                </Grid>
                <Grid item style={{ marginTop: 50 }} xs={12} sm={12}>
                  <Typography color="inherit" className={classes.opdNotes}>
                    NOTES & SYMPTOM
                  </Typography>
                  <TextField
                    id="Notes"
                    className={classNames(classes.formField, classes.cssOutlinedInput)}
                    InputLabelProps={{
                      classes: {
                        root: classes.formFieldInputLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.formFieldInputNotes,
                        notchedOutline: classes.cssOutlinedInput,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} spacing={24} style={{ marginTop: 50, marginBottom: 20 }} className={classes.detailButtonContainer}>
                  <MaterialButtonRouter
                    component={LinkRouter}
                    to="/"
                    variant="contained"
                    color="secondary"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}
                  >
                    <KeyboardArrowRightIcon />
                    Save OPD data
                  </MaterialButtonRouter>
                  <MaterialButtonRouter
                    component={LinkRouter}
                    to="/PatientDatabase/PatientLabTest"
                    variant="contained"
                    color="secondary"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}
                  >
                    <KeyboardArrowRightIcon />
                    Exam Lab Test
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

const styledComponent = withStyles(styles, { withTheme: true })(Opd);
export default styledComponent;
