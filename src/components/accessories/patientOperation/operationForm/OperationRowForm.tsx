import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { number, object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import { OperationDTO } from "../../../../generated";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { FIELD_VALIDATION, IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { OperationRowProps } from "./types";

const OperationRowForm: FC<OperationRowProps> = ({
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

  const operationList = useSelector(
    (state: IState) => state.operations.operationList.data
  );

  const renderOptions = (data: OperationDTO[] | undefined) => {
    if (data) {
      return data.map((item) => {
        return {
          value: item.code?.toString() ?? "",
          label: item.description ?? "",
        };
      });
    } else return [];
  };

  const initialValues = getFromFields(fields, "value");
  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const validationSchema = object({
    operation: string().required(t("common.required")),
    opDate: string()
      .required(t("common.required"))
      .test({
        name: "valid",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      })
      .test({
        name: "opDate",
        message: t("operation.dateafteradmission"),
        test: function (value) {
          return moment(currentAdmission?.admDate ?? "").isBefore(
            moment(value)
          );
        },
      }),
    transUnit: number().test({
      name: "valid",
      message: t("common.invalidnumber", { min: 1, max: 20 }),
      test: function (value) {
        return !value || (value && value >= 1 && value <= 20);
      },
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.operation = operationList?.find(
        (item) => item.code === formattedValues.operation
      );

      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
      formik.validateField(fieldName);
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
    resetFormCallback();
    resetForm();
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const operationStatus = useSelector(
    (state: IState) => state.operations.operationList.status
  );

  return (
    <>
      <div className="patientOperationForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("operation.newoperation")
            : t("operation.editoperation") +
              ": " +
              renderDate(formik.values.opDate)}
        </h5>
        <form
          className="patientOperationForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="fullWidth patientOperationForm__item">
              <AutocompleteField
                fieldName="operation"
                fieldValue={formik.values.operation}
                label={t("operation.operation")}
                isValid={isValid("operation")}
                errorText={getErrorText("operation")}
                onBlur={onBlurCallback("operation")}
                options={renderOptions(operationList)}
                loading={operationStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="row start-sm center-xs">
            <div className="patientOperationForm__item">
              <DateField
                fieldName="opDate"
                fieldValue={formik.values.opDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("opDate")}
                errorText={getErrorText("opDate")}
                label={t("operation.opDate")}
                onChange={dateFieldHandleOnChange("opDate")}
                disabled={isLoading}
                required={FIELD_VALIDATION.REQUIRED}
              />
            </div>
            <div className="patientOperationForm__item">
              <TextField
                field={formik.getFieldProps("transUnit")}
                theme="regular"
                label={t("operation.transUnit")}
                isValid={isValid("transUnit")}
                errorText={getErrorText("transUnit")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth patientOperationForm__item">
              <TextField
                field={formik.getFieldProps("opResult")}
                theme="regular"
                label={t("operation.opResult")}
                multiline={true}
                type="text"
                isValid={isValid("opResult")}
                errorText={getErrorText("opResult")}
                onBlur={formik.handleBlur}
                rows={5}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth patientOperationForm__item">
              <TextField
                field={formik.getFieldProps("remarks")}
                theme="regular"
                label={t("operation.remarks")}
                multiline={true}
                type="text"
                isValid={isValid("remarks")}
                errorText={getErrorText("remarks")}
                onBlur={formik.handleBlur}
                rows={5}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="patientOperationForm__buttonSet">
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

export default OperationRowForm;
