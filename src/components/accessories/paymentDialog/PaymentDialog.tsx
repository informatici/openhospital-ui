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
import { TFields } from "../../../libraries/formDataHandling/types";
import {
  differenceInSeconds,
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";

export const PaymentDialog = ({
  open,
  handleClose,
  handlePayment,
  fields,
  billDate,
}: {
  open: boolean;
  handleClose: () => void;
  handlePayment: (payment: BillPaymentsDTO) => void;
  fields: TFields<"paymentDate" | "paymentAmount">;
  billDate: Date;
}) => {
  const { t } = useTranslation();

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    paymentDate: string()
      .required(t("common.required"))
      .test({
        message: t("bill.invalidpaymentdate"),
        test: function (value) {
          return differenceInSeconds(billDate, new Date(value)) >= 0;
        },
      }),
    paymentAmount: string()
      .required(t("common.required"))
      .test({
        message: t("bill.invalidpayment"),
        test: (value) => {
          return value > 0 && value <= parseInt(initialValues.paymentAmount);
        },
      }),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      handlePayment(formattedValues);
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
        <form
          className="paymentForm"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="row start-sm center-xs">
            <Typography
              variant="h6"
              component="div"
              className="paymentForm__item"
            >
              {t("bill.amounttopay", {
                amount: currencyFormat(initialValues.paymentAmount),
              })}
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
