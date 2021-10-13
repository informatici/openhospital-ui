import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import DateField from "../dateField/DateField";

import "./styles.scss";
import { BillFilterProps, TBillFilterValues } from "./types";
import { PatientDTO } from "../../../generated";
import SmallButton from "../smallButton/SmallButton";
import moment from "moment";
import PatientAutocomplete from "../patientAutocomplete/PatientAutocomplete";

const BillFilterForm: FC<BillFilterProps> = ({
  onSubmit,
  className,
  fields,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    fromDate: string().required(),
    toDate: string().test({
      name: "toDate",
      message: t("bill.validatetodate"),
      test: function (value) {
        const dateFrom = isNaN(this.parent.fromDate)
          ? this.parent.fromDate
          : new Date(+this.parent.fromDate);
        const dateTo = isNaN(value) ? value : new Date(+value);
        return moment(dateTo) >= moment(dateFrom);
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: false,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(
        fields,
        values
      ) as TBillFilterValues;
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, handleBlur } = formik;

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
        e: React.FocusEvent<HTMLInputElement>,
        value: PatientDTO | undefined
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value?.code ?? "");
      },
    [setFieldValue, handleBlur]
  );

  return (
    <>
      <div id="filterBillForm" className={"filterBillForm " + className}>
        <form className="filterBillForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
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
              <PatientAutocomplete
                theme={"light"}
                fieldName="patientCode"
                fieldValue={formik.values.patientCode}
                label={t("bill.patient")}
                isValid={isValid("patientCode")}
                errorText={getErrorText("patientCode")}
                onBlur={onBlurCallback("patientCode")}
                freeSolo={true}
              />
            </div>
          </div>
          <div className="filterForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit">{t("bill.filterbutton")}</SmallButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillFilterForm;
