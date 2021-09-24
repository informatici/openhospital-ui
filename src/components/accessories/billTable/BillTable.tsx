import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BillDTO, FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import Table from "../table/Table";
type IStatus = "ALL" | "PENDING" | "CLOSE" | "DELETE";
interface IBillTableProps {
  status: IStatus;
  fromDate: string;
  toDate: string;
  patientCode: number;
}
export const BillTable: FC<IBillTableProps> = ({
  status,
  fromDate,
  toDate,
  patientCode,
}) => {
  const header = ["date", "patient", "balance"];
  const label = {
    id: "Bill code",
    date: "Date",
    patient: "Patient",
    status: "Status",
    amount: "Amount",
    balance: "Balance",
    items: "Items",
    payments: "Payments",
  };
  const order = ["date"];
  const dispatch = useDispatch();

  useEffect(() => {
    switch (status) {
      case "PENDING":
        dispatch(getPendingBills(patientCode));
        break;
      case "CLOSE":
        dispatch(searchBills(fromDate, toDate, patientCode));
        break;
      case "DELETE":
        dispatch(searchBills(fromDate, toDate, patientCode));
        break;
      default:
        dispatch(searchBills(fromDate, toDate, patientCode));
        break;
    }
  }, [status, fromDate, toDate, patientCode]);

  const data = useSelector<IState, FullBillDTO[]>(
    (state) => state.bills.searchBills.data ?? []
  );

  const formatDataToDisplay = (data: FullBillDTO[] | undefined) => {
    let results: any[] = [];
    if (data)
      results = data.map((item) => {
        return {
          id: item.billDTO?.id ?? "",
          date: renderDate(item.billDTO?.date || ""),
          patient: item.billDTO?.patName,
          amount: item.billDTO?.amount,
          balance: item.billDTO?.balance,
          status: item.billDTO?.status,
          items: "",
          payments: "",
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
