import { Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import OHlogo from "../../assets/images/open-hospital.png";
import styles from "./login.style";
import { useFormik } from "formik";
import { loginValidationSchema as validationSchema } from "./loginValidationSchema";
import get from "lodash.get";
import has from "lodash.has";
import TextField from "../sharedComponents/TextField/TextField";
import { TLoginProps as Props } from "./types";
import { initialValues } from "./consts";
import "./login.scss";

const Login: FunctionComponent<Props> = ({ classes, successRoute }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      window.localStorage.setItem("user", "true");
      window.location.href = successRoute;
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  return (
    <div className="login">
      <div className="container login__background">
        <div className="container login__panel col-md-8 col-sm-10 col-xs-11">
          <div className="login__panel__content-grid center-xs col-md-8 col-sm-10 col-xs-11">
            <div className="login__panel__content">
              <img src={OHlogo} alt="Open Hospital" className="login__panel__logo" />
              <div className="login__panel__form col-md-8 col-sm-9 col-xs-11">
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    field={formik.getFieldProps("email")}
                    label="Email"
                    isValid={isValid("email")}
                    errorText={getErrorText("email")}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    field={formik.getFieldProps("password")}
                    label="Password"
                    type="Password"
                    isValid={isValid("password")}
                    errorText={getErrorText("password")}
                    onBlur={formik.handleBlur}
                  />
                  <div className={classes.gridButtonContainer}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="inherit"
                      classes={{ root: classes.button, label: classes.buttonLabel }}
                    >
                      ENTER
                    </Button>
                  </div>
                  <div className={classes.forgotContainer}>
                    <Link component="button" className={classes.forgotLink}>
                      FORGOT PASSWORD?
                    </Link>
                  </div>
                  &emsp;
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(Login);
export default styledComponent;