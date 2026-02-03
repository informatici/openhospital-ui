import { useFormik } from "formik";
import { useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import TextField from "../../textField/TextField";
import { initialFields } from "../consts";
import "./styles.scss";
import { TherapyFormFieldName, TherapyProps } from "./types";

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
    qty: number().min(1).required(t("common.required")),
    freqInDay: number().min(1).required(t("common.required")),
    freqInPeriod: number().min(1).required(t("common.required")),
    nbDays: number().min(0).required(t("common.required")),
    nbWeeks: number().min(0).required(t("common.required")),
    nbMonths: number().min(0).required(t("common.required")),
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
  const medicalOptions = useAppSelector((state: IState) =>
    medicalOptionsSelector(state)
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues as any);
    },
  });

  const { setFieldValue, resetForm } = formik;

  const computeEndDate = (startDate: any) => {
    const endDate = moment(startDate)
      .add(-1, "days")
      .add(parseInt(formik.values.nbDays), "days")
      .add(parseInt(formik.values.nbWeeks), "weeks")
      .add(parseInt(formik.values.nbMonths), "months");
    setFieldValue("endDate", endDate.toISOString());
    formik.validateField("endDate");
  };

  const handleBlur = useCallback(
    (fieldName: TherapyFormFieldName) => (e: React.FocusEvent<any>) => {
      const value = parseInt(e.target.value);
      setFieldValue(
        fieldName,
        isNaN(value) ? initialFields[fieldName].value : Math.abs(value)
      );
      computeEndDate(formik.values.startDate);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik]
  );

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      if (fieldName === "startDate") {
        computeEndDate(value);
        setFieldValue(fieldName, value);
        formik.setFieldTouched(fieldName);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik]
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
        formik.handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [formik, setFieldValue]
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
        <h5 className="formInsertMode">
          {creationMode
            ? t("therapy.newtherapy")
            : t("therapy.edittherapy") +
              ": " +
              renderDate(formik.values.startDate) +
              " - " +
              renderDate(formik.values.endDate)}
        </h5>
        <form
          className="patientTherapyForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="fullWidth patientTherapyForm__item">
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
          </div>
          <div className="row start-sm center-xs bottom-sm">
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
            <div className="patientTherapyForm__item">
              <TextField
                field={formik.getFieldProps("nbDays")}
                theme="regular"
                label={t("therapy.nbdays")}
                isValid={isValid("nbDays")}
                errorText={getErrorText("nbDays")}
                onBlur={handleBlur("nbDays")}
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
                onBlur={handleBlur("nbWeeks")}
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
                onBlur={handleBlur("nbMonths")}
                type="number"
                disabled={isLoading}
              />
            </div>
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
                disabled={true}
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
