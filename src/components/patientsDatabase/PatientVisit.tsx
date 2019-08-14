import React, { Component } from "react";
import { Link as LinkRouter } from "react-router-dom";
import _ from "lodash";

// local imports
import { MaterialLinkRouter, MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";
import styles from "./styles/PatientVisit.style";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Tooltip from '@material-ui/core/Tooltip';
import { FormControlLabel } from "@material-ui/core";

export interface Props extends WithStyles<typeof styles> {}

interface State {
    InputLabelRef: number;
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: any;
    anchorEl?: any;
    openOptionalInfo: boolean;
}

class PatientVisit extends React.Component<Props, State> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        items: [],
        openOptionalInfo: false,
        anchorEl: null,
    };

    handleClickCollapseOptionalInfo = () => {
        this.setState(state => ({ openOptionalInfo: !state.openOptionalInfo }));
    };

    render() {
        const { classes } = this.props;
        const { openOptionalInfo } = this.state;
        {openOptionalInfo ? <ExpandLess /> : <ExpandMore />;}

        return (
            <Grid item xs={12} sm={9} className={classes.colleagueContent}>
                <Grid item xs={12} className={classes.colleagueProfileHeader}>
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
                <Grid item xs={12} className={classes.colleagueProfileHeader}>
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                        <Typography color="inherit" className={classes.completeForm}>
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
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="reason for visit"
                        label="Reason for visit"
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
                <Button
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    color="secondary"
                    classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}>
                    BROWSE THE ICD 10
                </Button>
                &emsp;
                <Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
                    <TextField
                        id="Diagnosis"
                        label="Diagnosis"
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
                <Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
                    <Grid xs={3} sm={3}>
                        <Typography color="inherit" className={classes.drugPrescribed}>
                            DRUGS PRESCRIBED
                        </Typography>
                    </Grid>
                    <Tooltip title="Add new patient's therapy" interactive placement="top">
                        <MaterialButtonRouter component={LinkRouter} to="/patientDatabase/PatientTherapy" variant="outlined" color="inherit" classes={{ root: classes.detailButtonTherapy, label: classes.detailButtonLabel }}>
                            THERAPY
                        </MaterialButtonRouter>
                    </Tooltip>
                    <TextField
                        id="Drugs prescribed"
                        placeholder="Describe here which kind of drugs are needed. Please remind to write the quantity."
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
                &emsp;
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
                <Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
                    <Typography color="inherit" className={classes.drugPrescribed}>
                        Prescribe laboratory tests
                    </Typography>
                    &nbsp;
                    <FormControlLabel
                        control={<Checkbox onClick={this.handleClickCollapseOptionalInfo} />}
                        label="Yes. it's necessary"/>
                    <FormControlLabel control={<Checkbox />} label="No, it isn't necessary" />
                    <Collapse in={openOptionalInfo} style={{ width: "100%" }} timeout="auto" unmountOnExit>
                        <Grid item xs={12} sm={8}>
                            <FormControl
                                variant="outlined"
                                className={classNames(classes.formField, classes.formFieldSelectService)}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="Service type"
                                    classes={{
                                        root: classes.formFieldInputLabel,
                                        focused: classes.selectLabel,
                                    }}>
                                    Select one or more laboratory test
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
                    </Collapse>
                </Grid>
                &emsp;
                <Grid item xs={12} spacing={24} className={classes.detailButtonContainer}>
                    <MaterialButtonRouter
                        component={LinkRouter}
                        to="/PatientDatabase/PatientLabTest"
                        variant="contained"
                        color="secondary"
                        classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                        <KeyboardArrowRightIcon />
                        Save and prescribe exam
                    </MaterialButtonRouter>
                    <MaterialButtonRouter
                        component={LinkRouter}
                        to="/"
                        variant="outlined"
                        color="inherit"
                        classes={{ root: classes.detailButton }}>
                        <KeyboardArrowRightIcon />
                        Print the visit
                    </MaterialButtonRouter>
                </Grid>
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientVisit);
export default styledComponent;
