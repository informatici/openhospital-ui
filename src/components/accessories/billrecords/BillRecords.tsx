import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BillPaymentsDTO, FullBillDTO, PatientDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import {
  closeBill,
  closeBillReset,
  deleteBill,
  deleteBillReset,
  getPendingBills,
  payBill,
  payBillReset,
  searchBills,
} from "../../../state/bills/actions";
import { IState } from "../../../types";
import RenderBillDetails from "../billTable/RenderBillDetails";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import Table from "../table/Table";
import checkIcon from "../../../assets/check-icon.png";
import warningIcon from "../../../assets/warning-icon.png";
import "./styles.scss";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import numbro from "numbro";
import { TFields } from "../../../libraries/formDataHandling/types";
import InfoBox from "../infoBox/InfoBox";
import moment from "moment";
import { renderToString } from "react-dom/server";
import { parseDate } from "../../../libraries/formDataHandling/functions";

const BillRecords = () => {
  const { t } = useTranslation();

  const pendingHeader = ["date", "amount", "balance"];
  const pendingDateFields = ["date"];
  const pendingLabel = {
    date: t("bill.date"),
    amount: t("bill.amount"),
    balance: t("bill.balance"),
  };
  const closedHeader = ["date", "amount"];
  const closedDateFields = ["date"];
  const closedLabel = {
    date: t("bill.date"),
    amount: t("bill.amount"),
  };
  const user = useSelector(
    (state: IState) => state.main.authentication.data?.username
  );

  const order = ["date", "balance"];
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const patient = useSelector<IState, PatientDTO | undefined>(
    (state) => state.patients.selectedPatient.data
  );
  const handleClose = () => {
    setOpenPaymentDialog(false);
  };

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openCloseBillDialog, setOpenCloseBillDialog] = useState(false);

  useEffect(() => {
    dispatch(deleteBillReset());
    dispatch(payBillReset());
    dispatch(closeBillReset());
  }, []);

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
        billDTO: item.bill,
        code: item.bill?.id,
        date: item.bill?.date ? renderDate(item.bill.date) : "",
        amount: currencyFormat(item.bill?.amount),
        balance: currencyFormat(item.bill?.balance),
      };
    });
  };

  const getCoreRowPending = (row: any) => {
    const val = pendingBills?.find((item) => item.bill?.id === row.code);
    return {
      fullBill: val,
    };
  };

  const closedBills = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.searchBills.data ?? [];
  });

  const getCoreRowClosed = (row: any) => {
    return {
      fullBill: closedBills?.find((item) => item.bill === row.billDTO),
    };
  };

  const [selectedObj, setSeletedObj] = useState({} as any);

  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.delete.status
  );
  const paymentStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.payBill.status
  );

  const closeStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.closeBill.status
  );

  const errorMessage = useSelector<IState>(
    (state) =>
      state.bills.delete.error?.message ||
      state.bills.payBill.error?.message ||
      state.bills.closeBill.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const onDelete = (row: any) => {
    setSeletedObj(row);
    dispatch(deleteBill(row.code));
  };

  const handlePayment = (values: Record<string, any>) => {
    const newPayment: BillPaymentsDTO = {
      billId: selectedObj.code,
      date: parseDate(values.paymentDate),
      amount: parseFloat(values.paymentAmount),
      user: user,
    };
    dispatch(payBill(newPayment));
    setOpenPaymentDialog(false);
  };

  const initialFields: TFields = {
    paymentDate: {
      value: parseDate(Date.now().toString()),
      type: "date",
    },
    paymentAmount: {
      value: numbro.unformat(selectedObj?.balance ?? "0") + "",
      type: "number",
    },
  };

  const onPrint = (row: any) => {
    let bill =
      [...pendingBills, ...closedBills].find(
        (item) => item.bill?.id === row.code
      ) ?? {};

    const content = (
      <RenderBillDetails fullBill={bill} skipPatientHeader={false} />
    );
    const frame = (
      document.getElementById("ifmcontentstoprint") as HTMLIFrameElement
    )?.contentWindow;
    frame?.document.open();
    frame?.document.write(renderToString(content));
    frame?.document.close();
    frame?.focus();
    frame?.print();
  };

  const handleCloseBill = (row: any) => {
    setSeletedObj(row);
    setOpenCloseBillDialog(true);
  };

  return (
    <div className="patientBillRecords" id="patientBillRecords">
      <h3>{`${t("bill.pending")} (${pendingBills.length})`}</h3>
      <Table
        rowData={formatDataToDisplay(pendingBills)}
        tableHeader={pendingHeader}
        dateFields={pendingDateFields}
        labelData={pendingLabel}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
        renderItemDetails={RenderBillDetails}
        getCoreRow={getCoreRowPending}
        onDelete={onDelete}
        onPrint={onPrint}
        onClose={handleCloseBill}
        onPay={(row) => {
          setSeletedObj(row);
          setOpenPaymentDialog(true);
        }}
      />
      {(deleteStatus === "FAIL" ||
        paymentStatus === "FAIL" ||
        closeStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      <h3>{`${t("bill.closed")} (${closedBills.length})`}</h3>
      <Table
        rowData={formatDataToDisplay(closedBills)}
        dateFields={closedDateFields}
        tableHeader={closedHeader}
        labelData={closedLabel}
        columnsOrder={order}
        rowsPerPage={5}
        isCollapsabile={true}
        renderItemDetails={RenderBillDetails}
        getCoreRow={getCoreRowClosed}
        onPrint={onPrint}
        onDelete={onDelete}
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("common.delete")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: selectedObj.code })}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => dispatch(deleteBillReset())}
        handleSecondaryButtonClick={() => {}}
      />
      <ConfirmationDialog
        isOpen={paymentStatus === "SUCCESS"}
        title={t("bill.payment")}
        icon={checkIcon}
        info={t("bill.paymentsuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          dispatch(payBillReset());
        }}
        handleSecondaryButtonClick={() => ({})}
      />
      <PaymentDialog
        open={openPaymentDialog}
        handleClose={handleClose}
        handlePayment={handlePayment}
        fields={initialFields}
        billDate={moment(selectedObj.date, "DD/MM/YYYY").toDate()}
        billId={selectedObj.code}
      />
      <ConfirmationDialog
        isOpen={openCloseBillDialog}
        title={t("bill.close")}
        icon={warningIcon}
        info={t("bill.doyouwanttoclose", { code: selectedObj.code })}
        primaryButtonLabel="YES"
        secondaryButtonLabel="NO"
        handlePrimaryButtonClick={() => {
          dispatch(closeBill(selectedObj.code, selectedObj));
          setOpenCloseBillDialog(false);
        }}
        handleSecondaryButtonClick={() => setOpenCloseBillDialog(false)}
      />
      <ConfirmationDialog
        isOpen={closeStatus === "SUCCESS"}
        title={t("bill.close")}
        icon={checkIcon}
        info={t("bill.closesuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          dispatch(closeBillReset());
        }}
        handleSecondaryButtonClick={() => ({})}
      />
      <iframe id="ifmcontentstoprint"></iframe>
    </div>
  );
};

export default BillRecords;
