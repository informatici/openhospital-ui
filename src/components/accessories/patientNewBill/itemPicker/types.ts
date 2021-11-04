import { TFields } from "../../../../libraries/formDataHandling/types";

interface IBillItemPickerProps {}

export type BillItemPickerProps = IBillItemPickerProps;

export type BillItemPickerFormFieldName =
  | "medicalId"
  | "qty"
  | "nbDays"
  | "nbWeeks"
  | "nbMonths"
  | "freqInDay"
  | "freqInPeriod"
  | "startDate"
  | "endDate"
  | "notifyInt"
  | "smsInt"
  | "note";
