import { Add, Payment } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { BillItemsDTO } from "../../../generated";
import { parseDate } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getPrices } from "../../../state/prices";
import { CustomModal } from "../customModal/CustomModal";
import InfoBox from "../infoBox/InfoBox";
import { PaymentDialog } from "../paymentDialog/PaymentDialog";
import SmallButton from "../smallButton/SmallButton";
import { useStyles } from "./consts";
import { useDialogStatus } from "./hooks/dialog.hooks";
import { useFullBill, useSelectedPatient } from "./hooks/full_bill.hooks";
import { ItemPayment } from "./itemPayment/ItemPayment";
import BillItemPickerForm from "./itemPicker/BillItemPicker";
import { initialFields as initialItemFields } from "./itemPicker/consts";
import BillItemsTable from "./itemsTable/BillItemsTable";
import "./styles.scss";

const PatientNewBill: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [openPayment, setOpenPayment] = useState(true);

  const {
    bill,
    billItems,
    itemsRowData,
    billTotal,
    paymentTotal,
    itemToEdit,
    creationMode,
    status,
    saveBill,
    setItemToEdit,
    handleAddItem,
    handleEditItem,
    handleAddPayment,
    handleDeleteItem,
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

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { patient } = useSelectedPatient();

  const resetItemFormCallback = () => {};

  const handleTableEdit = useCallback(
    (row: any) => {
      setItemToEdit(row);
      handleItemPicker();
    },
    [handleItemPicker, setItemToEdit]
  );

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
  }, [navigate, patient.code, status]);

  const classes = useStyles();

  return (
    <>
      <div className="patientNewBill">
        <div className="patientNewBill_main">
          {billItems.length !== 0 && (
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
              {billTotal === 0 && (
                <span className={"additem"}>{t("bill.clicktoadditem")}</span>
              )}
            </div>
            {billItems.length !== 0 && (
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
        {billTotal === 0 && (
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
      <Backdrop className={classes.backdrop} open={status === "LOADING"}>
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
