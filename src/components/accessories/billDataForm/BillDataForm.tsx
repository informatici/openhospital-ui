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

const BillDataForm: FunctionComponent<TProps> = ({
  fields,
  isLoading,
  onSubmit,
  submitButtonLabel,
  shouldResetForm,
}) => {
  const billItemRows: BillItemsDTO[] = [
    {
      itemId: "0",
      itemAmount: 5000,
      itemQuantity: 10,
      itemDescription: "Amoxiciline",
    },
  ];
  const { t } = useTranslation();

  const validationSchema = object({
    billDate: string().required(t("common.required")),
    patName: string().required(t("common.required")),
    listName: string().required(t("common.required")),
  });

  const itemValidationSchema = object({
    itemType: string().required(t("common.required")),
    itemDescription: string().required(t("common.required")),
    itemAmount: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
    itemQuantity: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
  });

  const paymentValidationSchema = object({
    paymentType: string().required(t("common.required")),
    paymentAmount: number()
      .required(t("common.required"))
      .min(0, t("common.positiveValue")),
  });

  const initialValues = getFromFields(fields, "value");

  const options = getFromFields(fields, "options");

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

  const handleDeleteItem = useCallback(
    (row: BillItemsDTO) => {
      let bill = fullBillDTO;
      let items = bill.billItemsDTO ?? [];
      items = items.filter((item) => item.itemId != row.itemId);
      bill.billItemsDTO = items;
      setFullBillDTO(bill);
    },
    [fullBillDTO]
  );

  useEffect(() => {}, [fullBillDTO]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const itemFormik = useFormik({
    initialValues,
    validationSchema: itemValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      let bill = fullBillDTO;
      bill.billItemsDTO?.push({
        itemAmount: values.itemAmount,
        itemDescription: values.itemDescription,
        itemQuantity: values.itemQuantity,
        itemId: (bill.billItemsDTO ?? []).length.toString(),
      });
      setFullBillDTO(bill);
      itemFormik.resetForm();
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const paymentFormik = useFormik({
    initialValues,
    validationSchema: paymentValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      //const formattedValues = formatAllFieldValues({}, values);
      //onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const setItemFieldValue = itemFormik.setFieldValue;
  const resetItemForm = itemFormik.resetForm;
  const handleItemBlur = itemFormik.handleBlur;

  const setPaymentFieldValue = paymentFormik.setFieldValue;
  const resetPaymentForm = paymentFormik.resetForm;
  const handlePaymentBlur = paymentFormik.handleBlur;

  const isValid = (fieldName: string, f: typeof formik): boolean => {
    return has(f.touched, fieldName) && has(f.errors, fieldName);
  };

  const getErrorText = (fieldName: string, f: typeof formik): string => {
    return has(f.touched, fieldName)
      ? (get(f.errors, fieldName) as string)
      : "";
  };

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const onItemBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleItemBlur(e);
        setItemFieldValue(fieldName, value);
      },
    [setItemFieldValue, handleItemBlur]
  );

  const onPaymentBlurCallback = useCallback(
    (fieldName: string) =>
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handlePaymentBlur(e);
        setPaymentFieldValue(fieldName, value);
      },
    [setPaymentFieldValue, handlePaymentBlur]
  );

  return (
    <form className="billDataForm">
      <div className="billDataForm__billForm">
        <div className="billDataForm_subtitle">{t("bill.bill")}</div>
        <div className="billDataForm__billForm_item">
          <DateField
            label={t("bill.date")}
            format="dd/MM/yyyy"
            fieldName="billDate"
            errorText={getErrorText("billDate", formik)}
            fieldValue={Date.now().toLocaleString()}
            isValid={isValid("billDate", formik)}
            onChange={() => {}}
          />
          <AutocompleteField
            fieldName="listName"
            fieldValue={formik.values.listName}
            label={t("bill.pricelist")}
            isValid={isValid("listName", formik)}
            errorText={getErrorText("listName", formik)}
            onBlur={onBlurCallback("listName")}
            options={options.listName}
            isLoading={false}
          />
        </div>
        <div className="billDataForm__billForm_item">
          <AutocompleteField
            fieldName="patName"
            fieldValue={formik.values.patName}
            label={t("bill.patient")}
            isValid={isValid("patName", formik)}
            errorText={getErrorText("patName", formik)}
            onBlur={onBlurCallback("patName")}
            options={options.patName}
            isLoading={false}
          />
        </div>
        <fieldset>
          <legend>{t("bill.additem")}</legend>
          <div className="billDataForm__billForm_item">
            <AutocompleteField
              fieldName="itemType"
              fieldValue={itemFormik.values.itemType}
              label={t("bill.itemtype")}
              isValid={isValid("itemType", itemFormik)}
              errorText={getErrorText("itemType", itemFormik)}
              onBlur={onItemBlurCallback("itemType")}
              options={options.itemType}
              isLoading={false}
            />
            <TextField
              field={itemFormik.getFieldProps("itemQuantity")}
              theme="regular"
              label={t("bill.quantity")}
              isValid={isValid("itemQuantity", itemFormik)}
              errorText={getErrorText("itemQuantity", itemFormik)}
              onBlur={itemFormik.handleBlur}
            />
          </div>
          {itemFormik.values.itemType !== "CST" && (
            <div className="billDataForm__billForm_item">
              <AutocompleteField
                fieldName="itemDescription"
                fieldValue={itemFormik.values.itemDescription}
                label={t("bill.description")}
                isValid={isValid("itemDescription", itemFormik)}
                errorText={getErrorText("itemDescription", itemFormik)}
                onBlur={onItemBlurCallback("itemDescription")}
                options={options.itemDescription}
                isLoading={false}
              />
            </div>
          )}
          {itemFormik.values.itemType === "CST" && (
            <div className="billDataForm__billForm_item">
              <TextField
                field={itemFormik.getFieldProps("itemDescription")}
                theme="regular"
                label={t("bill.description")}
                isValid={isValid("itemDescription", itemFormik)}
                errorText={getErrorText("itemDescription", itemFormik)}
                onBlur={itemFormik.handleBlur}
              />
              <TextField
                field={itemFormik.getFieldProps("itemAmount")}
                theme="regular"
                label={t("bill.amount")}
                isValid={isValid("itemAmount", itemFormik)}
                errorText={getErrorText("itemAmount", itemFormik)}
                onBlur={itemFormik.handleBlur}
              />
            </div>
          )}
          <div className="billDataForm_submit">
            <SmallButton
              type="button"
              disabled={!itemFormik.isValid}
              onClick={() => {
                itemFormik.handleSubmit();
              }}
            >
              {t("button.add")}
            </SmallButton>
          </div>
        </fieldset>
        <div className="billItemContainer">
          <BillItemTable
            handleDelete={handleDeleteItem}
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
            fieldName="paymentType"
            fieldValue={t(paymentFormik.values.paymentType)}
            label={t("bill.paymenttype")}
            isValid={isValid("paymentType", paymentFormik)}
            errorText={getErrorText("paymentType", paymentFormik)}
            onBlur={onPaymentBlurCallback("paymentType")}
            options={options.paymentType}
            isLoading={false}
          />
          <TextField
            field={paymentFormik.getFieldProps("paymentAmount")}
            theme="regular"
            label={t("bill.amount")}
            isValid={isValid("paymentAmount", paymentFormik)}
            errorText={getErrorText("paymentAmount", paymentFormik)}
            onBlur={paymentFormik.handleBlur}
          />
        </div>
        <div className="billDataForm_submit">
          <SmallButton
            type="button"
            disabled={false}
            onClick={() => {
              paymentFormik.handleSubmit();
            }}
          >
            {t("button.add")}
          </SmallButton>
        </div>
        <div>
          <PaymentTable></PaymentTable>
        </div>
        <div className="billDataForm_footer">
          <span>{t("bill.topay")} : $240</span>
          <span>{t("bill.balance")} : $48</span>
        </div>
        <div className="billDataForm__paymentForm_item2">
          <SmallButton type="submit" disabled={false}>
            {t("button.save")}
          </SmallButton>
          <SmallButton disabled={false}>{t("button.paid")}</SmallButton>
          <SmallButton disabled={false}>{t("button.close")}</SmallButton>
        </div>
      </div>
    </form>
  );
};

export default BillDataForm;
