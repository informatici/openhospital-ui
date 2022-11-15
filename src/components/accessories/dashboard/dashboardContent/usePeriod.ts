import moment from "moment";
import { useMemo } from "react";
import { TViewType } from "./filter/types";

export const usePeriod = (view: TViewType, date: string) => {
  const period = useMemo(() => {
    switch (view) {
      case "day":
        return [
          moment(date).startOf("day").toISOString(),
          moment(date).endOf("day").toISOString(),
        ];
      case "week":
        return [
          moment(date).startOf("week").toISOString(),
          moment(date).endOf("week").toISOString(),
        ];
      case "month":
        return [
          moment(date).startOf("month").toISOString(),
          moment(date).endOf("month").toISOString(),
        ];
      default:
        return [
          moment(date).startOf("year").toISOString(),
          moment(date).endOf("year").toISOString(),
        ];
    }
  }, [view, date]);
  return period;
};
