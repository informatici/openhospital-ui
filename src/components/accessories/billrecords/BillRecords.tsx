import React, { useEffect, useRef, useState } from "react";
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
  payBillReset,
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
import { TFields } from "../../../libraries/formDataHandling/types";
import InfoBox from "../infoBox/InfoBox";
import moment from "moment";
import { renderToString } from "react-dom/server";

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
  const user = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
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

  useEffect(() => {
    dispatch(deleteBillReset());
    dispatch(payBillReset());
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
        billDTO: item.billDTO,
        code: item.billDTO?.id,
        date: item.billDTO?.date ? renderDate(item.billDTO.date) : "",
        amount: currencyFormat(item.billDTO?.amount),
        balance: currencyFormat(item.billDTO?.balance),
      };
    });
  };

  const getCoreRowPending = (row: any) => {
    const val = pendingBills?.find((item) => item.billDTO?.id === row.code);
    return {
      fullBill: val,
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

  const [selectedObj, setSeletedObj] = useState({} as any);
  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.delete.status
  );
  const paymentStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.payBill.status
  );

  const onDelete = (row: any) => {
    setSeletedObj(row);
    dispatch(deleteBill(row.code));
  };

  const handlePayment = (values: Record<string, any>) => {
    const newPayment: BillPaymentsDTO = {
      billId: selectedObj.code,
      date: values.paymentDate,
      amount: values.paymentAmount,
      user: user,
    };
    dispatch(payBill(newPayment));
    setOpenPaymentDialog(false);
  };

  const initialFields: TFields = {
    paymentDate: {
      value: new Date().toString(),
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
        (item) => item.billDTO?.id === row.code
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

  return (
    <div className="patientBillRecords" id="patientBillRecords">
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
        onPrint={onPrint}
        onPay={(row) => {
          setSeletedObj(row);
          setOpenPaymentDialog(true);
        }}
      />
      {(deleteStatus === "FAIL" || paymentStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
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
        onPrint={onPrint}
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
      />
      <iframe id="ifmcontentstoprint"></iframe>
    </div>
  );
};

export default BillRecords;
