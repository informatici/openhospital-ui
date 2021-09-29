import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
      case "ALL":
        dispatch(searchBills(fromDate, toDate, patientCode));
        break;
    }
  }, [status, fromDate, toDate, patientCode]);

  const data = useSelector<IState, FullBillDTO[]>(
    (state) => state.bills.searchBills.data ?? []
  );

  const formatDataToDisplay = (data: FullBillDTO[] | undefined) => {
    let results = new Array();
    if (data)
      results = data.map((item) => {
        return {
          id: item.billDTO?.id ?? "",
          date: item.billDTO?.date ? renderDate(item.billDTO.date) : "",
          patient: (
            <Link
              to={`/details/${item.billDTO?.patientDTO?.code}/edit`}
              style={{ textDecoration: "none" }}
            >
              <strong>{item.billDTO?.patName}</strong>
            </Link>
          ),
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
        return t("bill.closed");
      case "O":
        return t("bill.pending");
      case "D":
        return t("bill.deleted");
      default:
        return t("bill.unknown");
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
        title={t("bill.details")}
        description={t("bill.details")}
        content={<RenderBillDetails fullBill={fullBill} />}
      />
    </div>
  );
};
