import { FC, useEffect, useCallback } from "react";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

import classNames from "classnames";
import { useFormik } from "formik";
import { get } from "lodash";
import { has } from "lodash";
import { default as React } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import logo from "../../../assets/logo-color.svg";
import { HospitalDTO } from "../../../generated";
import {
  setForgotPasswordThunk,
  resetForgotPasswordThunk,
} from "../../../state/main/actions";
import { IState } from "../../../types";
import Button from "../../accessories/button/Button";
import Footer from "../../accessories/footer/Footer";
import TextField from "../../accessories/textField/TextField";
import "./styles.scss";
import { IValues } from "./types";
import { getHospital } from "../../../state/hospital/actions";

const ForgotActivity: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues: IValues = {
    username: "",
  };

  const validationSchema = object({
    username: string().required(t("login.insertavalidusername")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: IValues) => {
      dispatch(setForgotPasswordThunk(values.username));
    },
  });

  const onResetForgotPassword = useCallback(() => {
    dispatch(resetForgotPasswordThunk());
  }, [dispatch]);

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : "";
  };
  const errorType = useSelector<IState>(
    (state) => state.main.forgotpassword.error?.description || "unknown error"
  );

  const status = useSelector<IState>(
    (state) => state.main.forgotpassword.status || "IDLE"
  );

  useEffect(() => {
    dispatch(getHospital());
  }, [dispatch]);

  const hospital = useSelector<IState>(
    (state) => state.hospital.getHospital.data
  ) as HospitalDTO;

  return (
    <div className="forgot">
      <div className="container forgot__background">
        <img
          src={logo}
          alt="Open Hospital"
          className="forgot__logo"
          width="150px"
        />
        <div className="forgot__title">
          {hospital?.description ?? t("login.forgottitle")}
        </div>
        <div className="forgot__panel">
          <form className="forgot__panel__form" onSubmit={formik.handleSubmit}>
            <div className="forgot__description">
              {status === "SUCCESS"
                ? t("login.forgotsuccess")
                : t("login.forgotdescription")}
            </div>
            {status !== "SUCCESS" && (
              <>
                <div className="forgot__panel__textField">
                  <TextField
                    field={formik.getFieldProps("username")}
                    theme="regular"
                    label={t("login.username")}
                    isValid={isValid("username")}
                    errorText={getErrorText("username")}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div
                  className={classNames("forgot__error", {
                    hidden: status !== "FAIL",
                  })}
                >
                  {errorType}
                </div>
                <div className="forgot__buttonContainer">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={status === "LOADING"}
                  >
                    {t("common.submit")}
                  </Button>
                </div>
              </>
            )}
          </form>
          <div className="forgot__back">
            <RouterLink to="/login">
              <Link component="button">{t("login.takemeback")}</Link>
            </RouterLink>
            {status !== "IDLE" && (
              <>
                <span> | </span>
                <Link onClick={onResetForgotPassword} component="button">
                  {t("login.tryanotherusername")}
                </Link>
              </>
            )}
          </div>
          &emsp;
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotActivity;
