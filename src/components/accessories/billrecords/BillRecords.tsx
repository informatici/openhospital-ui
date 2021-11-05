import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FullBillDTO, PatientDTO } from "../../../generated";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import {
  deleteBill,
  deleteBillReset,
  getPendingBills,
  searchBills,
} from "../../../state/bills/actions";
import { IState } from "../../../types";
import RenderBillDetails from "../billTable/RenderBillDetails";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import Table from "../table/Table";
import checkIcon from "../../../assets/check-icon.png";
import {
  AppBar,
  Dialog,
  DialogContent,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { object, string } from "yup";
import TextField from "../textField/TextField";
import DateField from "../dateField/DateField";
import { get, has } from "lodash";
import Button from "../button/Button";
import "./styles.scss";

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
  const [activityTransitionState, setActivityTransitionState] =
    useState("IDLE");
  const order = ["date", "balance"];
  //const []
  const dispatch = useDispatch();
  const patient = useSelector<IState, PatientDTO | undefined>(
    (state) => state.patients.selectedPatient.data
  );
  const handleClose = () => {
    setOpenPaymentDialog(false);
  };

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(deleteBillReset());
    }
  }, [activityTransitionState]);

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
    //   .sort(dateComparator("desc", "date"));
  };

  const getCoreRowPending = (row: any) => {
    return {
      fullBill: pendingBills?.find((item) => item.billDTO?.id === row.code),
    };
  };

  const closedBills = useSelector<IState, FullBillDTO[]>((state) => {
    return state.bills.searchBills.data ?? [];
  });

  const getCoreRowClosed = (row: any) => {
    return {
      fullBill: closedBills?.find((item) => item.billDTO?.id === row.code),
    };
  };

  const [seletedObj, setSeletedObj] = useState({} as any);
  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.bills.delete.status
  );
  const onDelete = (row: any) => {
    setSeletedObj(row);
    dispatch(deleteBill(row.code));
  };

  const onPay = (row: any) => {
    setSeletedObj(row);
    setOpenPaymentDialog(true);
  };
  const validationSchema = object({
    paymentDate: string().required(t("common.required")),
    paymentAmount: string()
      .required(t("common.required"))
      .test({
        message: t("bill.invalidpayment"),
        test: function (value) {
          return value > seletedObj.balance;
        },
      }),
  });
  const formik = useFormik({
    initialValues: {
      paymentDate: new Date().toString(),
      paymentAmount: getCoreRowPending(seletedObj).fullBill?.billDTO?.balance,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      //dispatch here
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  return (
    <div className="patientBillRecords">
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
        onPrint={() => {}}
        onPay={onPay}
      />
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
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("common.delete")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: seletedObj.code })}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />

      <Dialog
        id="paymentDialog"
        title="Payment Dialog"
        open={openPaymentDialog}
        onClose={handleClose}
      >
        <AppBar style={{ position: "relative" }}>
          <Toolbar style={{ display: "inline-block" }}>
            <Typography style={{ flex: 1 }} variant="h6" component="div">
              Enter the amount you are receiving
            </Typography>
            <Typography style={{ flex: 1 }} variant="body2" component="div">
              {"Total Amount To Pay: " + seletedObj.balance}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <form className="paymentForm" onSubmit={formik.handleSubmit}>
            <div className="row start-sm center-xs">
              <div className="paymentForm__item">
                <DateField
                  fieldName="paymentDate"
                  fieldValue={formik.values.paymentDate}
                  disableFuture={true}
                  theme="regular"
                  format="dd/MM/yyyy"
                  isValid={isValid("paymentDate")}
                  errorText={getErrorText("paymentDate")}
                  label={"Payment Date"}
                  onChange={dateFieldHandleOnChange("paymentDate")}
                />
              </div>
              <div className="paymentForm__item">
                <TextField
                  field={formik.getFieldProps("paymentAmount")}
                  theme="regular"
                  label={"Payment Amount"}
                  isValid={isValid("paymentAmount")}
                  errorText={getErrorText("paymentAmount")}
                  onBlur={formik.handleBlur}
                  type="number"
                />
              </div>
            </div>
            <div className="paymentForm__buttonSet">
              <div className="submit_button">
                <Button type="submit" variant="contained" disabled={false}>
                  PAY
                </Button>
              </div>
              <div className="reset_button">
                <Button
                  type="reset"
                  variant="text"
                  onClick={() => setOpenPaymentDialog(false)}
                >
                  CLOSE
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillRecords;
