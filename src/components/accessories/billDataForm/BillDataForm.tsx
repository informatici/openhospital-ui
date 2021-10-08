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
import SelectField from "../selectField/SelectField";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import TextField from "../textField/TextField";
import "./styles.scss";
import { BillItemType, TProps } from "./types";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import { PaymentTable } from "./PaymentTable";
import Table from "../table/Table";
import { BillItemTable } from "./BillItemTable";
import { BillDTO, BillItemsDTO, FullBillDTO } from "../../../generated";

const BillDataForm: FunctionComponent = ({}) => {
  const billItemRows: BillItemsDTO[] = [
    { itemAmount: 5000, itemQuantity: 10, itemDescription: "Amoxiciline" },
    {
      itemAmount: 7500,
      itemQuantity: 10,
      itemDescription: "Eferalgan Condeine",
    },
    { itemAmount: 1000, itemQuantity: 10, itemDescription: "Paracetamol" },
  ];
  const { t } = useTranslation();

  const itemTypes: BillItemType[] = [
    { value: "med", label: t("bill.medicalType") },
    { value: "op", label: t("bill.operationType") },
    { value: "exam", label: t("bill.examenType") },
    { value: "custom", label: t("bill.customType") },
  ];

  const validationSchema = object({});

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

  const handleItemType = (e: any, value: string) => {
    setSelectedItemType(value);
  };

  const [selectedItemType, setSelectedItemType] = useState("");
  const [billDTO, setBillDTO] = useState<BillDTO>();
  const [fullBillDTO, setFullBillDTO] = useState<FullBillDTO>({
    billDTO: billDTO,
    billItemsDTO: billItemRows,
    billPaymentsDTO: [],
  });

  useEffect(() => {}, []);

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
    <form className="billDataForm">
      <div className="billDataForm__billForm">
        <div className="billDataForm_subtitle">{t("bill.bill")}</div>
        <div className="billDataForm__billForm_item">
          <DateField
            label="Date"
            format="dd/MM/yyyy"
            fieldName="date"
            errorText=""
            fieldValue={Date.now().toLocaleString()}
            isValid={false}
            onChange={() => {}}
          />
          <AutocompleteField
            fieldName="priceList"
            fieldValue={formik.values.exam}
            label={t("bill.priceList")}
            isValid={false}
            errorText={""}
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
            isValid={false}
            errorText={""}
            onBlur={() => {}}
            options={[]}
            isLoading={false}
          />
        </div>
        <fieldset>
          <legend>{t("bill.addItem")}</legend>
          <div className="billDataForm__billForm_item">
            <AutocompleteField
              fieldName="itemType"
              fieldValue={formik.values.exam}
              label={t("bill.itemType")}
              isValid={false}
              errorText={""}
              onBlur={() => {}}
              options={itemTypes}
              isLoading={false}
              onInputChange={handleItemType}
            />
            <TextField
              field={formik.getFieldProps("unit")}
              theme="regular"
              label={t("bill.unit")}
              isValid={false}
              errorText={""}
              onBlur={formik.handleBlur}
            />
          </div>
          {selectedItemType !== "bill.customType" && (
            <div className="billDataForm__billForm_item">
              <AutocompleteField
                fieldName="item"
                fieldValue={formik.values.exam}
                label={t("bill.item")}
                isValid={false}
                errorText={""}
                onBlur={() => {}}
                options={[]}
                isLoading={false}
              />
            </div>
          )}
          {selectedItemType === "bill.customType" && (
            <div className="billDataForm__billForm_item">
              <TextField
                field={formik.getFieldProps("description")}
                theme="regular"
                label={t("bill.customDescription")}
                isValid={false}
                errorText={""}
                onBlur={formik.handleBlur}
              />
              <TextField
                field={formik.getFieldProps("amount")}
                theme="regular"
                label={t("bill.customAmount")}
                isValid={false}
                errorText={""}
                onBlur={formik.handleBlur}
              />
            </div>
          )}
          <div className="billDataForm_submit">
            <SmallButton type="submit" disabled={false}>
              {t("bill.addItem")}
            </SmallButton>
          </div>
        </fieldset>
        <div className="billItemContainer">
          <BillItemTable
            handleDelete={(code: number | undefined) => {}}
            handleEdit={(row: any) => {}}
            shouldUpdateTable={true}
            billItems={fullBillDTO.billItemsDTO ?? []}
          />
        </div>
        <div className="billDataForm_footer">
          <span>{t("bill.total")} : $240</span>
        </div>
      </div>
      <div className="billDataForm__paymentForm">
        <div className="billDataForm_subtitle">{t("bill.payment")}</div>
        <div className="billDataForm__paymentForm_item">
          <AutocompleteField
            fieldName="itemType"
            fieldValue={formik.values.exam}
            label={t("payment.type")}
            isValid={false}
            errorText={""}
            onBlur={() => {}}
            options={[]}
            isLoading={false}
          />
          <TextField
            field={formik.getFieldProps("firstName")}
            theme="regular"
            label={t("payment.amount")}
            isValid={false}
            errorText={""}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="billDataForm_submit">
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
        <div className="billDataForm__paymentForm_item2">
          <SmallButton type="submit" disabled={false}>
            {t("bill.save")}
          </SmallButton>
          <SmallButton disabled={false}>{t("bill.paid")}</SmallButton>
          <SmallButton disabled={false}>{t("bill.close")}</SmallButton>
        </div>
      </div>
    </form>
  );
};

export default BillDataForm;
