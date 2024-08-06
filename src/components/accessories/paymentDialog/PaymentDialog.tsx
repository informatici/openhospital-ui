import {
  AppBar,
  Dialog,
  DialogContent,
  TextField as MaterialComponent,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { object, string } from "yup";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import {
  differenceInSeconds,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import Button from "../button/Button";
import DateField from "../dateField/DateField";

export const PaymentDialog = ({
  open,
  handleClose,
  handlePayment,
  fields,
  billDate,
  billId,
}: {
  open: boolean;
  handleClose: () => void;
  handlePayment: (payment: Record<string, any>) => void;
  fields: TFields<"paymentDate" | "paymentAmount">;
  billDate: Date;
  billId: number;
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
    paymentAmount: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handlePayment(values);
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

  const withValueLimit = (values: NumberFormatValues) => {
    if (values.floatValue)
      return values.floatValue <= initialValues.paymentAmount;
    else {
      return false;
    }
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
            <Typography className="paymentForm__item">
              <span className="info">
                {t("bill.code")}: {billId}
              </span>
              <span className="info">
                {t("bill.billdate")}:{renderDate(billDate.toString())}
              </span>
            </Typography>
            <Typography className="paymentForm__item">
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
            <NumberFormat
              name="paymentAmount"
              value={formik.getFieldProps("paymentAmount").value}
              onBlur={formik.getFieldProps("paymentAmount").onBlur}
              className="paymentForm__item"
              id="paymentAmount"
              prefix={"$"}
              customInput={MaterialComponent}
              isAllowed={withValueLimit}
              type="text"
              thousandSeparator={" "}
              errorText={getErrorText("paymentAmount")}
              isValid={isValid("paymentAmount")}
              variant="outlined"
              label={t("bill.paymentamount")}
              allowNegative={false}
              decimalScale={2}
              decimalSeparator="."
              onValueChange={(values) => {
                const { floatValue } = values;
                setFieldValue("paymentAmount", floatValue);
              }}
            />
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
