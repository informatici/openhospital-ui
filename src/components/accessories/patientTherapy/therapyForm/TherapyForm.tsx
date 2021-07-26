import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { IState } from "../../../../types";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import SelectField from "../../selectField/SelectField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { TherapyProps } from "./types";

const TherapyForm: FC<TherapyProps> = ({
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
    medicalId: string().required(t("common.required")),
    startDate: string().required(t("common.required")),
    endDate: string()
      .required(t("common.required"))
      .test({
        name: "endDate",
        message: t("therapy.validatelastdate"),
        test: function (value) {
          return moment(value).isSameOrAfter(moment(this.parent.startDate));
        },
      }),
  });

  const initialValues = getFromFields(fields, "value");

  const medicalOptionsSelector = (state: IState) => {
    if (state.medicals.medicalsOrderByName.data) {
      return state.medicals.medicalsOrderByName.data.map((medical) => {
        return {
          value: medical.code + "",
          label: medical.description + "",
        };
      });
    } else return [];
  };
  const medicalOptions = useSelector((state: IState) =>
    medicalOptionsSelector(state)
  );

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
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <>
      <div className="patientTherapyForm">
        <form
          className="patientTherapyForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item">
              <SelectField
                fieldName="medicalId"
                fieldValue={formik.values.medicalId}
                label={t("therapy.medical")}
                isValid={isValid("medicalId")}
                errorText={getErrorText("medicalId")}
                onBlur={onBlurCallback("medicalId")}
                options={medicalOptions}
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("qty")}
                theme="regular"
                label={t("therapy.quantity")}
                isValid={isValid("qty")}
                errorText={getErrorText("qty")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("freqInDay")}
                theme="regular"
                label={t("therapy.frequencyInDay")}
                isValid={isValid("freqInDay")}
                errorText={getErrorText("freqInDay")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("nbDays")}
                theme="regular"
                label={t("therapy.nbdays")}
                isValid={isValid("nbDays")}
                errorText={getErrorText("nbDays")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("nbWeeks")}
                theme="regular"
                label={t("therapy.nbweeks")}
                isValid={isValid("nbWeeks")}
                errorText={getErrorText("nbWeeks")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("nbMonths")}
                theme="regular"
                label={t("therapy.nbmonths")}
                isValid={isValid("nbMonths")}
                errorText={getErrorText("nbMonths")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div id="frequency" className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("freqInPeriod")}
                theme="regular"
                label={t("therapy.frequencyInPeriod")}
                isValid={isValid("freqInPeriod")}
                errorText={getErrorText("freqInPeriod")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientTherapyForm__item">
              <DateField
                fieldName="startDate"
                fieldValue={formik.values.startDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("startDate")}
                errorText={getErrorText("startDate")}
                label={t("therapy.startDate")}
                onChange={dateFieldHandleOnChange("startDate")}
              />
            </div>
            <div className="patientTherapyForm__item">
              <DateField
                fieldName="endDate"
                fieldValue={formik.values.endDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("endDate")}
                errorText={getErrorText("endDate")}
                label={t("therapy.endDate")}
                onChange={dateFieldHandleOnChange("endDate")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.notifyInt === 1}
                    onChange={() =>
                      setFieldValue(
                        "notifyInt",
                        formik.values.notifyInt === 1 ? 0 : 1
                      )
                    }
                    name="notifyInt"
                  />
                }
                label={<span>{t("therapy.sendnotification")}</span>}
              />
            </div>
            <div className="patientTherapyForm__item">
              <FormControlLabel
                control={
                  <Checkbox
                    name="smsInt"
                    checked={formik.values.smsInt === 1}
                    onChange={() =>
                      setFieldValue(
                        "smsInt",
                        formik.values.smsInt === 1 ? 0 : 1
                      )
                    }
                  />
                }
                label={<span>{t("therapy.sendsms")}</span>}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth patientTherapyForm__item">
              <TextField
                multiline={true}
                theme="regular"
                type="text"
                field={formik.getFieldProps("note")}
                label={t("therapy.note")}
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="patientTherapyForm__buttonSet">
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

export default TherapyForm;
