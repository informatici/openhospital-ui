import React, { FunctionComponent, useCallback, useEffect } from "react";
import { DateRangePicker, MobileDateRangePicker } from "@mui/lab";
import { IProps } from "./types";
import "./styles.scss";
import { FIELD_VALIDATION } from "../../../types";
import { TextField, TextFieldProps, useMediaQuery } from "@mui/material";
import DateField from "../dateField/DateField";
import { object, string } from "yup";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useFormik } from "formik";
import { get, has } from "lodash";
const DateRangeField: FunctionComponent<IProps> = ({
  startLabel,
  endLabel,
  fieldValue = [null, null],
  onChange,
}) => {
  const { t } = useTranslation();

  const onChangeHandler = (value: any) => {
    onChange(value);
  };

  const validationSchema = object({
    from: string()
      .required(t("common.required"))
      .test({
        name: "from",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      })
      .test({
        name: "from",
        message: t("common.datebefore"),
        test: function (value) {
          return moment(this.parent.to).isValid()
            ? moment(value).isSameOrBefore(this.parent.to)
            : true;
        },
      }),
    to: string()
      .required(t("common.required"))
      .test({
        name: "to",
        message: t("common.dateafter", {
          from: moment(new Date()).add(1, "day").format("DD/MM/YYYY"),
        }),
        test: function (value) {
          return moment(value).isSameOrAfter(moment(this.parent.from));
        },
      }),
  });

  const formik = useFormik({
    initialValues: {
      from: (fieldValue?.[0] ? moment(fieldValue[0]) : moment()).toISOString(),
      to: (fieldValue?.[1]
        ? moment(fieldValue[1])
        : moment().add(1, "day")
      ).toISOString(),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      onChange([moment(values.from).toDate(), moment(values.to).toDate()]);
    },
  });

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      formik.setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
      formik.validateForm().then(() => {
        if (formik.isValid) {
          formik.submitForm();
        }
      });
    },
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

  return (
    <div className="dateRangeField">
      <DateField
        fieldName="from"
        fieldValue={formik.values.from}
        disableFuture={true}
        theme="regular"
        format="dd/MM/yyyy"
        isValid={isValid("from")}
        errorText={getErrorText("from")}
        label={startLabel ?? t("common.from")}
        onChange={dateFieldHandleOnChange("from")}
      />
      <span>-</span>
      <DateField
        fieldName="to"
        fieldValue={formik.values.to}
        disableFuture={true}
        theme="regular"
        format="dd/MM/yyyy"
        isValid={isValid("to")}
        errorText={getErrorText("to")}
        label={endLabel ?? t("common.to")}
        onChange={dateFieldHandleOnChange("to")}
      />
    </div>
  );
};

export default DateRangeField;
