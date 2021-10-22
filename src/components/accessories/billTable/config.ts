import { FullBillDTO } from "../../../generated";
import { IBillSummary } from "../../activities/manageBillActivity/types";

export const computeBillSummary = (
  bills: FullBillDTO[] = [],
  dateFrom: string,
  dateTo: string,
  userName: string
): IBillSummary => {
  const today = new Date().setHours(0);
  const tomorrow = new Date().setDate(new Date().getDate() + 1);

  const fromDate = isNaN(+dateFrom) ? new Date(dateFrom) : new Date(+dateFrom);
  const toDate = isNaN(+dateTo) ? new Date(dateTo) : new Date(+dateTo);
  const res = {
    today: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +item.billDTO?.date >= today &&
          +item.billDTO?.date < tomorrow
      )
      .reduce(
        (sum, current) =>
          sum +
          ((current.billDTO?.amount || 0) - (current.billDTO?.balance || 0)),
        0
      ),
    todayNotPaid: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +item.billDTO?.date >= today &&
          +item.billDTO?.date < tomorrow
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),
    period: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +item.billDTO?.date >= +fromDate &&
          +item.billDTO?.date <= +toDate
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
          +item.billDTO?.date >= +fromDate &&
          +item.billDTO?.date <= +toDate
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),
    user: bills
      .filter(
        (item) =>
          item.billDTO?.date &&
          +item.billDTO?.date >= +fromDate &&
          +item.billDTO?.date <= +toDate &&
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
          +item.billDTO?.date >= +fromDate &&
          +item.billDTO?.date <= +toDate &&
          item.billDTO?.user === userName
      )
      .reduce((sum, current) => sum + (current.billDTO?.balance || 0), 0),
  };
  return res;
};
