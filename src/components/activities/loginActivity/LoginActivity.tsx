import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { object, string } from "yup";
import { useFormik } from "formik";
import has from "lodash.has";
import get from "lodash.get";
import Link from "@material-ui/core/Link";
import { TProps, IValues, IDispatchProps, IStateProps } from "./types";
import logo from "../../../assets/logo.png";
import "./styles.scss";
import TextField from "../../shared/textField/TextField";
import Button from "../../shared/button/Button";
import Footer from "../../shared/footer/Footer";
import { LocalStorage } from "../../../libraries/storage/storage";
import { setAuthentication } from "../../../state/main/actions";
import { IState } from "../../../types";

const LoginActivity: FunctionComponent<TProps> = ({
  setAuthentication,
  authenticated,
  isLoading,
  successRoute,
}) => {
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
      setAuthentication(values.username, values.password);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  useEffect(() => {
    if (authenticated) {
      LocalStorage.write("sessionId", "token");
      window.location.href = successRoute;
    }
  }, [authenticated]);

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
                theme="regular"
                label="User"
                isValid={isValid("username")}
                errorText={getErrorText("username")}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <TextField
                field={formik.getFieldProps("password")}
                theme="regular"
                label="Password"
                type="Password"
                isValid={isValid("password")}
                errorText={getErrorText("password")}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="login__buttonContainer">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
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

const mapStateToProps = (state: IState): IStateProps => ({
  authenticated: state.main.authentication.data?.authenticated,
  isLoading: state.main.authentication.isLoading,
});

const mapDispatchToProps: IDispatchProps = {
  setAuthentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginActivity);
