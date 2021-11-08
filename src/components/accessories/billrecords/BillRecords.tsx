import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BillPaymentsDTO, FullBillDTO, PatientDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import {
  deleteBill,
  deleteBillReset,
  getPendingBills,
  payBill,
  searchBills,
} from "../../../state/bills/actions";
import { IState } from "../../../types";
import RenderBillDetails from "../billTable/RenderBillDetails";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import Table from "../table/Table";
import checkIcon from "../../../assets/check-icon.png";

import "./styles.scss";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import numbro from "numbro";

const BillRecords = () => {
  const { t } = useTranslation();
  const pendingHeader = ["date", "amount", "balance"];
  const pendingLabel = {
    date: t("bill.date"),
    amount: t("bill.amount"),
    balance: t("bill.balance"),
  };
  const closedHeader = ["date", "amount"];
  const closedLabel = {
    date: t("bill.date"),
    amount: t("bill.amount"),
  };
  const [activityTransitionState, setActivityTransitionState] =
    useState("IDLE");
  const order = ["date", "balance"];
  //const []
  const dispatch = useDispatch();
  const patient = useSelector<IState, PatientDTO | undefined>(
    (state) => state.patients.selectedPatient.data
  );
  const handleClose = () => {
    setOpenPaymentDialog(false);
  };

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(deleteBillReset());
    }
  }, [activityTransitionState]);

  useEffect(() => {
    if (patient && patient.code) {
      dispatch(getPendingBills(patient.code));
      dispatch(
        searchBills({
          fromDate: "",
          toDate: "",
          patientCode: patient.code,
        })
      );
    }
  }, [patient, dispatch]);

  const pendingBills = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.getPendingBills.data ?? [];
  });

  const formatDataToDisplay = (data: FullBillDTO[]) => {
    return data.map((item) => {
      return {
        billDTO: item.billDTO,
        code: item.billDTO?.id,
        date: item.billDTO?.date ? renderDate(item.billDTO.date) : "",
        amount: currencyFormat(item.billDTO?.amount),
        balance: currencyFormat(item.billDTO?.balance),
      };
    });
    //   .sort(dateComparator("desc", "date"));
  };

  const getCoreRowPending = (row: any) => {
    return {
      fullBill: pendingBills?.find((item) => item.billDTO === row.billDTO),
    };
  };

  const closedBills = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.searchBills.data ?? [];
  });

  const getCoreRowClosed = (row: any) => {
    return {
      fullBill: closedBills?.find((item) => item.billDTO === row.billDTO),
    };
  };

  const [seletedObj, setSeletedObj] = useState({} as any);
  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.delete.status
  );
  const onDelete = (row: any) => {
    setSeletedObj(row);
    dispatch(deleteBill(row.code));
  };

  const onPay = (row: any) => {
    setSeletedObj(row);
    setOpenPaymentDialog(true);
  };

  const handlePayment = (payment: BillPaymentsDTO) => {
    dispatch(payBill(payment));
  };

  return (
    <div className="patientBillRecords">
      <h3>{`${t("bill.pending")} (${pendingBills.length})`}</h3>
      <Table
        rowData={formatDataToDisplay(pendingBills)}
        tableHeader={pendingHeader}
        labelData={pendingLabel}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
        renderItemDetails={RenderBillDetails}
        getCoreRow={getCoreRowPending}
        onDelete={onDelete}
        onPrint={() => {}}
        onPay={onPay}
      />
      <h3>{`${t("bill.closed")} (${closedBills.length})`}</h3>
      <Table
        rowData={formatDataToDisplay(closedBills)}
        tableHeader={closedHeader}
        labelData={closedLabel}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
        renderItemDetails={RenderBillDetails}
        getCoreRow={getCoreRowClosed}
        onPrint={() => {}}
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("common.delete")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: seletedObj.code })}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
      <PaymentDialog
        open={openPaymentDialog}
        handleClose={handleClose}
        balance={numbro.unformat(seletedObj.balance)}
        billCode={seletedObj.code}
        handlePayment={handlePayment}
      />
    </div>
  );
};

export default BillRecords;
