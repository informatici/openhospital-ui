import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import DateField from "components/accessories/dateField/DateField";
import TextField from "components/accessories/textField/TextField";
import { useFormik } from "formik";
import {
  formatAllFieldValues,
  getFromFields,
} from "libraries/formDataHandling/functions";
import { get, has } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { boolean, date, number, object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import "./styles.scss";
import { ConditioningFormProps } from "./types";

const ConditioningForm: FC<ConditioningFormProps> = ({
  fields,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  onSubmit,
  resetFormCallback,
  shouldResetForm,
}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    aspiration: boolean(),
    mceDuree: number().nullable(),
    ventilationDuree: number().nullable(),
    oxygeneDebit: number().nullable(),
    sgVolume: number().nullable(),
    diazepamDose: number().nullable(),
    bolusSsVolume: number().nullable(),
    sngNumero: string().nullable(),
    others: string().nullable(),
    cpap: boolean(),
    date: date().required(t("common.required")),
  });

  const initialValues = getFromFields(fields, "value");

  const [aspirationChecked, setAspirationChecked] = useState(false);
  const [cpapIsChecked, setCpapIsChecked] = useState(false);

  const handleCheched = () => {
    setAspirationChecked(!aspirationChecked);
  };
  const handleCpapCheck = () => {
    setCpapIsChecked(!cpapIsChecked);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.aspiration = aspirationChecked;
      formattedValues.cpap = cpapIsChecked;
      onSubmit(formattedValues as any);
      setAspirationChecked(false);
      setCpapIsChecked(false);
    },
  });
  const { resetForm, setFieldValue } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [formik, setFieldValue]
  );
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const isValid = (fieldName: string) =>
    has(formik.touched, fieldName) && has(formik.errors, fieldName);

  const getErrorText = (fieldName: string) =>
    has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";

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
    <div className="conditioningForm">
      <form className="conditioningForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs bottom-sm">
          <div className="conditioningForm__item">
            <CheckboxField
              fieldName="aspiration"
              label={t("conditioning.aspiration")}
              checked={aspirationChecked}
              onChange={handleCheched}
            />
          </div>
          <div className="conditioningForm__item">
            <CheckboxField
              fieldName="cpap"
              label={t("conditioning.cpap")}
              checked={cpapIsChecked}
              onChange={handleCpapCheck}
            />
          </div>
          <div className="conditioningForm__item">
            <DateField
              fieldName="date"
              fieldValue={formik.values.date}
              disableFuture={true}
              theme="regular"
              format="dd/MM/yyyy HH:mm"
              isValid={isValid("date")}
              errorText={getErrorText("date")}
              label={t("conditioning.date")}
              onChange={dateFieldHandleOnChange("date")}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.mceDuree")}
              field={formik.getFieldProps("mceDuree")}
              theme="regular"
              isValid={isValid("mceDuree")}
              errorText={getErrorText("mceDuree")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.ventilationDuree")}
              field={formik.getFieldProps("ventilationDuree")}
              theme="regular"
              isValid={isValid("ventilationDuree")}
              errorText={getErrorText("ventilationDuree")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.oxygeneDebit")}
              field={formik.getFieldProps("oxygeneDebit")}
              theme="regular"
              isValid={isValid("oxygeneDebit")}
              errorText={getErrorText("oxygeneDebit")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.sgVolume")}
              field={formik.getFieldProps("sgVolume")}
              theme="regular"
              isValid={isValid("sgVolume")}
              errorText={getErrorText("sgVolume")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.diazepamDose")}
              field={formik.getFieldProps("diazepamDose")}
              theme="regular"
              isValid={isValid("diazepamDose")}
              errorText={getErrorText("diazepamDose")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.bolusSsVolume")}
              field={formik.getFieldProps("bolusSsVolume")}
              theme="regular"
              isValid={isValid("bolusSsVolume")}
              errorText={getErrorText("bolusSsVolume")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.sngNumero")}
              field={formik.getFieldProps("sngNumero")}
              theme="regular"
              isValid={isValid("sngNumero")}
              errorText={getErrorText("sngNumero")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="fullWidth conditioningForm__item">
            <TextField
              field={formik.getFieldProps("others")}
              theme="regular"
              label={t("conditioning.others")}
              multiline={true}
              type="text"
              isValid={isValid("others")}
              errorText={getErrorText("others")}
              onBlur={formik.handleBlur}
              rows={3}
              disabled={isLoading}
              maxLength={2000}
            />
          </div>
        </div>

        <div className="conditioningForm__buttonSet">
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
          <div className="submit_button">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {submitButtonLabel}
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
  );
};

export default ConditioningForm;
