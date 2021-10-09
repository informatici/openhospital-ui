import { TFields } from "../../../libraries/formDataHandling/types";
import { TBillDataFormFieldName } from "../../accessories/billDataForm/types";

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
    value: "PARA",
  },
  {
    label: "Amoxiciline",
    value: "AMOX",
  },
  {
    label: "Eferalgan",
    value: "EFG",
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

export const initialFields: TFields<TBillDataFormFieldName> = {
  amount: {
    type: "number",
    value: "0",
  },
  itemAmount: {
    type: "number",
    value: "0",
  },
  balance: {
    type: "number",
    value: "0",
  },
  paymentAmount: {
    type: "number",
    value: "0",
  },
  billDate: {
    type: "date",
    value: "",
  },
  itemDescription: {
    type: "text",
    value: "",
    options: itemOptions,
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
  itemId: {
    type: "text",
    value: "0",
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
  paymentType: {
    type: "text",
    value: "",
    options: paymentOptions,
  },
};
