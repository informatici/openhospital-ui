import { DateRange } from "@material-ui/pickers";
import moment from "moment";
import { useState, useMemo } from "react";
import { TViewType, TPeriodType } from "./types";

export const usePeriodOptions = () => {
  const [view, setView] = useState<TViewType>("day");
  const [selection, setSelection] = useState<TPeriodType>("current");
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment().add(-7, "days").toDate(),
    moment().toDate(),
  ]);
  /**
   * We will discuss about the logic behind range
   */
  const range = useMemo(() => {
    if (view !== "range") {
      switch (selection) {
        case "current":
          return [
            moment().utc().startOf(view).toISOString(),
            moment().utc().endOf(view).toISOString(),
          ];
        case "previous":
          return [
            moment().add(-1, view).utc().startOf(view).toISOString(),
            moment().add(-1, view).utc().endOf(view).toISOString(),
          ];
        case "last2":
          return [
            moment().add(-2, view).utc().startOf(view).toISOString(),
            moment().add(-1, view).utc().endOf(view).toISOString(),
          ];
        case "last3":
          return [
            moment().add(-3, view).utc().startOf(view).toISOString(),
            moment().add(-1, view).utc().endOf(view).toISOString(),
          ];
      }
    }
    return [
      moment(dateRange[0]?.toISOString()).utc().startOf("day").toISOString(),
      moment(dateRange[1]?.toISOString()).utc().endOf("day").toISOString(),
    ];
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
