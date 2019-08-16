import React, { Component } from "react";
import _ from "lodash";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialLinkRouter, MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";
import styles from "./styles/NewVaccination.style";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";

export interface Props extends WithStyles <typeof styles> {}

interface State {
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: any;
}

class Vaccine extends Component <Props, State> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        items: [],
    };

    public render() {
        const { classes } = this.props;

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
                <Grid container item spacing={24}>
                    <Grid className={classes.formatFormAdmission}>
                        <Typography color="inherit" className={classes.drugPrescribed}>
                            Vaccine Type
                        </Typography>
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
                                }}/>
                            <Select
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.InputLabelRef}
                                        id="Service type"
                                        classes={{
                                            input: classes.formFieldSelectInput,
                                        }}/>
                                }>
                                <MenuItem value={10}>All Type</MenuItem>
                                <MenuItem value={20}>Child </MenuItem>
                                <MenuItem value={30}>No Pregnant</MenuItem>
                                <MenuItem value={40}>Pregnant</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.formatFormAdmission}>
                        <Typography color="inherit" className={classes.drugPrescribed}>
                            Vaccine
                        </Typography>
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
                                }}/>
                            <Select
                                input={
                                <OutlinedInput
                                    labelWidth={this.state.InputLabelRef}
                                    id="Service type"
                                    classes={{
                                        input: classes.formFieldSelectInput,
                                    }}/>
                                }>
                                <MenuItem value={10}>All Vaccines</MenuItem>
                                <MenuItem value={20}>BCG </MenuItem>
                                <MenuItem value={30}>MEASLES</MenuItem>
                                <MenuItem value={40}>POLIO</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
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
                    <Grid item xs={12} spacing={24} style={{ marginTop: 100 }} className={classes.detailButtonContainer}>
                        <MaterialButtonRouter
                            component={LinkRouter}
                            to="/"
                            variant="contained"
                            color="secondary"
                            classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                            <KeyboardArrowRightIcon />
                            Save Vaccine
                        </MaterialButtonRouter>
                        <MaterialButtonRouter
                            component={LinkRouter}
                            to="/"
                            variant="contained"
                            color="secondary"
                            classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                            <KeyboardArrowRightIcon />
                            Print Vaccine form
                        </MaterialButtonRouter>
                        <MaterialButtonRouter
                            component={LinkRouter}
                            to="/"
                            variant="contained"
                            color="secondary"
                            classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
                            <KeyboardArrowRightIcon />
                            Notify&SMS
                        </MaterialButtonRouter>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(Vaccine);
export default styledComponent;