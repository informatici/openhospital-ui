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
import PatientAutocomplete from "../patientAutocomplete/PatientAutocomplete";
import DateField from "../dateField/DateField";
import { useFormik } from "formik";
import SmallButton from "../smallButton/SmallButton";
import { object, string } from "yup";
import moment from "moment";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { get, has } from "lodash";
import { computeBillSummary } from "../../activities/manageBillActivity/config";
import { TUserCredentials } from "../../../state/main/types";
import SelectField from "../selectField/SelectField";

export const BillTable: FC<IBillTableProps> = ({
  fields,
  handleSummaryChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const header = ["date", "patient", "balance", "status"];
  const label = {
    id: t("bill.code"),
    date: t("bill.date"),
    patient: t("bill.patient"),
    status: t("bill.status"),
    amount: t("bill.amount"),
    balance: t("bill.balance"),
  };
  const order = ["date", "balance"];
  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  const [fullBill, setFullBill] = useState({} as FullBillDTO);

  const validationSchema = object({
    fromDate: string().required(),
    status: string().required(),
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
  const search = (filter: TFilterValues) => {
    switch (filter.status) {
      case "PENDING":
        dispatch(getPendingBills(+filter.patientCode));
        break;
      case "CLOSE":
        dispatch(searchBills(filter));
        break;
      case "DELETE":
        dispatch(searchBills(filter));
        break;
      default:
        dispatch(searchBills(filter));
        break;
    }
  };

  const initialValues = getFromFields(fields, "value");
  const [filter, setFilter] = useState(initialValues as TFilterValues);
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: false,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(
        fields,
        values
      ) as TFilterValues;
      setFilter(formattedValues);
    },
  });

  useEffect(() => {
    search(filter);
  }, [filter]);

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

  const formattedData = useFormatData(data, filter.status);

  useEffect(() => {
    if (data && filter.status === "ALL") {
      const summary = computeBillSummary(
        data,
        filter.fromDate,
        filter.toDate,
        userCredentials?.displayName ?? ""
      );
      handleSummaryChange(summary);
    }
  }, [filter, data]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleView = (row: any) => {
    const bill = data.find((item) => item.billDTO?.id === row.id) ?? {};
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
    <div className="patients__bills">
      <div className={"filterBillForm "}>
        <form className="filterBillForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
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
          </div>
          <div className="row start-sm center-xs">
            <div className="halfWidth filterBillForm__item">
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
            <div className="filterForm__buttonSet filterBillForm__item">
              <div className="submit_button">
                <SmallButton type="submit">
                  {t("bill.filterbutton")}
                </SmallButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bills__table">
        <Table
          rowData={formattedData}
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
          content={<RenderBillDetails fullBill={fullBill} />}
        />
      </div>
    </div>
  );
};
