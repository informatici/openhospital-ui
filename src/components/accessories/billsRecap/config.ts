import moment from "moment";
import { FullBillDTO } from "../../../generated";
import { IBillSummary } from "../../activities/billingActivity/types";

export const computeBillSummary = (
  bills: FullBillDTO[] = [],
  userName: string
): IBillSummary => {
  const sortAndSlice: any = (data: any[]) => {
    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  };
  const res = {
    currentUserCashIn: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("year").toDate() &&
          item.billDTO?.user === userName
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),
    currentUserDebt: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("year").toDate() &&
          item.billDTO?.user === userName
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),

    annualRevenue: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +new Date(item.billDTO.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("year").toDate()
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
          +new Date(item.billDTO.date) >= +moment().startOf("year").toDate() &&
          +new Date(item.billDTO.date) <= +moment().endOf("year").toDate() &&
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

    bestSellingByQuantity: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.billDTO?.date &&
            +new Date(item.billDTO.date) >=
              +moment().startOf("year").toDate() &&
            +new Date(item.billDTO.date) <= +moment().endOf("year").toDate()
        )
        .map((item) => item.billItemsDTO)
        .flat()
        .reduce((p, c) => {
          const name: string =
            "#" + c?.itemDisplayCode + " " + c?.itemDescription;
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
            item.billDTO?.date &&
            +new Date(item.billDTO.date) >=
              +moment().startOf("year").toDate() &&
            +new Date(item.billDTO.date) <= +moment().endOf("year").toDate()
        )
        .map((item) => item.billItemsDTO)
        .flat()
        .reduce((p, c) => {
          const name: string =
            "#" + c?.itemDisplayCode + " " + c?.itemDescription;
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
            item.billDTO?.date &&
            +new Date(item.billDTO.date) >=
              +moment().startOf("year").toDate() &&
            +new Date(item.billDTO.date) <= +moment().endOf("year").toDate()
        )
        .reduce((p, c) => {
          const name: string =
            "#" + c?.billDTO?.patientDTO?.code + " " + c?.billDTO?.patName;
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] +=
            (c.billDTO?.amount ?? 0) - (c.billDTO?.balance ?? 0);
          return p;
        }, {})
    ),

    mostIndebtedPatients: sortAndSlice(
      bills
        .filter(
          (item) =>
            item.billDTO?.date &&
            +new Date(item.billDTO.date) >=
              +moment().startOf("year").toDate() &&
            +new Date(item.billDTO.date) <= +moment().endOf("year").toDate() &&
            item.billDTO.status === "O"
        )
        .reduce((p, c) => {
          const name: string =
            "#" + c?.billDTO?.patientDTO?.code + " " + c?.billDTO?.patName;
          if (p && !p.hasOwnProperty(name)) {
            (p as any)[name] = 0;
          }
          (p as any)[name] += c.billDTO?.balance ?? 0;
          return p;
        }, {})
    ),
  };
  return res;
};
