import { InputAdornment } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { RemoveRedEye } from "@material-ui/icons";
import classNames from "classnames";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import { default as React, FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { object, string } from "yup";
import logo from "../../../assets/logo-color.svg";
import { useAuthentication } from "../../../libraries/authUtils/useAuthentication";
import { setAuthenticationThunk } from "../../../state/main/actions";
import { IState } from "../../../types";
import Button from "../../accessories/button/Button";
import Footer from "../../accessories/footer/Footer";
import TextField from "../../accessories/textField/TextField";
import "./styles.scss";
import { IDispatchProps, IStateProps, IValues, TProps } from "./types";

const LoginActivity: FunctionComponent<TProps> = ({
  setAuthenticationThunk,
  status,
}) => {
  useAuthentication();

  const { t } = useTranslation();

  const initialValues: IValues = {
    username: "",
    password: "",
  };

  const validationSchema = object({
    username: string().required(t("login.insertavalidusername")),
    password: string().required(t("login.insertthepassword")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: IValues) => {
      setAuthenticationThunk(values.username, values.password);
    },
  });

  const [state, setState] = useState({ isPasswordVisible: false });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };

  return (
    <div className="login">
      <div className="container login__background">
        <img
          src={logo}
          alt="Open Hospital"
          className="login__logo"
          width="150px"
        />
        <div className="login__title">
          Princeton-Plainsboro Teaching Hospital
        </div>
        <div className="login__panel">
          <form className="login__panel__form" onSubmit={formik.handleSubmit}>
            <div className="login__panel__textField">
              <TextField
                field={formik.getFieldProps("username")}
                theme="regular"
                label={t("login.username")}
                isValid={isValid("username")}
                errorText={getErrorText("username")}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="login__panel__textField">
              <TextField
                field={formik.getFieldProps("password")}
                theme="regular"
                label={t("login.password")}
                type={state.isPasswordVisible ? "text" : "password"}
                isValid={isValid("password")}
                errorText={getErrorText("password")}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div
                        className="login__passwordToggler"
                        onClick={() =>
                          setState({
                            isPasswordVisible: !state.isPasswordVisible,
                          })
                        }
                      >
                        <RemoveRedEye />
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div
              className={classNames("login__invalidCredentials", {
                hidden: status !== "FAIL",
              })}
            >
              {t("login.incorrectcredentials")}
            </div>
            <div className="login__buttonContainer">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={status === "LOADING"}
              >
                {t("login.login")}
              </Button>
            </div>
            <div>
              <Link className="login__panel__resetPassword" component="button">
                {t("login.forgotpassword")}
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
  status: state.main.authentication.status || "IDLE",
});

const mapDispatchToProps: IDispatchProps = {
  setAuthenticationThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginActivity);
