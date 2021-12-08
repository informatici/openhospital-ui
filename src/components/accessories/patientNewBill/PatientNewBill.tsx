import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import SmallButton from "../smallButton/SmallButton";
import BillItemsTable from "./itemsTable/BillItemsTable";
import { ItemPayment } from "./itemPayment/ItemPayment";
import { CustomModal } from "../customModal/CustomModal";
import BillItemPickerForm from "./itemPicker/BillItemPicker";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import { BillItemsDTO, BillPaymentsDTO } from "../../../generated";
import { Add } from "@material-ui/icons";
import { initialFields as initialItemFields } from "./itemPicker/consts";
import { getPrices } from "../../../state/prices/actions";
import { useDispatch } from "react-redux";
import { useSelectedPatient, useFullBill, useDialogStatus } from "./hooks";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { patient } = useSelectedPatient();

  const {
    fullBill,
    bill,
    billItems,
    billPayments,
    itemsRowData,
    billTotal,
    paymentTotal,
    itemToEdit,
    setItemToEdit,
    handleBillEdit,
    handleAddItem,
    handleEditItem,
    handleAddPayment,
    handleDeleteItem,
    handleDeletePayment,
  } = useFullBill();

  const {
    showItemPicker,
    showPaymentDialog,
    handleItemPicker,
    handlePaymentDialog,
  } = useDialogStatus();

  const onSubmitItem = (item: BillItemsDTO, isNew: boolean) => {
    isNew ? handleAddItem(item) : handleEditItem(item);
    handleItemPicker();
  };

  const handleItemDialog = () => {
    handleItemPicker();
    if (itemToEdit) {
      setItemToEdit(undefined);
    }
  };

  const resetItemFormCallback = () => {};

  const handleTableEdit = useCallback((row) => {
    setItemToEdit(row);
    handleItemPicker();
  }, []);

  const handlePayment = (values: Record<string, any>) => {
    handleAddPayment(values);
    handlePaymentDialog();
  };

  useEffect(() => {
    dispatch(getPrices());
  }, []);

  return (
    <>
      <div className="patientNewBill">
        <div className="patientNewBill_main">
          <div className="patientNewBill_left">
            <div>
              {billTotal == 0 && (
                <span className={"additem"}>{t("bill.clicktoadditem")}</span>
              )}
            </div>
            {billItems.length != 0 && (
              <BillItemsTable
                rowData={itemsRowData}
                handleDelete={handleDeleteItem}
                handleEdit={handleTableEdit}
              />
            )}
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
          {billItems.length != 0 && (
            <div className="patientNewBill_right">
              <ItemPayment
                handlePaymentDialog={handlePaymentDialog}
                billTotal={billTotal}
                paymentTotal={paymentTotal}
              />
            </div>
          )}
        </div>
        {billTotal == 0 && (
          <div className="patientNewBill_nopayment">
            <span>{t("bill.nopendingbill")}</span>
          </div>
        )}
      </div>
      <CustomModal
        title={t("bill.pickitem")}
        description="pick-item"
        onClose={handleItemDialog}
        open={showItemPicker}
        content={
          <BillItemPickerForm
            fields={initialItemFields}
            items={billItems}
            itemToEdit={itemToEdit}
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
        billDate={new Date(Date.parse(bill?.date ?? ""))}
        fields={{
          paymentAmount: {
            type: "number",
            value: (billTotal - paymentTotal).toString(),
          },
          paymentDate: {
            type: "date",
            value: new Date(Date.now()).toISOString(),
          },
        }}
        handleClose={handlePaymentDialog}
        handlePayment={handlePayment}
      />
    </>
  );
};
export default PatientNewBill;
