import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { number, object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import warningIcon from "../../../assets/warning-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import DateField from "../dateField/DateField";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import SelectField from "../selectField/SelectField";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import TextField from "../textField/TextField";
import "./styles.scss";
import { TProps } from "./types";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import { PaymentTable } from "./PaymentTable";
import Table from "../table/Table";
import { BillItemTable } from "./BillItemTable";

const BillDataForm: FunctionComponent = ({}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    date: string().required(t("common.required")),
    listName: string().required(t("common.required")),
    patName: string().required(t("common.required")),
  });

  const itemValidationSchema = object({
    typeName: string().required(t("common.required")),
    itemName: string().required(t("common.required")),
    unit: number().required(t("common.required")),
  });

  const paymentValidationSchema = object({
    typeName: string().required(t("common.required")),
    itemName: string().required(t("common.required")),
    unit: number().required(t("common.required")),
  });

  const initialValues = getFromFields({}, "value");

  const options = getFromFields({}, "options");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  return (
    <div className="billDataForm">
      <form className="billDataForm__billForm">
        <div className="billDataForm_subtitle">{t("bill.subtitle")}</div>
        <div className="billDataForm__billForm_item">
          <DateField
            label="Date"
            format="dd/MM/yyyy"
            fieldName="date"
            errorText="Invalid Date"
            fieldValue={Date.now().toLocaleString()}
            isValid={true}
            onChange={() => {}}
          />
          <AutocompleteField
            fieldName="priceList"
            fieldValue={formik.values.exam}
            label={t("bill.priceList")}
            isValid={true}
            errorText={"Invalid Price List"}
            onBlur={() => {}}
            options={[]}
            isLoading={false}
          />
        </div>
        <div className="billDataForm__billForm_item">
          <AutocompleteField
            fieldName="patient"
            fieldValue={formik.values.exam}
            label={t("bill.patient")}
            isValid={true}
            errorText={"Invalid Patient"}
            onBlur={() => {}}
            options={[]}
            isLoading={false}
          />
        </div>
        <fieldset>
          <legend>{t("bill.addItem")}</legend>
          <div className="billDataForm__billForm_item2">
            <AutocompleteField
              fieldName="itemType"
              fieldValue={formik.values.exam}
              label={t("bill.itemType")}
              isValid={true}
              errorText={"Invalid Item Type"}
              onBlur={() => {}}
              options={[]}
              isLoading={false}
            />
            <AutocompleteField
              fieldName="item"
              fieldValue={formik.values.exam}
              label={t("bill.item")}
              isValid={true}
              errorText={"Invalid Item"}
              onBlur={() => {}}
              options={[]}
              isLoading={false}
            />
            <TextField
              field={formik.getFieldProps("firstName")}
              theme="regular"
              label={t("bill.unit")}
              isValid={true}
              errorText={"Ivalid Value"}
              onBlur={formik.handleBlur}
            />
            <SmallButton type="submit" disabled={false}>
              {t("bill.addItem")}
            </SmallButton>
          </div>
        </fieldset>
        <div className="billItemContainer">
          <BillItemTable></BillItemTable>
        </div>
        <div className="billDataForm_footer">
          <span>{t("bill.total")} : $240</span>
        </div>
      </form>
      <form className="billDataForm__paymentForm">
        <div className="billDataForm_subtitle">{t("payment.subtitle")}</div>
        <div className="billDataForm__paymentForm_item">
          <AutocompleteField
            fieldName="itemType"
            fieldValue={formik.values.exam}
            label={t("payment.type")}
            isValid={true}
            errorText={"Invalid Item Type"}
            onBlur={() => {}}
            options={[]}
            isLoading={false}
          />
          <TextField
            field={formik.getFieldProps("firstName")}
            theme="regular"
            label={t("payment.amount")}
            isValid={true}
            errorText={"Ivalid Value"}
            onBlur={formik.handleBlur}
          />
          <SmallButton type="submit" disabled={false}>
            {t("bill.addPayment")}
          </SmallButton>
        </div>
        <div>
          <PaymentTable></PaymentTable>
        </div>
        <div className="billDataForm_footer">
          <span>{t("bill.toPay")} : $240</span>
          <span>{t("bill.balance")} : $48</span>
        </div>
      </form>
    </div>
  );
};

export default BillDataForm;
