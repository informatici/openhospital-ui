import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BillPaymentsDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { getFromFields } from "../../../libraries/formDataHandling/functions";
import { searchPayments } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { TFilterValues } from "../billTable/types";
import Table from "../table/Table";
import { IPaymentsTableProps, TPaymentsFilterValues } from "./types";

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

  useEffect(() => {
    const initialValues = getFromFields(fields, "value");
    dispatch(searchPayments(initialValues as TFilterValues));
  }, [fields]);

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
  return (
    <div>
      <Table
        rowData={data}
        tableHeader={header}
        labelData={label}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
      />
    </div>
  );
};
