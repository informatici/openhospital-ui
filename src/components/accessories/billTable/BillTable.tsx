import { CircularProgress } from "@material-ui/core";
import { StarRounded } from "@material-ui/icons";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { CustomModal } from "../customModal/CustomModal";
import Table from "../table/Table";
import RenderBillDetails from "./RenderBillDetails";
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
  };
  const order = ["date"];
  const dispatch = useDispatch();
  const [fullBill, setFullBill] = useState({} as FullBillDTO);

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
          status: switchStatus(item.billDTO?.status),
        };
      });
    return results;
  };

  const switchStatus = (status: string | undefined) => {
    switch (status) {
      case "C":
        return "Closed";
      case "O":
        return "Pending";
      case "D":
        return "Deleted";
      default:
        return "Unknown";
    }
  };
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

  return (
    <div>
      <Table
        rowData={formatDataToDisplay(data)}
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
        title={"Bill Details"}
        description={"Bill details"}
        content={<RenderBillDetails fullBill={fullBill} />}
      />
    </div>
  );
};
