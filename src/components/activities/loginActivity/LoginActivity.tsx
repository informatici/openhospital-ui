import { RemoveRedEye } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import Link from "@mui/material/Link";
import classNames from "classnames";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import { FC, default as React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { object, string } from "yup";
import logo from "../../../assets/logo-color.svg";
import { HospitalDTO } from "../../../generated";
import { useAuthentication } from "../../../libraries/authUtils/useAuthentication";
import { getHospital } from "../../../state/hospital";
import { setAuthentication } from "../../../state/main";
import Button from "../../accessories/button/Button";
import Footer from "../../accessories/footer/Footer";
import TextField from "../../accessories/textField/TextField";
import "./styles.scss";
import { IValues } from "./types";

const LoginActivity: FC = () => {
  useAuthentication();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
      dispatch(setAuthentication(values));
    },
  });

  const [state, setState] = useState({ isPasswordVisible: false });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };
  const errorMessage = useAppSelector((state) => {
    const error = state.main.authentication.error;
    return error?.status === 401
      ? t("errors.incorrectcredentials")
      : error?.message ?? t("errors.somethingwrong");
  });

  const status = useAppSelector(
    (state) => state.main.authentication.status || "IDLE"
  );

  useEffect(() => {
    dispatch(getHospital());
  }, [dispatch]);

  const hospital = useAppSelector(
    (state) => state.hospital.getHospital.data
  ) as HospitalDTO;

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
          {hospital?.description ?? t("login.signin")}
        </div>
        <div data-cy="login-panel" className="login__panel">
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
              data-cy="login-invalid-credentials"
              className={classNames("login__invalidCredentials", {
                hidden: status !== "FAIL",
              })}
            >
              {errorMessage}
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
          </form>
          <div>
            <RouterLink to="/forgot">
              <Link className="login__panel__resetPassword" component="button">
                {t("login.forgotpassword")}
              </Link>
            </RouterLink>
          </div>
          &emsp;
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginActivity;
