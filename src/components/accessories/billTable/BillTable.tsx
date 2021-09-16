import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import Table from "../table/Table";
type IStatus = "ALL" | "PENDING" | "CLOSE" | "DELETE";
interface IBillTableProps {
  status: IStatus;
}
export const BillTable: FC<IBillTableProps> = ({ status }) => {
  const header = ["date", "patient", "balance"];
  const label = {
    id: "Bill code",
    date: "Date",
    patient: "Patient",
    status: "Status",
    amount: "Amount",
    balance: "Balance",
  };
  const order = ["date"];
  const dispatch = useDispatch();

  const fromDate = "2019-02-10";
  const toDate = "2021-10-10";
  useEffect(() => {
    switch (status) {
      case "PENDING":
        dispatch(getPendingBills(200));
        break;
      case "CLOSE":
        dispatch(searchBills(fromDate, toDate, 200));
        break;
      case "DELETE":
        dispatch(searchBills(fromDate, toDate, 200));
        break;
      default:
        dispatch(searchBills(fromDate, toDate, 200));
        break;
    }
  }, [status]);
  const data = useSelector<IState, BillDTO[]>(
    (state) => state.bills.searchBills.data ?? []
  );

  const formatDataToDisplay = (data: any[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          id: item.id,
          date: renderDate(item.date),
          patient: item.patName || "",
          amount: item.amount || "",
          balance: item.balance || "",
          status: item.status || "",
        };
      });
    return results;
  };

  return (
    <Table
      rowData={formatDataToDisplay(data)}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={5}
      isCollapsabile={true}
    />
  );
};
