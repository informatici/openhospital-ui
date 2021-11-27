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
  differenceInDays,
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { searchPayments } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { TFilterValues } from "../billTable/types";
import DateField from "../dateField/DateField";
import PatientAutocomplete from "../patientAutocomplete/PatientAutocomplete";
import Button from "../button/Button";
import Table from "../table/Table";
import { IPaymentsTableProps } from "./types";
import "./styles.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import PatientPicker from "../patientPicker/PatientPicker";

export const PaymentsTable: FC<IPaymentsTableProps> = ({ fields }) => {
  const { t } = useTranslation();
  const header = ["date", "amount", "user"];
  const label = {
    id: t("bill.code"),
    date: t("bill.date"),
    amount: t("bill.amount"),
    user: t("bill.user"),
  };
  const order = ["date"];
  const [openFilter, setOpenFilter] = useState(false);
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
        return (
          differenceInDays(new Date(this.parent.fromDate), new Date(value)) >= 0
        );
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
    (fieldName: string) => (value: Date | null) => {
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
      <div className="filterForm">
        <Accordion expanded={openFilter}>
          <AccordionSummary onClick={() => setOpenFilter(!openFilter)}>
            <FilterList fontSize="small" />
            <h5>{t("bill.filterPayments")}</h5>
          </AccordionSummary>
          <AccordionDetails>
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
                  <PatientPicker
                    theme={"regular"}
                    fieldName="patientCode"
                    fieldValue={formik.values.patientCode}
                    label={t("bill.patient")}
                    isValid={isValid("patientCode")}
                    errorText={getErrorText("patientCode")}
                    onBlur={onBlurCallback("patientCode")}
                  />
                </div>
                <div className="filterForm__item filterForm__buttonSet">
                  <div className="submit_button">
                    <Button variant="contained" type="submit">
                      {t("bill.filterbutton")}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="payments__table">
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          isCollapsabile={false}
        />
      </div>
    </div>
  );
};
