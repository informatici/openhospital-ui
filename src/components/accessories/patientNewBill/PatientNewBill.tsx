import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import SmallButton from "../smallButton/SmallButton";
import BillItemsTable from "./itemsTable/BillItemsTable";
import { NewBillSide } from "./NewBillSide";
import { CustomModal } from "../customModal/CustomModal";
import BillItemPickerForm from "./itemPicker/BillItemPicker";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import { BillItemsDTO, BillPaymentsDTO } from "../../../generated";
import { Add } from "@material-ui/icons";
import {
  useDialogStatus,
  useFullBill,
  useItems,
  useSelectedPatient,
} from "./hooks";
import { initialFields } from "./consts";
import { getPrices } from "../../../state/prices/actions";
import { useDispatch } from "react-redux";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { patient } = useSelectedPatient();

  const {
    fullBill,
    bill,
    billItems,
    billPayments,
    billTotal,
    paymentTotal,
    handleBillEdit,
    handleAddItem,
    handleEditItem,
    handleAddPayment,
    handleRemoveItem,
    handleRemovePayment,
  } = useFullBill();

  const {
    showItemPicker,
    showPaymentDialog,
    handleItemPicker,
    handlePaymentDialog,
  } = useDialogStatus();

  const onSubmitItem = (item: BillItemsDTO) => {
    handleAddItem(item);
    handleItemPicker();
  };

  const resetItemFormCallback = () => {};

  useEffect(() => {
    dispatch(getPrices());
  }, []);

  return (
    <>
      <div className="patientNewBill">
        <div className="patientNewBill_main">
          <div className="patientNewBill_left">
            <div>
              <span className="addpayment hidden">
                {t("bill.clicktoaddpayment")}
              </span>
            </div>
            <BillItemsTable
              handleDelete={(row) => {}}
              handleEdit={(row) => {
                handleItemPicker();
              }}
            />
            <div className="patientNewBill_buttons">
              <SmallButton
                onClick={() => {
                  handleItemPicker();
                }}
              >
                <Add />
                {t("bill.additem")}
              </SmallButton>
            </div>
          </div>
          <div className="patientNewBill_right">
            <NewBillSide
              handlePaymentDialog={handlePaymentDialog}
              billTotal={billTotal}
              paymentTotal={paymentTotal}
            />
          </div>
        </div>
        <div className="patientNewBill_nopayment hidden">
          <span>{t("bill.nopendingbill")}</span>
        </div>
      </div>
      <CustomModal
        title={t("bill.pickitem")}
        description="pick-item"
        onClose={handleItemPicker}
        open={showItemPicker}
        content={
          <BillItemPickerForm
            fields={initialFields}
            onSubmit={onSubmitItem}
            isLoading={false}
            shouldResetForm={true}
            resetFormCallback={resetItemFormCallback}
          />
        }
      />
      <PaymentDialog
        open={showPaymentDialog}
        billId={0}
        billDate={new Date(Date.now())}
        fields={{
          paymentAmount: { value: "240", type: "number" },
          paymentDate: { value: "", type: "date" },
        }}
        handleClose={handlePaymentDialog}
        handlePayment={handleAddPayment}
      />
    </>
  );
};
export default PatientNewBill;
