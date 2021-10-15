import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO } from "../../../generated";
import { getPendingBills, searchBills } from "../../../state/bills/actions";
import { IState } from "../../../types";
import { CustomModal } from "../customModal/CustomModal";
import Table from "../table/Table";
import useFormatData from "./useFormatData";
import RenderBillDetails from "./RenderBillDetails";
import { IBillTableProps } from "./types";

export const BillTable: FC<IBillTableProps> = ({ status, filter }) => {
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
        dispatch(getPendingBills(filter.patientCode));
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
  }, [dispatch, status, filter]);

  const data = useSelector<IState, FullBillDTO[]>((state) => {
    if (status === "PENDING") {
      return state.bills.getPendingBills.data ?? [];
    } else {
      return state.bills.searchBills.data ?? [];
    }
  });

  const formattedData = useFormatData(data, status);

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
  );
};
