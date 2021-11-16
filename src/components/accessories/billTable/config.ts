import { FullBillDTO } from "../../../generated";
import { IBillSummary } from "../../activities/billingActivity/types";

export const computeBillSummary = (
  bills: FullBillDTO[] = [],
  dateFrom: string,
  dateTo: string,
  userName: string
): IBillSummary => {
  const today = new Date().setTime(0);
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
  };
  return res;
};
