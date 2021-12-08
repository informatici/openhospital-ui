import moment from "moment";
import { BillItemsDTO, FullBillDTO } from "../../../generated";
import { IBillSummary } from "../../activities/billingActivity/types";

export const computeBillSummary = (
  bills: FullBillDTO[] = [],
  dateFrom: string,
  dateTo: string,
  userName: string
): IBillSummary => {
  const today = new Date().setTime(0);

  const sortAndSlice: any = (data: any[]) => {
    return Object.keys(data)
      .sort(function (a, b) {
        return (data as any)[a] - (data as any)[b];
      })
      .slice(0, 10);
  };
  const res = {
    today: bills
      .filter(
        (item) => item.billDTO?.date && +new Date(item.billDTO.date) >= today
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),
    todayNotPaid: bills
      .filter(
        (item) => item.billDTO?.date && +new Date(item.billDTO.date) >= today
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),
    period: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +new Date(dateFrom) &&
          +new Date(item.billDTO.date) <= +new Date(dateTo)
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),
    periodNotPaid: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +new Date(dateFrom) &&
          +new Date(item.billDTO.date) <= +new Date(dateTo)
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),
    user: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +new Date(dateFrom) &&
          +new Date(item.billDTO.date) <= +new Date(dateTo) &&
          item.billDTO?.user === userName
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),
    userNotPaid: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +new Date(dateFrom) &&
          +new Date(item.billDTO.date) <= +new Date(dateTo) &&
          item.billDTO?.user === userName
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),

    annualRevenue: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >=
            +new Date(new Date().getFullYear(), 0, 1) &&
          +new Date(item.billDTO.date) <=
            +new Date(new Date().getFullYear(), 11, 31)
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),

    annualDebt: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >=
            +new Date(new Date().getFullYear(), 0, 1) &&
          +new Date(item.billDTO.date) <=
            +new Date(new Date().getFullYear(), 11, 31) &&
          item.billDTO.status === "O"
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),

    monthlyRevenue: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("month").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("month").toDate()
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),

    monthlyDebt: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("month").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("month").toDate() &&
          item.billDTO.status === "O"
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),

    weeklyRevenue: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("week").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("week").toDate()
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),

    weeklyDebt: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("week").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("week").toDate() &&
          item.billDTO.status === "O"
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),

    dailyRevenue: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("day").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("day").toDate()
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),

    dailyDebt: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("day").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("day").toDate() &&
          item.billDTO.status === "O"
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),

    top10MostSaleArticles: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.billDTO?.date &&
            +new Date(item.billDTO.date) >=
              +moment().startOf("year").toDate() &&
            +new Date(item.billDTO.date) <= +moment().endOf("year").toDate() &&
            item.billDTO.status === "O"
        )
        .map((item) => item.billItemsDTO)
        .flat()
        .reduce((p, c) => {
          const name: string = c?.itemDescription ?? "other";
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name]++;
          return p;
        }, {})
    ),
  };
  return res;
};
