import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { object, string } from "yup";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";
import Link from "@material-ui/core/Link";
import { TProps, IValues } from "./types";
import logo from "../../../assets/logo.png";
import "./styles.scss";
import TextField from "../../shared/textField/TextField";
import Button from "../../shared/button/Button";
import Footer from "../../shared/footer/Footer";
import { LocalStorage } from "../../../libraries/storage/storage";

const LoginActivity: FunctionComponent<TProps> = ({ successRoute }) => {
  window.history.replaceState(null, "", "/");

  const initialValues: IValues = {
    username: "",
    password: "",
  };

  const validationSchema = object({
    username: string().required("Enter a valid user name"),
    password: string().required("Enter the password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: IValues) => {
      LocalStorage.write("sessionId", values.username);
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
                field={formik.getFieldProps("username")}
                label="User"
                isValid={isValid("username")}
                errorText={getErrorText("username")}
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
            <div className="login__buttonContainer">
              <Button type="submit" variant="contained" color="primary">
                LOG IN
              </Button>
            </div>
            <div>
              <Link className="login__panel__resetPassword" component="button">
                Forgot the password?
              </Link>
            </div>
            &emsp;
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginActivity;
