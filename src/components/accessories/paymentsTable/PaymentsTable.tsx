import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { BillPaymentsDTO, PatientDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { searchPayments } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { TFilterValues } from "../billTable/types";
import DateField from "../dateField/DateField";
import PatientAutocomplete from "../patientAutocomplete/PatientAutocomplete";
import SmallButton from "../smallButton/SmallButton";
import Table from "../table/Table";
import { IPaymentsTableProps } from "./types";
import "./styles.scss";

export const PaymentsTable: FC<IPaymentsTableProps> = ({ fields }) => {
  const { t } = useTranslation();
  const header = ["date", "amount"];
  const label = {
    id: t("bill.code"),
    date: t("bill.date"),
    amount: t("bill.amount"),
    user: t("bill.user"),
  };
  const order = ["date"];
  const dispatch = useDispatch();

  const data = useSelector<IState, {}[]>(
    (state) =>
      state.bills.searchPayments.data?.map((item: BillPaymentsDTO) => {
        return {
          id: item.id,
          date: item.date ? renderDate(item.date) : "",
          amount: currencyFormat(item.amount),
          user: item.user,
        };
      }) ?? []
  );

  const validationSchema = object({
    fromDate: string().required(),
    toDate: string().test({
      name: "toDate",
      message: t("bill.validatetodate"),
      test: function (value) {
        const dateFrom = isNaN(this.parent.fromDate)
          ? new Date(this.parent.fromDate)
          : new Date(+this.parent.fromDate);
        const dateTo = isNaN(value) ? new Date(value) : new Date(+value);
        return +dateTo >= +dateFrom;
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
      ) as TFilterValues;
      dispatch(searchPayments(formattedValues as TFilterValues));
    },
  });

  useEffect(() => {
    dispatch(searchPayments(initialValues as TFilterValues));
  }, [fields]);

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
    <div className="bill__payments">
      <div className={"filterForm"}>
        <form className="filterForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="filterForm__item">
              <DateField
                theme={"regular"}
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
            <div className="filterForm__item">
              <DateField
                fieldName="toDate"
                fieldValue={formik.values.toDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("toDate")}
                errorText={getErrorText("toDate")}
                label={t("bill.todate")}
                onChange={dateFieldHandleOnChange("toDate")}
              />
            </div>
            <div className="filterForm__item">
              <PatientAutocomplete
                theme={"regular"}
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
      <div className="payments__table">
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          isCollapsabile={true}
        />
      </div>
    </div>
  );
};
