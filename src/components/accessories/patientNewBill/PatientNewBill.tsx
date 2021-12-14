import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import {
  useSelectedPatient,
  useFullBill,
  useCurrentUser,
} from "./hooks/full_bill.hooks";
import { useDialogStatus } from "./hooks/dialog.hooks";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useHistory } from "react-router";
import { Backdrop, CircularProgress, Theme } from "@material-ui/core";
import { useStyles } from "./consts";
import { newBillReset, updateBillReset } from "../../../state/bills/actions";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    fullBill,
    bill,
    billItems,
    billPayments,
    itemsRowData,
    billTotal,
    paymentTotal,
    itemToEdit,
    creationMode,
    status,
    saveBill,
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
    openSaveDialog,
    handleSaveDialog,
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

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { patient } = useSelectedPatient();

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
  }, [dispatch]);

  useEffect(() => {
    console.log(status);
    if (status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
    if (status === "SUCCESS") {
      history.push(`/details/${patient.code ?? ""}/billsrecord`);
    }
  }, [status]);

  const classes = useStyles();

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
                saveBill={saveBill}
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
        {status === "FAIL" && (
          <div ref={infoBoxRef}>
            <InfoBox
              type="error"
              message={
                creationMode ? t("bill.createfailed") : t("bill.updatefailed")
              }
            />
          </div>
        )}
      </div>
      <Backdrop className={classes.backdrop} open={status == "LOADING"}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
        billId={bill.id ?? 0}
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
