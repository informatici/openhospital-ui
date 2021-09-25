import { CircularProgress } from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BillDTO, FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import InfoBox from "../infoBox/InfoBox";
import Table from "../table/Table";
import { RenderBillItems } from "./RenderBillItems";
import { RenderBillPayments } from "./RenderBillPayments";
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
  const { t } = useTranslation();
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
  const billsStatus = useSelector<IState, string | undefined>((state) => {
    if (status === "ALL") return state.bills.searchBills.status;
    else {
      return state.bills.getPendingBills.status;
    }
  });
  const formatDataToDisplay = (data: FullBillDTO[] | undefined) => {
    let results = new Array();
    if (data)
      results = data.map((item) => {
        return {
          id: item.billDTO?.id ?? "",
          date: item.billDTO?.date ? renderDate(item.billDTO.date) : "",
          patient: item.billDTO?.patName,
          amount: item.billDTO?.amount,
          balance: item.billDTO?.balance,
          status: item.billDTO?.status,
          items: item.billItemsDTO
            ? RenderBillItems({ billItems: item.billItemsDTO })
            : "",
          payments: item.billPaymentsDTO
            ? RenderBillPayments({ payments: item.billPaymentsDTO })
            : "",
        };
      });
    return results;
  };

  return (
    <div>
      <Table
        rowData={formatDataToDisplay(data)}
        tableHeader={header}
        labelData={label}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
      />
    </div>
  );
};
