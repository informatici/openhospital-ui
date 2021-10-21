import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BillPaymentsDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { searchPayments } from "../../../state/bills/actions";
import { IState } from "../../../types";
import Table from "../table/Table";
import { IPaymentsTableProps } from "./types";

export const PaymentsTable: FC<IPaymentsTableProps> = ({ filter }) => {
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
    dispatch(searchPayments(filter));
  }, [filter]);

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
