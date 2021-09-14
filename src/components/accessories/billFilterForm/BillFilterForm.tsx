import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import DateField from "../dateField/DateField";
import { initialFields } from "./consts";

import "./styles.scss";
import { BillFilterProps } from "./types";

const BillFilterForm: FC<BillFilterProps> = ({
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
    //
  });

  const initialValues = getFromFields(initialFields, "value");
  const options = getFromFields(initialFields, "options");
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
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
    formik.resetForm();
    //resetFormCallback();
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      // resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <>
      <div className="filterBillForm">
        <form className="filterBillForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="filterBillForm__item">
              <AutocompleteField
                fieldName="user"
                fieldValue={formik.values.user}
                label={t("bill.user")}
                isValid={isValid("user")}
                errorText={getErrorText("user")}
                onBlur={onBlurCallback("user")}
                options={options.user}
              />
            </div>

            <div className="filterBillForm__item">
              <DateField
                fieldName="startDate"
                fieldValue={formik.values.startDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("startDate")}
                errorText={getErrorText("startDate")}
                label={t("bill.startDate")}
                onChange={dateFieldHandleOnChange("startDate")}
              />
            </div>
            <div className="filterBillForm__item">
              <DateField
                fieldName="endDate"
                fieldValue={formik.values.endDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("endDate")}
                errorText={getErrorText("endDate")}
                label={t("bill.endDate")}
                onChange={dateFieldHandleOnChange("endDate")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="filterBillForm__item">
              <AutocompleteField
                fieldName="patient"
                fieldValue={formik.values.patient}
                label={t("bill.patient")}
                isValid={isValid("patient")}
                errorText={getErrorText("patient")}
                onBlur={onBlurCallback("patient")}
                options={options.patient}
              />
            </div>
            <div className="filterBillForm__item">
              <AutocompleteField
                fieldName="billItem"
                fieldValue={formik.values.patient}
                label={t("bill.billItem")}
                isValid={isValid("billItem")}
                errorText={getErrorText("billItem")}
                onBlur={onBlurCallback("billItem")}
                options={options.billItem}
              />
            </div>
            <div className="filterBillForm__item">
              <AutocompleteField
                fieldName="affiliate"
                fieldValue={formik.values.patient}
                label={t("bill.affiliate")}
                isValid={isValid("affiliate")}
                errorText={getErrorText("affiliate")}
                onBlur={onBlurCallback("affiliate")}
                options={options.affiliate}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillFilterForm;
