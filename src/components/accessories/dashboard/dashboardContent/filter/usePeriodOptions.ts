import { DateRange } from "@material-ui/pickers";
import moment from "moment";
import { useState, useMemo } from "react";
import { TViewType, TPeriodType } from "./types";
import { getCachedPeriod } from "./consts";

export const usePeriodOptions = () => {
  const cachedPeriod = getCachedPeriod();
  const [view, setView] = useState<TViewType>("range");
  const [selection, setSelection] = useState<TPeriodType>("current");
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    new Date(cachedPeriod[0]),
    new Date(cachedPeriod[1]),
  ]);

  /**
   * We will discuss about the logic behind range
   */
  const range = useMemo(() => {
    let value: moment.Moment[] = [];

    if (view !== "range") {
      switch (selection) {
        case "current":
          value = [moment().utc().startOf(view), moment().utc().endOf(view)];
          break;
        case "previous":
          value = [
            moment().add(-1, view).utc().startOf(view),
            moment().add(-1, view).utc().endOf(view),
          ];
          break;
        case "last2":
          value = [
            moment().add(-2, view).utc().startOf(view),
            moment().add(-1, view).utc().endOf(view),
          ];
          break;
        case "last3":
          value = [
            moment().add(-3, view).utc().startOf(view),
            moment().add(-1, view).utc().endOf(view),
          ];
          break;
        default:
          value = [
            moment(dateRange[0]?.toISOString()).utc().startOf("day"),
            moment(dateRange[1]?.toISOString()).utc().endOf("day"),
          ];
      }
      if (view === "week") {
        value = [value[0].add(1, "day"), value[1].add(1, "day")];
      }
    } else {
      value = [
        moment(dateRange[0]?.toISOString()).utc().startOf("day"),
        moment(dateRange[1]?.toISOString()).utc().endOf("day"),
      ];
    }
    return [value[0].toISOString(), value[1].toISOString()];
  }, [selection, dateRange, view]);

  const period = useMemo(() => {
    return `${moment(range[0]).format("yyyy-MM-DD")} - ${moment(range[1])
      .add(-1, "day")
      .format("yyyy-MM-DD")}`;
  }, [dateRange, view, selection]);

  return {
    view,
    setView,
    dateRange,
    setDateRange,
    range,
    period,
    selection,
    setSelection,
  };
};
