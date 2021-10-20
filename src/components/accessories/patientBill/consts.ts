import { TFields } from "../../../libraries/formDataHandling/types";
import {
  TBillDataFormFieldName,
  TBillItemDataFormFieldName,
  TBillPaymentDataFormFieldName,
} from "../../accessories/billDataForm/types";

const itemTypeOptions = [
  {
    label: "bill.medical",
    value: "MED",
  },
  {
    label: "bill.operation",
    value: "OP",
  },
  {
    label: "bill.examen",
    value: "EXA",
  },
  {
    label: "bill.custom",
    value: "CST",
  },
];

const itemOptions = [
  {
    label: "Paracetamol",
    value: "118",
  },
  {
    label: "Amoxiciline",
    value: "119",
  },
  {
    label: "Eferalgan",
    value: "120",
  },
];

const paymentOptions = [
  {
    label: "bill.payment",
    value: "P",
  },
  {
    label: "bill.refund",
    value: "R",
  },
];

const patientOptions = [
  {
    label: "John Doe",
    value: "JD",
  },
  {
    label: "Jack Williams",
    value: "JW",
  },
  {
    label: "Peter Bride",
    value: "PB",
  },
];

const listPriceOptions = [
  {
    label: "bill.basicprice",
    value: "B",
  },
  {
    label: "bill.standartprice",
    value: "S",
  },
];

export const billItemInitialFields: TFields<TBillItemDataFormFieldName> = {
  itemAmount: {
    type: "number",
    value: "0",
  },
  itemId: {
    type: "text",
    value: "",
    options: itemOptions,
  },
  itemDescription: {
    type: "text",
    value: "",
  },
  itemQuantity: {
    type: "number",
    value: "0",
  },
  itemType: {
    type: "text",
    value: "bill.medical",
    options: itemTypeOptions,
  },
};

export const billPaymentInitialFields: TFields<TBillPaymentDataFormFieldName> =
  {
    paymentType: {
      type: "text",
      value: "",
      options: paymentOptions,
    },
    paymentAmount: {
      type: "number",
      value: "0",
    },
    paymentDate: {
      type: "date",
      value: "",
    },
  };

export const initialFields: TFields<TBillDataFormFieldName> = {
  amount: {
    type: "number",
    value: "0",
  },
  balance: {
    type: "number",
    value: "0",
  },
  billDate: {
    type: "date",
    value: "",
  },
  listName: {
    type: "text",
    value: "",
    options: listPriceOptions,
  },
  patName: {
    type: "text",
    value: "",
    options: patientOptions,
  },
};
