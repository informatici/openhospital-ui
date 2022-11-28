import { DateRange } from "@material-ui/pickers";
import moment from "moment";
import { useMemo } from "react";

export const usePeriod = (date: DateRange<Date>) => {
  const period = useMemo(() => {
    return [
      moment((date[0] ?? new Date()).toISOString())
        .startOf("day")
        .toISOString(),
      moment((date[1] ?? new Date()).toISOString()).toISOString(),
    ];
  }, [date]);
  return period;
};
