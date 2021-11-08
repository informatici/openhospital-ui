import {
  AppBar,
  Dialog,
  DialogContent,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import DateField from "../dateField/DateField";
import TextField from "../textField/TextField";
import Button from "../button/Button";
import { useFormik } from "formik";
import { object, string } from "yup";
import { get, has } from "lodash";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { BillPaymentsDTO } from "../../../generated";
import { useSelector } from "react-redux";
import { IState } from "../../../types";

export const PaymentDialog = ({
  billCode,
  balance,
  open,
  handleClose,
  handlePayment,
}: {
  billCode: number;
  balance: number;
  open: boolean;
  handleClose: () => void;
  handlePayment: (payment: BillPaymentsDTO) => void;
}) => {
  const { t } = useTranslation();
  const user = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );
  const validationSchema = object({
    paymentDate: string().required(t("common.required")),
    paymentAmount: string()
      .required(t("common.required"))
      .test({
        message: t("bill.invalidpayment"),
        test: (value) => {
          return value > 0 && value <= balance;
        },
      }),
  });

  const formik = useFormik({
    initialValues: {
      paymentDate: new Date().toString(),
      paymentAmount: balance + "",
    },
    enableReinitialize: false,
    validationSchema,
    onSubmit: (values) => {
      const payment: BillPaymentsDTO = {
        billId: billCode,
        amount: parseInt(values.paymentAmount),
        date: new Date(values.paymentDate).toISOString(),
        user: user,
      };
      handlePayment(payment);
    },
  });

  const { setFieldValue } = formik;

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
    <Dialog
      id="paymentDialog"
      title={t("bill.paymentdialog")}
      open={open}
      onClose={handleClose}
    >
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <Typography variant="h5" component="div">
            {t("bill.enterpayment")}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <form className="paymentForm" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <Typography
              variant="h6"
              component="div"
              className="paymentForm__item"
            >
              {t("bill.amounttopay", { amount: currencyFormat(balance) })}
            </Typography>
            <div className="paymentForm__item">
              <DateField
                fieldName="paymentDate"
                fieldValue={formik.values.paymentDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("paymentDate")}
                errorText={getErrorText("paymentDate")}
                label={t("bill.paymentdate")}
                onChange={dateFieldHandleOnChange("paymentDate")}
              />
            </div>
            <div className="paymentForm__item">
              <TextField
                field={formik.getFieldProps("paymentAmount")}
                theme="regular"
                label={t("bill.paymentamount")}
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
                {t("bill.pay")}
              </Button>
            </div>
            <div className="reset_button">
              <Button type="reset" variant="text" onClick={handleClose}>
                {t("common.close")}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
