import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { IState } from "../../../types";
import { TProps, IStateProps, IValues } from "./types";
import logo from "../../../assets/logo.png";
import { object, string } from "yup";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";

const LoginActivity: FunctionComponent<TProps> = ({
  userCredentials,
  successRoute,
}) => {
  const initialValues: IValues = {
    email: "",
    password: "",
  };

  const validationSchema = object({
    email: string()
      .email("Email address not valid")
      .required("Enter a valid email address"),
    password: string().required("Enter the password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: IValues) => {
      console.log(values);
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
              <img
                src={logo}
                alt="Open Hospital"
                className="login__panel__logo"
              />
              <div className="login__panel__form col-md-8 col-sm-9 col-xs-11">
                {/* <form onSubmit={formik.handleSubmit}>
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(LoginActivity);
