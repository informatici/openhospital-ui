import { debounce } from "@material-ui/core";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
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
  theme,
  onSubmit,
  className,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    toDate: string().test({
      name: "toDate",
      message: t("bill.validatetodate"),
      test: function (value) {
        if (moment(+value).isValid()) {
          return moment(+value).isSameOrAfter(moment(+this.parent.fromDate));
        } else if (moment(value).isValid()) {
          return moment(value).isSameOrAfter(moment(this.parent.fromDate));
        } else return true;
      },
    }),
  });

  //const handleFilterForm = ()

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
      if (fieldName !== "fromDate") formik.handleSubmit();
    },
    [setFieldValue, formik.handleSubmit]
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
        formik.handleSubmit();
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
      <div className={"filterBillForm " + className}>
        <form className="filterBillForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="fullWidth filterBillForm__item">
              <AutocompleteField
                fieldName="user"
                theme={"light"}
                fieldValue={formik.values.user}
                label={t("bill.user")}
                isValid={isValid("user")}
                errorText={getErrorText("user")}
                onBlur={onBlurCallback("user")}
                options={options.user}
              />
            </div>

            <div className="fullWidth filterBillForm__item">
              <DateField
                theme={"light"}
                fieldName="fromDate"
                fieldValue={formik.values.fromDate}
                disableFuture={false}
                format="dd/MM/yyyy"
                isValid={isValid("fromDate")}
                errorText={getErrorText("fromDate")}
                label={t("bill.fromdate")}
                onChange={dateFieldHandleOnChange("fromDate")}
              />
            </div>
            <div className="fullWidth filterBillForm__item">
              <DateField
                fieldName="toDate"
                fieldValue={formik.values.toDate}
                disableFuture={false}
                theme="light"
                format="dd/MM/yyyy"
                isValid={isValid("toDate")}
                errorText={getErrorText("toDate")}
                label={t("bill.todate")}
                onChange={dateFieldHandleOnChange("toDate")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth filterBillForm__item">
              <AutocompleteField
                theme={"light"}
                fieldName="patient"
                fieldValue={formik.values.patient}
                label={t("bill.patient")}
                isValid={isValid("patient")}
                errorText={getErrorText("patient")}
                onBlur={onBlurCallback("patient")}
                options={options.patient}
              />
            </div>
            <div className="fullwidth filterBillForm__item">
              <AutocompleteField
                theme={"light"}
                fieldName="billItem"
                fieldValue={formik.values.patient}
                label={t("bill.billitem")}
                isValid={isValid("billItem")}
                errorText={getErrorText("billItem")}
                onBlur={onBlurCallback("billItem")}
                options={options.billItem}
              />
            </div>
            <div className="fullwidth filterBillForm__item">
              <AutocompleteField
                theme={"light"}
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
