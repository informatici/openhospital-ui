import moment from "moment";
import { FullBillDTO } from "../../../generated";
import {
  combineData,
  sortAndSlice,
} from "../../../libraries/formatUtils/dataFormatting";
import { IBillSummary } from "../../activities/billingActivity/types";

export const computeBillSummary = (
  bills: FullBillDTO[] = [],
  userName: string = "admin"
): IBillSummary => {
  const results = {
    currentUserCashIn: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("year").toDate() &&
          item.bill?.user === userName
      )
      .reduce(
        (sum, current) =>
          sum + ((current.bill?.amount || 0) - (current.bill?.balance || 0)),
        0
      ),
    currentUserDebt: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("year").toDate() &&
          item.bill?.user === userName
      )
      .reduce((sum, current) => sum + (current.bill?.balance || 0), 0),

    annualRevenue: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("year").toDate()
      )
      .reduce(
        (sum, current) =>
          sum + ((current.bill?.amount || 0) - (current.bill?.balance || 0)),
        0
      ),

    annualDebt: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("year").toDate() &&
          item.bill.status === "O"
      )
      .reduce((sum, current) => sum + (current.bill?.balance || 0), 0),

    monthlyRevenue: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("month").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("month").toDate()
      )
      .reduce(
        (sum, current) =>
          sum + ((current.bill?.amount || 0) - (current.bill?.balance || 0)),
        0
      ),

    monthlyDebt: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("month").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("month").toDate() &&
          item.bill.status === "O"
      )
      .reduce((sum, current) => sum + (current.bill?.balance || 0), 0),

    weeklyRevenue: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("week").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("week").toDate()
      )
      .reduce(
        (sum, current) =>
          sum + ((current.bill?.amount || 0) - (current.bill?.balance || 0)),
        0
      ),

    weeklyDebt: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("week").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("week").toDate() &&
          item.bill.status === "O"
      )
      .reduce((sum, current) => sum + (current.bill?.balance || 0), 0),

    dailyRevenue: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("day").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("day").toDate()
      )
      .reduce(
        (sum, current) =>
          sum + ((current.bill?.amount || 0) - (current.bill?.balance || 0)),
        0
      ),

    dailyDebt: bills
      .filter(
        (item) =>
          item.bill?.date &&
          +new Date(item.bill.date) >= +moment().startOf("day").toDate() &&
          +new Date(item.bill.date) <= +moment().endOf("day").toDate() &&
          item.bill.status === "O"
      )
      .reduce((sum, current) => sum + (current.bill?.balance || 0), 0),

    bestSellingByQuantity: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.bill?.date &&
            +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
            +new Date(item.bill.date) <= +moment().endOf("year").toDate()
        )
        .map((item) => item.billItems)
        .flat()
        .reduce((p, c) => {
          const name: string = "#" + c?.itemDisplayCode;
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] += c?.itemQuantity ?? 0;
          return p;
        }, {} as { [key: string]: number })
    ),

    bestSellingByOccurence: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.bill?.date &&
            +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
            +new Date(item.bill.date) <= +moment().endOf("year").toDate()
        )
        .map((item) => item.billItems)
        .flat()
        .reduce((p, c) => {
          const name: string = "#" + c?.itemDisplayCode;
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name]++;
          return p;
        }, {})
    ),

    bestPatientsByPayments: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.bill?.date &&
            +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
            +new Date(item.bill.date) <= +moment().endOf("year").toDate()
        )
        .reduce((p, c) => {
          const name: string =
            "#" + c.bill?.patient?.code + " " + c.bill?.patName;
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] += (c.bill?.amount ?? 0) - (c.bill?.balance ?? 0);
          return p;
        }, {})
    ),

    mostIndebtedPatients: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.bill?.date &&
            +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
            +new Date(item.bill.date) <= +moment().endOf("year").toDate() &&
            item.bill.status === "O"
        )
        .reduce((p, c) => {
          const name: string =
            "#" + c.bill?.patient?.code + " " + c.bill?.patName;
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] += c.bill?.balance ?? 0;
          return p;
        }, {})
    ),

    paymentsByMonthsOfYear: combineData(
      bills
        .filter(
          (item) =>
            item.bill?.date &&
            +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
            +new Date(item.bill.date) <= +moment().endOf("year").toDate()
        )
        .map((item) => item.billPayments)
        .flat()
        .reduce((p, c) => {
          const name = c?.date
            ? moment(c?.date).format("MMMM")
            : moment().format("MMMM");
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] += c?.amount ?? 0;
          return p;
        }, {})
    ),

    debtsByMonthsOfYear: combineData(
      bills
        .filter(
          (item) =>
            item.bill?.date &&
            +new Date(item.bill.date) >= +moment().startOf("year").toDate() &&
            +new Date(item.bill.date) <= +moment().endOf("year").toDate() &&
            item.bill.status === "O"
        )
        .reduce((p, c) => {
          const name = c.bill?.date
            ? moment(c.bill?.date).format("MMMM")
            : moment().format("MMMM");
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] += c.bill?.balance ?? 0;
          return p;
        }, {})
    ),
  };
  return results;
};
