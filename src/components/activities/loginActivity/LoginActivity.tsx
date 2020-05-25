import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { object, string } from "yup";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";
import Link from "@material-ui/core/Link";
import { IState } from "../../../types";
import { TProps, IStateProps, IValues } from "./types";
import logo from "../../../assets/logo.png";
import "./styles.scss";
import TextField from "../../shared/textField/TextField";
import Button from "../../shared/button/Button";

const LoginActivity: FunctionComponent<TProps> = ({
  userCredentials,
  successRoute,
}) => {
  const initialValues: IValues = {
    username: "",
    password: "",
  };

  const validationSchema = object({
    username: string()
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
        <img src={logo} alt="Open Hospital" className="login__logo" />
        <div className="login__title">
          Princeton-Plainsboro Teaching Hospital
        </div>
        <div className="login__panel">
          <form className="login__panel__form" onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                field={formik.getFieldProps("email")}
                label="Email"
                isValid={isValid("email")}
                errorText={getErrorText("email")}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <TextField
                field={formik.getFieldProps("password")}
                label="Password"
                type="Password"
                isValid={isValid("password")}
                errorText={getErrorText("password")}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary">
                ENTER
              </Button>
            </div>
            <div>
              <Link component="button">FORGOT PASSWORD?</Link>
            </div>
            &emsp;
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(LoginActivity);
