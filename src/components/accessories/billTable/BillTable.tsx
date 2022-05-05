import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO, PatientDTO } from "../../../generated";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { CustomModal } from "../customModal/CustomModal";
import Table from "../table/Table";
import useFormatData from "./useFormatData";
import RenderBillDetails from "./RenderBillDetails";
import { IBillTableProps, TFilterValues } from "./types";
import DateField from "../dateField/DateField";
import { useFormik } from "formik";
import Button from "../button/Button";
import { object, string } from "yup";
import {
  differenceInSeconds,
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { get, has } from "lodash";
import SelectField from "../selectField/SelectField";
import "./styles.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@material-ui/core";
import { Add, FilterList } from "@material-ui/icons";
import PatientPicker from "../patientPicker/PatientPicker";
import { useHistory } from "react-router";
import PatientAutocomplete from "../patientAutocomplete/PatientAutocomplete";
import InfoBox from "../infoBox/InfoBox";

export const BillTable: FC<IBillTableProps> = ({ fields }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = ["patient", "date", "status"];
  const dateFields = ["date"];
  const label = {
    id: t("bill.code"),
    date: t("bill.date"),
    patient: t("bill.patient"),
    status: t("bill.status"),
    amount: t("bill.amount"),
    balance: t("bill.balance"),
    patId: t("bill.patId"),
    lastPayment: t("bill.lastPayment"),
  };
  const order = ["date", "status"];
  const [fullBill, setFullBill] = useState({} as FullBillDTO);
  const history = useHistory();

  const validationSchema = object({
    fromDate: string().required(),
    status: string().required(),
    toDate: string().test({
      name: "toDate",
      message: t("bill.validatetodate"),
      test: function (value) {
        return (
          differenceInSeconds(
            new Date(this.parent.fromDate),
            new Date(value)
          ) >= 0
        );
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");
  const [filter, setFilter] = useState(initialValues as TFilterValues);
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(
        fields,
        values
      ) as TFilterValues;
      setFilter(formattedValues);
    },
  });

  useEffect(() => {
    switch (filter.status) {
      case "PENDING":
        dispatch(getPendingBills(+filter.patientCode));
        break;
      default:
        dispatch(searchBills(filter));
        break;
    }
  }, [filter]);

  const { setFieldValue, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (val: Date | null) => {
      setFieldValue(fieldName, val);
      if (fieldName === "month") {
        const month = val?.getUTCMonth() ?? new Date().getUTCMonth();
        const year = val?.getUTCFullYear() ?? new Date().getUTCFullYear();
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        setFieldValue("fromDate", start);
        setFieldValue("toDate", end);
      }

      if (fieldName === "year") {
        const year = val?.getUTCFullYear() ?? new Date().getUTCFullYear();
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        setFieldValue("fromDate", start);
        setFieldValue("toDate", end);
      }
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
        value: PatientDTO | string | undefined
      ) => {
        handleBlur(e);
        typeof value === "string"
          ? setFieldValue(fieldName, value)
          : setFieldValue(fieldName, value?.code ?? "");
      },
    [setFieldValue, handleBlur]
  );

  const data = useSelector<IState, FullBillDTO[]>((state) => {
    if (filter.status === "PENDING") {
      return state.bills.getPendingBills.data ?? [];
    } else {
      return state.bills.searchBills.data ?? [];
    }
  });

  const status = useSelector<IState, string | undefined>((state) => {
    if (filter.status === "PENDING") {
      return state.bills.getPendingBills.status;
    } else {
      return state.bills.searchBills.status;
    }
  });

  const errorMessage = useSelector<IState>((state) => {
    return (
      (filter.status === "PENDING"
        ? state.bills.getPendingBills.error
        : state.bills.searchBills.error) ?? t("common.somethingwrong")
    );
  }) as string;

  const formattedData = useFormatData(data, filter.status);

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleView = (row: any) => {
    const bill = data.find((item) => item.bill?.id === row.id) ?? {};
    setFullBill(bill);
    handleOpen();
  };

  const statusOptions = [
    {
      label: t("bill.allbills"),
      value: "ALL",
    },
    {
      label: t("bill.pending"),
      value: "PENDING",
    },
    {
      label: t("bill.closed"),
      value: "CLOSE",
    },
    {
      label: t("bill.deleted"),
      value: "DELETE",
    },
  ];

  return (
    <div className="billing_bills">
      <div className="billing__header">
        <div className="billing__title">{t("nav.billing")}</div>
        <div className="billing__actions">
          <Button
            onClick={() => history.push("/search")}
            type="button"
            variant="contained"
          >
            <Add fontSize="small" />
            <span className="new__button__label">{t("bill.newbill")}</span>
          </Button>
        </div>
      </div>

      {(() => {
        switch (status) {
          case "FAIL":
            return <InfoBox type="error" message={errorMessage} />;

          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS_EMPTY":
            return <InfoBox type="warning" message={t("common.emptydata")} />;

          case "SUCCESS":
            return (
              <>
                <div className="filterBillForm">
                  <Accordion expanded={openFilter}>
                    <AccordionSummary
                      onClick={() => setOpenFilter(!openFilter)}
                    >
                      <FilterList fontSize="small" />
                      <h5>{t("bill.filterBills")}</h5>
                    </AccordionSummary>
                    <AccordionDetails>
                      <form
                        className="filterBillForm__form"
                        onSubmit={formik.handleSubmit}
                      >
                        <div className="filterBillForm__item">
                          <SelectField
                            fieldName="status"
                            fieldValue={formik.values.status}
                            label={t("bill.status")}
                            isValid={isValid("status")}
                            errorText={getErrorText("status")}
                            onBlur={onBlurCallback("status")}
                            options={statusOptions}
                          />
                        </div>
                        <div className="filterBillForm__item">
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
                        <div className="filterBillForm__item">
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

                        <div className="filterBillForm__item">
                          <DateField
                            fieldName="month"
                            views={["month"]}
                            fieldValue={formik.values.month}
                            disableFuture={true}
                            theme="regular"
                            format="MMMM"
                            isValid={isValid("month")}
                            errorText={getErrorText("month")}
                            label={t("bill.month")}
                            onChange={dateFieldHandleOnChange("month")}
                          />
                        </div>
                        <div className="filterBillForm__item">
                          <DateField
                            fieldName="year"
                            views={["year"]}
                            fieldValue={formik.values.year}
                            disableFuture={true}
                            theme="regular"
                            format="yyyy"
                            isValid={isValid("year")}
                            errorText={getErrorText("year")}
                            label={t("bill.year")}
                            onChange={dateFieldHandleOnChange("year")}
                          />
                        </div>
                        <div className="filterBillForm__item">
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
                        <div className="filterBillForm__item filterForm__buttonSet">
                          <Button variant="contained" type="submit">
                            {t("bill.filterbutton")}
                          </Button>
                        </div>
                      </form>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div className="bills__table">
                  <Table
                    rowData={formattedData}
                    dateFields={dateFields}
                    tableHeader={header}
                    labelData={label}
                    columnsOrder={order}
                    rowsPerPage={5}
                    isCollapsabile={true}
                    onView={handleView}
                  />
                  <CustomModal
                    open={open}
                    onClose={handleClose}
                    title={t("bill.details")}
                    description={t("bill.details")}
                    content={
                      <RenderBillDetails
                        fullBill={fullBill}
                        skipPatientHeader={false}
                      />
                    }
                  />
                </div>
              </>
            );
        }
      })()}
    </div>
  );
};
