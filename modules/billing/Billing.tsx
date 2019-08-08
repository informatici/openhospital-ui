import { Card, Grid, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import {  MaterialLinkRouter } from "../utils/LinkHelper";
import PaymentIcon from "../utils/icons/svg/PaymentIcon";
import CashIcon from "../utils/icons/svg/CashIcon";
import styles from "./Billing.style";

export interface Props extends WithStyles<typeof styles> {}

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class Billing extends React.Component {
  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
              <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                Home
              </MaterialLinkRouter>
              <Typography color="inherit">Billing</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="inherit" className={classes.billingTitle}>
              BILLING
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Paper className={classes.paperFlat}>
            <Grid container item spacing={24}>
              &emsp;
              <Grid item xs={12} className={classes.inputContainer}>
                <Typography variant="inherit" className={classes.findBilling}>
                  PATIENT INFORMATION
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="inherit" className={classes.insertInfoBilling}>
                  Insert the information of the patient here.
                </Typography>
              </Grid>
            </Grid>
            <form>
              <Grid container item spacing={24}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    id="Pateint ID (PID)"
                    label="Pateint ID (PID)"
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Outpatient Number (ODP)"
                    label="Outpatient Number (ODP)"
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Inpatient Number (IDP)"
                    label="Inpatient Number (IDP)"
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
                <Grid item xs={12} sm={4}>
                  <FormControl variant="outlined" className={classNames(classes.formField, classes.formFieldSelect)}>
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="​Patient type"
                      classes={{
                        root: classes.formFieldInputLabel,
                        focused: classes.selectLabel,
                      }}
                    >
                      Select the patient type from the list below
                    </InputLabel>
                    <Select
                      className={classes.select}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.InputLabelRef}
                          name="​Select patient type from the list below"
                          id="Patient type"
                          classes={{
                            input: classes.formFieldSelectInput,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>Base</MenuItem>
                      <MenuItem value={20}>Insured</MenuItem>
                      <MenuItem value={30}>Insured with COMPANY NAME</MenuItem>
                      <MenuItem value={40}>Insured with COMPANY NAME</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
            &emsp;
            <Typography variant="inherit" className={classes.insertInfoBilling}>
              &emsp;Have a problem?{" "}
              <MaterialLinkRouter color="secondary" component={LinkRouter} to="/patientsDatabase">
                Search a patient&nbsp;
              </MaterialLinkRouter>
              in the database and start the payment process.
            </Typography>
            &emsp;
            <hr className={classes.billingDivider} />
            <Grid container item spacing={24}>
              <Grid container item spacing={24}>
                &emsp;{" "}
                <Grid item xs={12} className={classes.inputContainer}>
                  <Typography variant="inherit" className={classes.findService}>
                    HEALTH SERVICE INFORMATION
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="inherit" className={classes.insertInfoService}>
                    Description of health service
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormControl
                    variant="outlined"
                    className={classNames(classes.formField, classes.formFieldSelectService)}
                  >
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="Service type"
                      classes={{
                        root: classes.formFieldInputLabel,
                        focused: classes.selectLabel,
                      }}
                    >
                      Select the service from the list below
                    </InputLabel>
                    <Select
                      className={classes.select}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.InputLabelRef}
                          name="​Select the service from the list below"
                          id="Service type"
                          classes={{
                            input: classes.formFieldSelectInput,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>Analysis</MenuItem>
                      <MenuItem value={20}>Laboratory test</MenuItem>
                      <MenuItem value={30}>Surgery</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    id="Notes"
                    label="Notes"
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
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
              </Grid>
              <Grid container item spacing={24}>
                &emsp;
                <Typography variant="inherit" className={classes.findPayment}>
                  PAYMENT INFORMATION
                </Typography>
              </Grid>
              <Grid container item spacing={24}>
                &emsp;
               
              </Grid>
              <Grid container item spacing={24}>
                <Grid className={classes.formatFormPayment}>
                  <Typography variant="inherit" className={classes.insertStatusPayment}>
                    Status of Payment
                  </Typography>
                  <Typography variant="inherit" className={classes.statusInfoPayment}>
                    OPEN
                  </Typography>
                  &emsp;
                  <TextField
                    id="Total Amount"
                    label="Total Amount"
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
                  &emsp;
                  <Typography variant="inherit" className={classes.insertInfoBilling}>
                    Single Payment
                  </Typography>
                  <TextField
                    placeholder="How much do you want to pay?"
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

                <Grid className={classes.formatFormPayment}>
                  <Typography variant="inherit" className={classes.insertStatusPayment}>
                    Cashier
                  </Typography>
                  <TextField
                    placeholder="Insert Name and Surname"
                    className={classes.formField}
                    InputLabelProps={{
                      classes: {
                        root: classes.formFieldInputCashier,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.formFieldInputCashier,
                        notchedOutline: classes.cssOutlinedInput,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="Single Payment"
                    label="Total amount Unpaid"
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
                  &emsp;
                  <Typography variant="inherit" className={classes.insertStatusPayment}>
                    Payment Method
                  </Typography>
                  &ensp;
                  <Grid className={classes.insertStatusPayment}>
                    <FormControlLabel control={<Radio />} label={<CashIcon />} />
                    Cash &emsp;
                    <FormControlLabel control={<Radio />} label={<PaymentIcon />} />
                    Credit Card
                  </Grid>
                </Grid>
                <Grid className={classes.formatFormPaymentButton}>
                  <Grid className={classes.formatPaymentButtonBill}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      classes={{ root: classes.button, label: classes.buttonLabel }}
                    >
                      $Raise the bill
                    </Button>
                  </Grid>
                  <Grid className={classes.formatPaymentButtonPay}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      classes={{ root: classes.button, label: classes.buttonLabel }}
                    >
                      $Pay
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              &emsp;
              <Divider className={classes.divider} />
              &emsp;
              <Grid container item spacing={24}>
                &emsp;
                <Typography variant="inherit" className={classes.findSummary}>
                  DAILY PAYMENT SUMMARY
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%" }}>
                    <Typography className={classes.numberOf}>8</Typography>
                    <Typography className={classes.object}>PAYMENTS</Typography>
                    <Typography className={classes.subTitle}>Status Payment</Typography>
                    <Select
                      input={
                        <OutlinedInput
                          name="View Details"
                          id="details"
                          classes={{
                            input: classes.formFieldSelectDetails,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>One</MenuItem>
                      <MenuItem value={20}>Two</MenuItem>
                    </Select>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={2} className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%" }}>
                    <Typography className={classes.numberOf}>2</Typography>
                    <Typography className={classes.object}>OPEN</Typography>
                    <Typography className={classes.subTitle}>Status Payment</Typography>
                    <Select
                      input={
                        <OutlinedInput
                          name="View Details"
                          id="details"
                          classes={{
                            input: classes.formFieldSelectDetails,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>One</MenuItem>
                      <MenuItem value={20}>Two</MenuItem>
                    </Select>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={2} className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%" }}>
                    <Typography className={classes.numberOf}>2</Typography>
                    <Typography className={classes.object}>CLOSED</Typography>
                    <Typography className={classes.subTitle}>Status Payment</Typography>
                    <Select
                      input={
                        <OutlinedInput
                          name="View Details"
                          id="details"
                          classes={{
                            input: classes.formFieldSelectDetails,
                          }}
                        />
                      }
                    >
                      <MenuItem value={10}>One</MenuItem>
                      <MenuItem value={20}>Two</MenuItem>
                    </Select>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

Billing.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withStyles(styles, { withTheme: true })(Billing);
export default styledComponent;
