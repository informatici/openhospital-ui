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
    value: "18",
    options: itemOptions,
  },
  itemDescription: {
    type: "text",
    value: "",
  },
  itemQuantity: {
    type: "number",
    value: "1",
  },
  itemType: {
    type: "text",
    value: "MED",
    options: itemTypeOptions,
  },
};

export const billPaymentInitialFields: TFields<TBillPaymentDataFormFieldName> =
  {
    paymentType: {
      type: "text",
      value: "P",
      options: paymentOptions,
    },
    amount: {
      type: "number",
      value: "0",
    },
    date: {
      type: "date",
      value: new Date(Date.now()).toLocaleString(),
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
  date: {
    type: "date",
    value: new Date(Date.now()).toLocaleString(),
  },
  listId: {
    type: "number",
    value: "0",
    options: listPriceOptions,
  },
  patName: {
    type: "text",
    value: "JD",
    options: patientOptions,
  },
};
