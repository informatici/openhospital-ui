import { Card, CardContent, Divider, Grid, Link, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { ROOT_PATH } from "../../App";
import OHlogo from "../../assets/images/open-hospital.png";
import styles from "./login.style";
import { useFormik, Form, Field } from "formik";
export interface Props extends WithStyles<typeof styles> {}

interface ILoginProps {
  fields: any;
  errors: any;
  validateForm: any;
}

const Login: FunctionComponent<ILoginProps & WithStyles<typeof styles>> = ({ classes, fields, errors }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  // const submituserRegistrationForm = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     //&& this.controlFormData()
  //     //go to homepage
  //     window.localStorage.setItem("user", "true");
  //     window.location.pathname = `${ROOT_PATH}`;
  //   }
  // };

  // const handleChange = e => {
  //   fields[e.target.name] = e.target.value;
  //   this.setState({
  //     fields,
  //   });
  // };

  // const validateForm = () => {
  //   let errors = {};
  //   let formIsValid = true;

  //   if (!fields["email"]) {
  //     formIsValid = false;
  //     errors["email"] = "*Please enter your email.";
  //   }

  //   if (!fields["password"]) {
  //     formIsValid = false;
  //     errors["password"] = "*Please enter your password.";
  //   }

  //   this.setState({ errors: errors });
  //   return formIsValid;
  // };

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer} justify="center" spacing={24}>
        <Grid className={classes.loginContainer}>
          <Paper className={classNames(classes.paperFlat, classes.paper)}>
            <Grid container className={classes.gridContainer} justify="center" spacing={24}>
              <img src={OHlogo} alt="Open Hospital" className={classes.logo} />
            </Grid>
            &emsp;
            <Grid container className={classes.gridContainer} justify="center" spacing={24}>
              {/* <form
                style={{ width: 400 }}
                method="post"
                name="userRegistrationForm"
                onSubmit={submituserRegistrationForm}
              > */}
              <form onSubmit={formik.handleSubmit}>
                <Grid className={classes.errorMsg}>
                  <Field name="email">
                    {(field: any) => (
                      <TextField
                        id={field.name}
                        label={field.name}
                        name={field.name}
                        value={field.form.values.email}
                        error={errors.email}
                        className={classNames(classes.formField, classes.cssOutlinedInput)}
                        InputLabelProps={{
                          classes: {
                            root: classes.formFieldInputLabel,
                            focused: classes.cssFocused,
                          },
                        }}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.cssOutlinedInput,
                          },
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  </Field>
                  <div className={classes.errorMsg}>{errors.email}</div>
                </Grid>
                <Grid className={classes.errorMsg}>
                  <TextField
                    id="password"
                    label="Password"
                    type="Password"
                    name="password"
                    value={fields.password}
                    error={errors.password}
                    className={classNames(classes.formField, classes.cssOutlinedInput)}
                    InputLabelProps={{
                      classes: {
                        root: classes.formFieldInputLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.cssOutlinedInput,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                  <div className={classes.errorMsg}>{errors.password}</div>
                </Grid>
              </form>
              <Grid container className={classes.forgotContainer} spacing={24}>
                <Link component="button" className={classes.forgotLink}>
                  FORGOT PASSWORD?
                </Link>
              </Grid>
              &nbsp;
              <Grid container className={classes.gridButtonContainer} justify="center" spacing={24}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  classes={{ root: classes.button, label: classes.buttonLabel }}
                >
                  ENTER
                </Button>
              </Grid>
              <Grid container className={classes.notRegisterContainer} spacing={24}>
                &emsp;
                <Divider className={classes.divider} />
              </Grid>
              <Grid container className={classes.notRegisterContainer} spacing={24}>
                <Typography variant="inherit" className={classes.notRegisterLink}>
                  If you have not registered yet,&nbsp;
                </Typography>
                <Link component="button" className={classes.notRegisterLink}>
                  CLICK HERE
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container className={classes.summaryContainer}>
          <Paper className={classNames(classes.summaryPaperFlat, classes.paper)}>
            &nbsp;
            <Typography variant="inherit" className={classes.inTitle}>
              INPATIENT DEPARTMENT
            </Typography>
            &nbsp;
            <Typography variant="inherit" className={classes.inSummary}>
              SUMMARY DATA
            </Typography>
            &nbsp;
            <Grid item spacing={24}>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>50</Typography>
                  <Typography className={classes.subTitle}>PATIENTS</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>25</Typography>
                  <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>25</Typography>
                  <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                  <Typography className={classes.subTitleSpec}>(this month)</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>46%</Typography>
                  <Typography className={classes.subTitle}>BOR</Typography>
                  <Typography className={classes.subTitleSpec}>Bed Occupancy Rate</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>25</Typography>
                  <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>3.5</Typography>
                  <Typography className={classes.subTitle}>AVERAGE LOSS</Typography>
                  <Typography className={classes.subTitleSpec}>Length of stay</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>68%</Typography>
                  <Typography className={classes.subTitle}> TOTAL BOR</Typography>
                  <Typography className={classes.subTitleSpec}>Bed Occupancy Rate</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>4.7</Typography>
                  <Typography className={classes.subTitle}>AVERAGE LOSS</Typography>
                  <Typography className={classes.subTitleSpec}>Length of stay</Typography>
                </CardContent>
              </Card>
            </Grid>
            &nbsp;
            <Divider className={classes.summaryDivider} />
            &emsp;
            <Typography variant="inherit" className={classes.inTitle}>
              OUTPATIENT DEPARTMENT
            </Typography>
            &nbsp;
            <Typography variant="inherit" className={classes.inSummary}>
              SUMMARY DATA
            </Typography>
            &nbsp;
            <Grid item spacing={24}>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>50</Typography>
                  <Typography className={classes.subTitle}>PATIENTS</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>25</Typography>
                  <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>25</Typography>
                  <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                  <Typography className={classes.subTitleSpec}>(this month)</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>46%</Typography>
                  <Typography className={classes.subTitle}>BOR</Typography>
                  <Typography className={classes.subTitleSpec}>Bed Occupancy Rate</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>25</Typography>
                  <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>3.5</Typography>
                  <Typography className={classes.subTitle}>AVERAGE LOSS</Typography>
                  <Typography className={classes.subTitleSpec}>Length of stay</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>68%</Typography>
                  <Typography className={classes.subTitle}> TOTAL BOR</Typography>
                  <Typography className={classes.subTitleSpec}>Bed Occupancy Rate</Typography>
                </CardContent>
              </Card>
              <Card className={classNames(classes.boxItem)}>
                <CardContent style={{ paddingBottom: 0, padding: 0 }}>
                  <Typography className={classes.numberOf}>4.7</Typography>
                  <Typography className={classes.subTitle}>AVERAGE LOSS</Typography>
                  <Typography className={classes.subTitleSpec}>Length of stay</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(Login);
export default styledComponent;
