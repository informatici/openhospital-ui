import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { object, string, number } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import { initialFields } from "../consts";
import "./styles.scss";
import { DischargeProps } from "./types";

const DischargeForm: FC<DischargeProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    disDate: string().required(t("common.required")),
    disType: string().required(t("common.required")),
    diseaseOut1: string().required(t("common.required")),
  });

  const initialValues = getFromFields(fields, "value");

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
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm({ values: initialFields });
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <>
      <div className="patientDischargeForm">
        <form
          className="patientDischargeForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientDischargeForm__item">
              <DateField
                fieldName="disDate"
                fieldValue={formik.values.disDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("disDate")}
                errorText={getErrorText("disDate")}
                label={t("admission.disDate")}
                onChange={dateFieldHandleOnChange("disDate")}
              />
            </div>
            <div className="patientDischargeForm__item">
              <TextField
                field={formik.getFieldProps("bedDays")}
                theme="regular"
                label={t("admission.bedDays")}
                isValid={isValid("bedDays")}
                errorText={getErrorText("bedDays")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientDischargeForm__item">
              <AutocompleteField
                fieldName="disType"
                fieldValue={formik.values.disType}
                label={t("admission.disType")}
                isValid={isValid("disType")}
                errorText={getErrorText("disType")}
                onBlur={onBlurCallback("disType")}
                options={initialFields.disType.options ?? []}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientDischargeForm__item fullWidth">
              <AutocompleteField
                fieldName="diseaseOut1"
                fieldValue={formik.values.diseaseOut1}
                label={t("admission.diseaseOut1")}
                isValid={isValid("diseaseOut1")}
                errorText={getErrorText("diseaseOut1")}
                onBlur={onBlurCallback("diseaseOut1")}
                options={initialFields.diseaseOut1.options ?? []}
              />
            </div>
            <div className="patientDischargeForm__item fullWidth">
              <AutocompleteField
                fieldName="diseaseOut2"
                fieldValue={formik.values.diseaseOut1}
                label={t("admission.diseaseOut2")}
                isValid={isValid("diseaseOut2")}
                errorText={getErrorText("diseaseOut2")}
                onBlur={onBlurCallback("diseaseOut2")}
                options={initialFields.diseaseOut2.options ?? []}
              />
            </div>
            <div className="patientDischargeForm__item fullWidth">
              <AutocompleteField
                fieldName="diseaseOut3"
                fieldValue={formik.values.diseaseOut3}
                label={t("admission.diseaseOut3")}
                isValid={isValid("diseaseOut3")}
                errorText={getErrorText("diseaseOut3")}
                onBlur={onBlurCallback("diseaseOut3")}
                options={initialFields.diseaseOut3.options ?? []}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientDischargeForm__itemHalf">
              <TextField
                field={formik.getFieldProps("cliDiaryCharge")}
                theme="regular"
                label={t("admission.cliDiaryCharge")}
                isValid={isValid("cliDiaryCharge")}
                errorText={getErrorText("cliDiaryCharge")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>
            <div className="patientDischargeForm__itemHalf">
              <TextField
                field={formik.getFieldProps("imageryCharge")}
                theme="regular"
                label={t("admission.imageryCharge")}
                isValid={isValid("imageryCharge")}
                errorText={getErrorText("imageryCharge")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>
          </div>
          <div className="patientDischargeForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit" disabled={isLoading}>
                {submitButtonLabel}
              </SmallButton>
            </div>
            <div className="reset_button">
              <TextButton onClick={() => setOpenResetConfirmation(true)}>
                {resetButtonLabel}
              </TextButton>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={resetButtonLabel.toUpperCase()}
            info={`Are you sure to ${resetButtonLabel} the Form?`}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel="Dismiss"
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default DischargeForm;
