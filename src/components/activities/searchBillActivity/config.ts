import { BillDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { BillFilterFormFieldName } from "../../accessories/billFilterForm/types";
import { IBillSummary } from "./types";

export const computeBillSummary = (
  bills: BillDTO[] = [],
  fromDate: string,
  toDate: string,
  userName: string
): IBillSummary => {
  const today = new Date().setHours(0);
  const tomorrow = new Date().setDate(new Date().getDate() + 1);

  const res = {
    today: bills
      .filter(
        (item) => item.date && +item.date >= today && +item.date < tomorrow
      )
      .reduce(
        (sum, current) =>
          sum + ((current.amount || 0) - (current.balance || 0)),
        0
      ),
    todayNotPaid: bills
      .filter(
        (item) => item.date && +item.date >= today && +item.date < tomorrow
      )
      .reduce((sum, current) => sum + (current.balance || 0), 0),
    period: bills
      .filter(
        (item) => item.date && +item.date >= +fromDate && +item.date <= +toDate
      )
      .reduce(
        (sum, current) =>
          sum + ((current.amount || 0) - (current.balance || 0)),
        0
      ),
    periodNotPaid: bills
      .filter(
        (item) => item.date && +item.date >= +fromDate && +item.date <= +toDate
      )
      .reduce((sum, current) => sum + (current.balance || 0), 0),
    user: bills
      .filter(
        (item) =>
          item.date &&
          +item.date >= +fromDate &&
          +item.date <= +toDate &&
          item.user === userName
      )
      .reduce(
        (sum, current) =>
          sum + ((current.amount || 0) - (current.balance || 0)),
        0
      ),
    userNotPaid: bills
      .filter(
        (item) =>
          item.date &&
          +item.date >= +fromDate &&
          +item.date <= +toDate &&
          item.user === userName
      )
      .reduce((sum, current) => sum + (current.balance || 0), 0),
  };
  return res;
};

export const initializeBillFilter = (fromDate: string, toDate: string) => {
  const fields: TFields<BillFilterFormFieldName> = {
    user: {
      value: "",
      type: "text",
      options: [],
    },
    patient: {
      value: "",
      type: "text",
      options: [],
    },
    billItem: {
      value: "",
      type: "text",
      options: [],
    },
    affiliate: {
      value: "",
      type: "text",
      options: [],
    },
    fromDate: {
      value: fromDate,
      type: "date",
    },
    toDate: {
      value: toDate,
      type: "date",
    },
  };
  return fields;
};
