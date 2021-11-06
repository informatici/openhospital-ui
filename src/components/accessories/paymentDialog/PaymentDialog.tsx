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
import { BillDTO } from "../../../generated";
import numbro from "numbro";
import { getFromFields } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";

export const PaymentDialog = ({
  bill,
  open,
  handleClose,
}: {
  bill: BillDTO;
  open: boolean;
  handleClose: () => void;
}) => {
  const { t } = useTranslation();
  const validationSchema = object({
    paymentDate: string().required(t("common.required")),
    paymentAmount: string()
      .required(t("common.required"))
      .test({
        message: t("bill.invalidpayment"),
        test: (value) => {
          return (
            value > 0 &&
            value <= numbro.unformat(bill?.balance?.toString() ?? "")
          );
        },
      }),
  });

  const initFields = {
    paymentDate: new Date().toString(),
    paymentAmount: numbro.unformat(bill?.balance?.toString() ?? ""),
  };
  const formik = useFormik({
    initialValues: initFields,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      //dispatch here
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
              {t("bill.amounttopay", { amount: bill.balance })}
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
