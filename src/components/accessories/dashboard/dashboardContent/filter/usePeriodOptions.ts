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
    if (view === "day") {
      switch (selection) {
        case "current":
          return [
            moment().utc().startOf("day").toISOString(),
            moment().utc().endOf("day").toISOString(),
          ];
        case "previous":
          return [
            moment().add(-1, "day").utc().startOf("day").toISOString(),
            moment().add(-1, "day").utc().endOf("day").toISOString(),
          ];
        case "last2":
          return [
            moment().add(-2, "day").utc().startOf("day").toISOString(),
            moment().add(-1, "day").utc().endOf("day").toISOString(),
          ];
        case "last3":
          return [
            moment().add(-3, "day").utc().startOf("day").toISOString(),
            moment().add(-1, "day").utc().endOf("day").toISOString(),
          ];
        default:
          return [
            moment(dateRange[0]?.toISOString())
              .utc()
              .startOf("day")
              .toISOString(),
            moment(dateRange[1]?.toISOString())
              .utc()
              .endOf("day")
              .toISOString(),
          ];
      }
    }
    if (view === "week") {
      switch (selection) {
        case "current":
          return [
            moment().utc().startOf("week").toISOString(),
            moment().utc().endOf("week").toISOString(),
          ];
        case "previous":
          return [
            moment().add(-1, "week").utc().startOf("week").toISOString(),
            moment().add(-1, "week").utc().endOf("week").toISOString(),
          ];
        case "last2":
          return [
            moment().add(-2, "week").utc().startOf("week").toISOString(),
            moment().add(-1, "week").utc().endOf("week").toISOString(),
          ];
        case "last3":
          return [
            moment().add(-3, "week").utc().startOf("week").toISOString(),
            moment().add(-1, "week").utc().endOf("week").toISOString(),
          ];
        default:
          return [dateRange[0]?.toISOString(), dateRange[1]?.toISOString()];
      }
    }
    if (view === "month") {
      switch (selection) {
        case "current":
          return [
            moment().utc().startOf("month").toISOString(),
            moment().utc().endOf("month").toISOString(),
          ];
        case "previous":
          return [
            moment().add(-1, "month").utc().startOf("month").toISOString(),
            moment().add(-1, "month").utc().endOf("month").toISOString(),
          ];
        case "last2":
          return [
            moment().add(-2, "month").utc().startOf("month").toISOString(),
            moment().add(-1, "month").utc().endOf("month").toISOString(),
          ];
        case "last3":
          return [
            moment().add(-3, "month").utc().startOf("month").toISOString(),
            moment().add(-1, "month").utc().endOf("month").toISOString(),
          ];
        default:
          return [dateRange[0]?.toISOString(), dateRange[1]?.toISOString()];
      }
    }
    if (view === "year") {
      switch (selection) {
        case "current":
          return [
            moment().utc().startOf("year").toISOString(),
            moment().utc().endOf("year").toISOString(),
          ];
        case "previous":
          return [
            moment().add(-1, "year").utc().startOf("year").toISOString(),
            moment().add(-1, "year").utc().endOf("year").toISOString(),
          ];
        case "last2":
          return [
            moment().add(-2, "year").utc().startOf("year").toISOString(),
            moment().add(-1, "year").utc().endOf("year").toISOString(),
          ];
        case "last3":
          return [
            moment().add(-3, "year").utc().startOf("year").toISOString(),
            moment().add(-1, "year").utc().endOf("year").toISOString(),
          ];
        default:
          return [dateRange[0]?.toISOString(), dateRange[1]?.toISOString()];
      }
    }
    return [dateRange[0]?.toISOString(), dateRange[1]?.toISOString()];
  }, [selection, dateRange, view]);

  const period = useMemo(() => {
    return `${moment(range[0]).format("yyyy-MM-DD")} - ${moment(
      range[1]
    ).format("yyyy-MM-DD")}`;
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
