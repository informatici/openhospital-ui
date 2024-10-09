import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { object, string } from "yup";
import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";
import { PATHS } from "../../../../../consts";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../libraries/formDataHandling/functions";
import { updateHospitalReset } from "../../../../../state/hospital";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import TextField from "../../../textField/TextField";
import "./styles.scss";
import { IHospitalFormProps } from "./types";

const HospitalForm: FC<IHospitalFormProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [openDiscardConfirmation, setOpenDiscardConfirmation] = useState(false);

  const hospitalStore = useAppSelector((state) => state.hospital);

  const errorMessage = useMemo(
    () =>
      hospitalStore.updateHospital.error?.message ?? t("common.somethingwrong"),
    [t, hospitalStore.updateHospital.error?.message]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    description: string().required(t("common.required")),
    address: string().notRequired(),
    city: string().notRequired(),
    fax: string().notRequired(),
    telephone: string().notRequired(),
    email: string().notRequired().email(t("validations.email")),
    currencyCod: string().notRequired(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues as any);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const handleDiscardConfirmation = () => {
    setOpenDiscardConfirmation(false);
    navigate(-1);
  };

  useEffect(() => {
    return () => {
      dispatch(updateHospitalReset());
    };
  }, []);

  return (
    <div className="hospitalForm">
      <form className="hospitalForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("hospital.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("address")}
              theme="regular"
              label={t("hospital.address")}
              isValid={isValid("address")}
              errorText={getErrorText("address")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("city")}
              theme="regular"
              label={t("hospital.city")}
              isValid={isValid("city")}
              errorText={getErrorText("city")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>

          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("telephone")}
              theme="regular"
              label={t("hospital.telephone")}
              isValid={isValid("telephone")}
              errorText={getErrorText("telephone")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("fax")}
              theme="regular"
              label={t("hospital.fax")}
              isValid={isValid("fax")}
              errorText={getErrorText("fax")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("email")}
              theme="regular"
              label={t("hospital.email")}
              isValid={isValid("email")}
              errorText={getErrorText("email")}
              onBlur={formik.handleBlur}
              type="email"
              disabled={isLoading}
            />
          </div>
          <div className="hospitalForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("currencyCod")}
              theme="regular"
              label={t("hospital.currencyCod")}
              type="text"
              isValid={isValid("currencyCod")}
              errorText={getErrorText("currencyCod")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="hospitalForm__buttonSet">
          <div className="submit_button">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="button"
              variant="text"
              disabled={isLoading}
              onClick={() => setOpenDiscardConfirmation(true)}
            >
              {t("common.discard")}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openDiscardConfirmation}
          title={t("common.discard")}
          info={t("hospital.discardChanges")}
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleDiscardConfirmation}
          handleSecondaryButtonClick={() => setOpenDiscardConfirmation(false)}
        />
        {hospitalStore.updateHospital.status === "FAIL" && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={!!hospitalStore.updateHospital.hasSucceeded}
          title={t("hospital.updated")}
          icon={checkIcon}
          info={t("hospital.updateSuccess")}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default HospitalForm;
