import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { TherapyTransitionState } from "./types";
import {
  billItemInitialFields,
  billPaymentInitialFields,
  initialFields,
} from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { IState } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

import checkIcon from "../../../assets/check-icon.png";
import { newBill, newBillReset } from "../../../state/bills/actions";
import { BillItemsDTO, BillPaymentsDTO, FullBillDTO } from "../../../generated";
import { IBillsState } from "../../../state/bills/types";
import InfoBox from "../infoBox/InfoBox";
import {
  parseDate,
  updateBillPaymentFields,
  updateBillItemFields,
} from "../../../libraries/formDataHandling/functions";
import { CircularProgress } from "@material-ui/core";
import { getMedicals } from "../../../state/medicals/actions";
import { getExams } from "../../../state/exams/actions";
import BillDataForm from "../billDataForm/BillDataForm";

const PatientBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const [billToEdit, setBillToEdit] = useState({} as FullBillDTO);

  const [itemToEdit, setItemToEdit] = useState({} as BillItemsDTO);
  const [paymentToEdit, setPaymentToEdit] = useState({} as BillPaymentsDTO);
  const [itemCreationMode, setItemCreationMode] = useState(true);
  const [paymentCreationMode, setPaymentCreationMode] = useState(true);

  const [billItemsDTO, setBillItemsDTO] = useState<BillItemsDTO[]>([]);
  const [billPaymentsDTO, setBillPaymentsDTO] = useState<BillPaymentsDTO[]>([]);

  const [creationMode, setCreationMode] = useState(true);

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    dispatch(getMedicals());
    dispatch(getExams());
    dispatch(newBillReset());
    setCreationMode(true);
    setItemCreationMode(true);
    setPaymentCreationMode(true);
  }, [dispatch]);

  const billStore = useSelector<IState, IBillsState>(
    (state: IState) => state.bills
  );
  const exams = useSelector((state: IState) => state.exams.examList.data);
  const onSubmit = (bill: FullBillDTO) => {
    setShouldResetForm(false);
    if (!creationMode && billToEdit?.billDTO?.id) {
    } else {
      dispatch(newBill(bill));
    }
  };

  const onEdit = (row: FullBillDTO) => {
    setBillToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onItemEdit = (row: BillItemsDTO) => {
    console.log(JSON.stringify(row));
    setItemToEdit(row);
    setItemCreationMode(false);
  };
  const onPaymentEdit = (row: BillPaymentsDTO) => {
    setPaymentToEdit(row);
    setPaymentCreationMode(false);
  };

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(`${code}` ?? "");
    //dispatch(deletebill(code));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setCreationMode(true);
    dispatch(newBillReset());
    scrollToElement(null);
  };

  return (
    <div className="patientExam">
      <BillDataForm
        fields={initialFields}
        itemFields={
          itemCreationMode
            ? billItemInitialFields
            : updateBillItemFields(billItemInitialFields, itemToEdit)
        }
        paymentFields={
          paymentCreationMode
            ? billPaymentInitialFields
            : updateBillPaymentFields(billPaymentInitialFields, paymentToEdit)
        }
        onSubmit={onSubmit}
        itemToEdit={itemToEdit}
        paymentToEdit={paymentToEdit}
        billItemsDTO={billItemsDTO}
        setBillItemsDTO={setBillItemsDTO}
        billPaymentsDTO={billPaymentsDTO}
        setBillPaymentsDTO={setBillPaymentsDTO}
        addItemButtonLabel={
          itemCreationMode ? t("common.save") : t("common.update")
        }
        addPaymentButtonLabel={
          paymentCreationMode ? t("common.save") : t("common.update")
        }
        itemCreationMode={itemCreationMode}
        paymentCreationMode={paymentCreationMode}
        setPaymentCreationMode={setPaymentCreationMode}
        setItemCreationMode={setItemCreationMode}
        submitButtonLabel={creationMode ? t("common.save") : t("common.update")}
        handleItemEdit={onItemEdit}
        handlePaymentEdit={onPaymentEdit}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={billStore.newBill.status === "LOADING"}
      />

      {billStore.newBill.status === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <ConfirmationDialog
        isOpen={billStore.newBill.status === "SUCCESS"}
        title={creationMode ? t("bill.created") : t("bill.updated")}
        icon={checkIcon}
        info={
          creationMode
            ? t("bill.createsuccess")
            : t("bill.updatesuccess", { code: billToEdit?.billDTO?.id })
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {}}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default PatientBill;
