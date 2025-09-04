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
import * as yup from "yup";
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

  const validationSchema = yup.object({
    aspiration: yup.boolean(),
    mce: yup.number().nullable(),
    ventilation: yup.number().nullable(),
    oxygenDebit: yup.number().nullable(),
    sgVolume: yup.number().nullable(),
    diazepamDose: yup.number().nullable(),
    bolusSsVolume: yup.number().nullable(),
    sngNumber: yup.string().nullable(),
    others: yup.string().nullable(),
    cpap: yup.boolean(),
    performedAt: yup.date().required(t("common.required")),
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
              fieldName="performedAt"
              fieldValue={formik.values.performedAt}
              disableFuture={true}
              theme="regular"
              format="dd/MM/yyyy HH:mm"
              isValid={isValid("performedAt")}
              errorText={getErrorText("performedAt")}
              label={t("conditioning.performedAt")}
              onChange={dateFieldHandleOnChange("performedAt")}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.mce")}
              field={formik.getFieldProps("mce")}
              theme="regular"
              isValid={isValid("mce")}
              errorText={getErrorText("mce")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.ventilation")}
              field={formik.getFieldProps("ventilation")}
              theme="regular"
              isValid={isValid("ventilation")}
              errorText={getErrorText("ventilation")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.oxygenDebit")}
              field={formik.getFieldProps("oxygenDebit")}
              theme="regular"
              isValid={isValid("oxygenDebit")}
              errorText={getErrorText("oxygenDebit")}
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
              label={t("conditioning.sngNumber")}
              field={formik.getFieldProps("sngNumber")}
              theme="regular"
              isValid={isValid("sngNumber")}
              errorText={getErrorText("sngNumber")}
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
