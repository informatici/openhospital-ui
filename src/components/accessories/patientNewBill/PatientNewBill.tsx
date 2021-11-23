import React, { FC, useCallback, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import SmallButton from "../smallButton/SmallButton";
import BillItemsTable from "./itemsTable/BillItemsTable";
import { NewBillSide } from "./NewBillSide";
import { CustomModal } from "../customModal/CustomModal";
import BillItemPickerForm from "./itemPicker/BillItemPicker";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import { BillPaymentsDTO } from "../../../generated";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const [showItemPicker, setShowItemPicker] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

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
              <SmallButton onClick={() => {}}>{t("button.save")}</SmallButton>{" "}
            </div>
          </div>
          <div className="patientNewBill_right">
            <NewBillSide handlePaymentDialog={setShowPaymentDialog} />
          </div>
        </div>
        <div className="hidden">
          <span>{t("bill.nopendingbill")}</span>
        </div>
      </div>
      <CustomModal
        title={t("bill.pickitem")}
        description="pick-item"
        onClose={handleItemPickerShow}
        open={showItemPicker}
        content={<BillItemPickerForm />}
      />
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
