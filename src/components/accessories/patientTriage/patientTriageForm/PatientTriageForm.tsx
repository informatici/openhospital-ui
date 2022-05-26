import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import { object, string } from "yup";
import { TProps } from "./types";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import Button from "../../button/Button";
import warningIcon from "../../../../assets/warning-icon.png";
import TextField from "../../textField/TextField";
import has from "lodash.has";
import get from "lodash.get";
import SelectField from "../../selectField/SelectField";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

const PatientTriageForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  creationMode,
  shouldResetForm,
  resetFormCallback,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    pex_date: string()
      .required(t("common.required"))
      .test({
        name: "pex_ate",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
  });
  const initialValues = getFromFields(fields, "value");
  const options = getFromFields(fields, "options");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [setFieldValue]
  );

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
    resetFormCallback();
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <>
      <div className="patientTriageForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("examination.newtriage")
            : t("examination.edittriage") +
              ": " +
              renderDate(formik.values.pex_date)}
        </h5>
        <form
          className="patientTriageForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <DateField
                fieldName="pex_date"
                fieldValue={formik.values.pex_date}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("pex_date")}
                errorText={getErrorText("pex_date")}
                label={t("examination.datetriage")}
                onChange={dateFieldHandleOnChange("pex_date")}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_height")}
                theme="regular"
                label={t("examination.height")}
                isValid={isValid("pex_height")}
                errorText={getErrorText("pex_height")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_weight")}
                theme="regular"
                label={t("examination.weight")}
                isValid={isValid("pex_weight")}
                errorText={getErrorText("pex_weight")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_temp")}
                theme="regular"
                label={t("examination.temperature")}
                isValid={isValid("pex_temp")}
                errorText={getErrorText("pex_temp")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_sat")}
                theme="regular"
                label={t("examination.saturation")}
                isValid={isValid("pex_sat")}
                errorText={getErrorText("pex_sat")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item compressed">
              <TextField
                field={formik.getFieldProps("pex_pa_min")}
                theme="regular"
                label={t("examination.ap.min")}
                isValid={isValid("pex_pa_min")}
                errorText={getErrorText("pex_pa_min")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />

              <TextField
                field={formik.getFieldProps("pex_pa_max")}
                theme="regular"
                label={t("examination.ap.max")}
                isValid={isValid("pex_pa_max")}
                errorText={getErrorText("pex_pa_max")}
                onBlur={formik.handleBlur}
                type="string"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("pex_fc")}
                theme="regular"
                label={t("examination.heartrate")}
                isValid={isValid("pex_fc")}
                errorText={getErrorText("pex_fc")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("diuresis_vol")}
                theme="regular"
                label={t("examination.diuresisvolume24h")}
                isValid={isValid("diuresis_vol")}
                errorText={getErrorText("diuresis_vol")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("respiratory_rate")}
                theme="regular"
                label={t("examination.respiratoryrate")}
                isValid={isValid("respiratory_rate")}
                errorText={getErrorText("respiratory_rate")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
            <div className="patientTriageForm__item">
              <TextField
                field={formik.getFieldProps("hgt")}
                theme="regular"
                label={t("examination.hgt")}
                isValid={isValid("hgt")}
                errorText={getErrorText("hgt")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTriageForm__item">
              <SelectField
                fieldName="diuresis"
                fieldValue={formik.values.diuresis}
                label={t("examination.diuresis")}
                isValid={isValid("diuresis")}
                errorText={getErrorText("diuresis")}
                onBlur={onBlurCallback("diuresis")}
                options={options.diuresis}
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="bowel"
                fieldValue={formik.values.bowel}
                label={t("examination.bowel")}
                isValid={isValid("bowel")}
                errorText={getErrorText("bowel")}
                onBlur={onBlurCallback("bowel")}
                options={options.bowel}
                disabled={isLoading}
              />
            </div>

            <div className="patientTriageForm__item">
              <SelectField
                fieldName="auscultation"
                fieldValue={formik.values.auscultation}
                label={t("examination.auscultation")}
                isValid={isValid("auscultation")}
                errorText={getErrorText("auscultation")}
                onBlur={onBlurCallback("auscultation")}
                options={options.auscultation}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="patientTriageForm__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {submitButtonLabel}
              </Button>
            </div>
            <div className="reset_button">
              <Button
                type="reset"
                variant="text"
                disabled={isLoading}
                onClick={() => setOpenResetConfirmation(true)}
              >
                {resetButtonLabel}
              </Button>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={resetButtonLabel.toUpperCase()}
            info={t("common.resetform")}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel={t("common.discard")}
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default PatientTriageForm;
