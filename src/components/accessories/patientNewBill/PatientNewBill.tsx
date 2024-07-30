import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import SmallButton from "../smallButton/SmallButton";
import BillItemsTable from "./itemsTable/BillItemsTable";
import { ItemPayment } from "./itemPayment/ItemPayment";
import { CustomModal } from "../customModal/CustomModal";
import BillItemPickerForm from "./itemPicker/BillItemPicker";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import { BillItemsDTO } from "../../../generated";
import { Add, Payment } from "@mui/icons-material";
import { initialFields as initialItemFields } from "./itemPicker/consts";
import { getPrices } from "../../../state/prices";
import { useDispatch } from "@/libraries/hooks/redux";
import { useSelectedPatient, useFullBill } from "./hooks/full_bill.hooks";
import { useDialogStatus } from "./hooks/dialog.hooks";
import InfoBox from "../infoBox/InfoBox";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useNavigate } from "react-router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useStyles } from "./consts";
import { parseDate } from "../../../libraries/formDataHandling/functions";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openPayment, setOpenPayment] = useState(true);

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
  const navigate = useNavigate();
  const { patient } = useSelectedPatient();

  const resetItemFormCallback = () => {};

  const handleTableEdit = useCallback((row: any) => {
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
    if (status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
    if (status === "SUCCESS") {
      navigate(`/details/${patient.code ?? ""}/billsrecord`);
    }
  }, [status]);

  const classes = useStyles();

  return (
    <>
      <div className="patientNewBill">
        <div className="patientNewBill_main">
          {billItems.length != 0 && (
            <div className="patientNewBill_payment">
              <Accordion expanded={openPayment}>
                <AccordionSummary onClick={() => setOpenPayment(!openPayment)}>
                  <Payment fontSize="small" />
                  <h5>{t("bill.payment")}</h5>
                </AccordionSummary>
                <AccordionDetails>
                  <ItemPayment
                    saveBill={saveBill}
                    handlePaymentDialog={handlePaymentDialog}
                    billTotal={billTotal}
                    paymentTotal={paymentTotal}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          )}
          <div className="patientNewBill_items">
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
            value: parseDate(Date.now().toString()),
          },
        }}
        handleClose={handlePaymentDialog}
        handlePayment={handlePayment}
      />
    </>
  );
};
export default PatientNewBill;
