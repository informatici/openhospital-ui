import React, { Component } from "react";
import _ from "lodash";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";
import styles from "./styles/PatientTherapy.style";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";

export interface Props extends WithStyles<typeof styles> {}

interface State {
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: any;
}

class PatientTherapy extends Component<Props, State> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        items: [],
    };
    InputLabelRef: InputLabel | null;

    public render() {
        const { classes, patient } = this.props;
        return (
            <Grid item xs={12} sm={9} className={classes.colleagueContent}>
                <Grid item xs={12} className={classes.colleagueProfileHeader}>
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                        <Typography color="inherit" className={classes.patientName}>
                            {patient.firstName} {patient.secondName}
                        </Typography>
                        <Typography color="inherit" className={classes.patientAddress}>
                            Address: <b>{patient.address}</b>
                        </Typography>
                    </div>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Grid item xs={12} className={classes.colleagueProfileHeader}>
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                        <Typography color="inherit" className={classes.formTitle}>
                            COMPLETE THE FORM
                        </Typography>
                    </div>
                    <Grid style={{marginLeft:400}}>
                        <Typography variant="inherit" className={classes.dateTitle}>
                            DATE
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
                            }}/>
                    </Grid>
                </Grid>
                &emsp;
                <Grid container item spacing={24}>
                    <Grid container item xs={3}>
                        <Typography color="inherit" className={classes.drugPrescribed}>
                            STARTS
                        </Typography>
                        <TextField
                            placeholder="dd/mm/yyyy"
                            className={classNames(classes.formField, classes.cssOutlinedInput)}
                            InputLabelProps={{
                                classes: {
                                    root: classes.formFieldInputLabel,
                                    ocused: classes.cssFocused,
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
                    &emsp;
                    <Grid container item xs={3}>
                        <Typography color="inherit" className={classes.drugPrescribed}>
                            ENDS
                        </Typography>
                        <TextField
                            placeholder="dd/mm/yyyy"
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
                            variant="outlined"/>
                    </Grid>
                </Grid>
                <Grid container item spacing={24}>
                    <Grid item xs={6}>
                        <FormControl
                            variant="outlined"
                            className={classNames(classes.formField, classes.formFieldSelect)}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="type od drugs"
                                classes={{
                                    root: classes.formFieldInputLabel,
                                    focused: classes.selectLabel,
                                }}>
                                Select drug for therapy
                            </InputLabel>
                            <Select
                                className={classes.select}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.InputLabelRef}
                                        id="Service type"
                                        classes={{
                                            input: classes.formFieldSelectInput,
                                        }}/>
                                }>
                                <MenuItem value={10}>item1</MenuItem>
                                <MenuItem value={20}>Laboratory </MenuItem>
                                <MenuItem value={30}>test2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={3}>
                        <TextField
                            placeholder="Quantity"
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
                            variant="outlined"/>
                    </Grid>
                </Grid>
                <Grid container item spacing={24}>
                    <Grid container item xs={6}>
                        <Typography color="inherit" className={classes.frequencyDrugs}>
                            FREQUENCY WITHIN DAY
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item spacing={24}>
                    &nbsp; 
                    <Grid container item xs={6}>
                        <FormControlLabel
                            value="ONE"
                            control={<Radio color="secondary" />}
                            label="ONE"
                            labelPlacement="ONE"/>
                        <FormControlLabel
                            value="TWO"
                            control={<Radio color="secondary" />}
                            label="TWO"
                            labelPlacement="TWO"/>
                        <FormControlLabel
                            value="THREE"
                            control={<Radio color="secondary" />}
                            label="THREE"
                            labelPlacement="THREE"/>
                    </Grid>
                </Grid>
                <Grid container item spacing={24}>
                    <Grid container item xs={6}>
                        <Typography color="inherit" className={classes.frequencyDrugs}>
                            FREQUENCY WITHIN PERIOD
                        </Typography>  
                    </Grid>
                </Grid>
                <Grid container item spacing={24}>
                    &nbsp;
                    <Grid  xs={2}>
                        <Typography style={{paddingTop:30,marginLeft:5}} color="inherit" className={classes.drugPrescribed}>
                            EVERY
                        </Typography>
                    </Grid>
                    <Grid container style={{marginLeft:"-70px"}} item xs={2}>
                        <TextField
                            placeholder="N° days"
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
                            variant="outlined"/>
                    </Grid>
                    <Grid  xs={2}>
                        <Typography style={{paddingTop:30,marginLeft:5}} color="inherit" className={classes.drugPrescribed}>
                            DAYS
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item spacing={24}>
                    <Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
                        <Typography color="inherit" className={classes.drugPrescribed}>
                            NOTES
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
                            variant="outlined"/>
                    </Grid>
                </Grid>
                <Grid item xs={12} spacing={24} style={{ marginTop: 50, marginBottom: 20 }} className={classes.detailButtonContainer}>
                    <MaterialButtonRouter
                        component={LinkRouter}
                        to="/patientsDatabase"
                        variant="contained"
                        color="secondary"
                        classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                        <KeyboardArrowRightIcon />
                        Save therapy
                    </MaterialButtonRouter>
                    <MaterialButtonRouter
                        component={LinkRouter}
                        to="/patientsDatabase"
                        variant="contained"
                        color="secondary"
                        classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                        <KeyboardArrowRightIcon />
                        Notify & SMS
                    </MaterialButtonRouter>
                </Grid>
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientTherapy);
export default styledComponent;
