import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { getMedicals } from "../../../state/medicals/actions";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import checkIcon from "../../../assets/check-icon.png";
import { updateFields } from "../../../libraries/formDataHandling/functions";
import SmallButton from "../smallButton/SmallButton";
import BillItemsTable from "./itemsTable/BillItemsTable";
import { NewBillSide } from "./NewBillSide";
import { CustomModal } from "../customModal/CustomModal";
import BillItemPickerForm from "./itemPicker/BillItemPicker";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import { BillPaymentsDTO } from "../../../generated";
import { FormatColorReset } from "@material-ui/icons";

export type BillItemTransitionState = "IDLE" | "TO_RESET";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [showItemPicker, setShowItemPicker] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [deletedObjCode, setDeletedObjCode] = useState("");

  const handleItemPickerShow = useCallback(() => {
    setShowItemPicker(false);
  }, []);
  const handlePaymentDialogClose = useCallback(() => {
    setShowPaymentDialog(false);
  }, []);

  const handlePayment = useCallback((payment: BillPaymentsDTO) => {}, []);

  return (
    <>
      <div className="patientNewBill">
        <div className="main">
          <div className="patientNewBill_left">
            <div>
              <span className="addpayment hidden">
                {t("bill.clicktoaddpayment")}
              </span>
            </div>
            <BillItemsTable
              shouldUpdateTable={true}
              handleDelete={(row) => {}}
              handleEdit={(row) => {
                setShowItemPicker(true);
              }}
            />
            <div className="patientNewBill_buttons">
              <SmallButton
                onClick={() => {
                  setShowItemPicker(true);
                }}
              >
                {t("button.add")}
              </SmallButton>
              <SmallButton onClick={() => {}}>{t("button.save")}</SmallButton>
            </div>
          </div>
          <div className="patientNewBill_right">
            <NewBillSide handlePaymentDialog={setShowPaymentDialog} />
          </div>
        </div>
        <div className="hidden">
          <span>{t("bill.nopendingbill")}</span>
        </div>
        <CustomModal
          title={"Pick an item"}
          description="pick-item"
          onClose={handleItemPickerShow}
          open={showItemPicker}
          content={<BillItemPickerForm />}
        />
      </div>
      <PaymentDialog
        open={showPaymentDialog}
        billId={0}
        billDate={new Date(Date.now())}
        fields={{
          paymentAmount: { value: "240", type: "number" },
          paymentDate: { value: "", type: "date" },
        }}
        handleClose={handlePaymentDialogClose}
        handlePayment={handlePayment}
      />
    </>
  );
};
export default PatientNewBill;
