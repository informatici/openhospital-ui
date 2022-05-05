import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { number, object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import Button from "../../button/Button";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { TherapyProps } from "./types";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

const TherapyForm: FC<TherapyProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  creationMode,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    medicalId: string().required(t("common.required")),
    qty: number().required(t("common.required")),
    freqInDay: number().required(t("common.required")),
    freqInPeriod: number().required(t("common.required")),
    startDate: string()
      .required(t("common.required"))
      .test({
        name: "startDate",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
    endDate: string()
      .required(t("common.required"))
      .test({
        name: "endDate",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      })
      .test({
        name: "endDate",
        message: t("therapy.validatelastdate"),
        test: function (value) {
          if (moment(+value).isValid()) {
            return moment(+value).isSameOrAfter(moment(+this.parent.startDate));
          } else if (moment(value).isValid()) {
            return moment(value).isSameOrAfter(moment(this.parent.startDate));
          } else return true;
        },
      }),
  });

  const initialValues = getFromFields(fields, "value");

  const medicalOptionsSelector = (state: IState) => {
    if (state.medicals.medicalsOrderByName.data) {
      return state.medicals.medicalsOrderByName.data.map((medical) => {
        return {
          value: medical.code ?? "",
          label: medical.description ?? "",
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
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
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
      <div className="patientTherapyForm">
        <h3 className="formInsertMode">
          {creationMode
            ? t("therapy.newtherapy")
            : t("therapy.edittherapy") +
              ": " +
              renderDate(formik.values.startDate) +
              " - " +
              renderDate(formik.values.endDate)}
        </h3>
        <form
          className="patientTherapyForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item">
              <AutocompleteField
                fieldName="medicalId"
                fieldValue={formik.values.medicalId}
                label={t("therapy.medical")}
                isValid={isValid("medicalId")}
                errorText={getErrorText("medicalId")}
                onBlur={onBlurCallback("medicalId")}
                options={medicalOptions}
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="patientTherapyForm__buttonSet">
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

export default TherapyForm;
