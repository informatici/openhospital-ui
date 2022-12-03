import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IOwnProps, TViewType } from "./types";
import "./styles.scss";
import moment from "moment";
import { useTranslation } from "react-i18next";
import DateRangeField from "../../../dateRangeField/DateRangeField";
import { DateRange } from "@material-ui/pickers";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@material-ui/core";
import { CalendarTodaySharp } from "@material-ui/icons";
import DateField from "../../../dateField/DateField";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import isEmpty from "lodash.isempty";

export const DashboardFilter: FC<IOwnProps> = ({ onPeriodChange }) => {
  const { t } = useTranslation();
  const [view, setView] = useState<TViewType>("day");
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment().add(-7, "days").toDate(),
    moment().toDate(),
  ]);
  const [date, setDate] = useState(moment().toISOString());
  const [byRange, setByRange] = useState(false);
  const [open, setOpen] = useState(false);
  const range = useMemo(() => {
    if (byRange) {
      return [
        moment((dateRange[0] ?? new Date()).toISOString()).toISOString(),
        moment((dateRange[1] ?? new Date()).toISOString())
          .add(1, "day")
          .toISOString(),
      ];
    }
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
  }, [date, dateRange, view, byRange]);
  const period = useMemo(() => {
    if (byRange) {
      if (
        (moment(dateRange[0]?.toISOString()).startOf("day") ?? "") ===
        moment(dateRange[1]?.toISOString()).startOf("day")
      ) {
        return t("common.period.today");
      }
      return `${moment(dateRange[0]?.toISOString()).format(
        "yyyy-MM-DD"
      )} - ${moment(dateRange[1]?.toISOString()).format("yyyy-MM-DD")}`;
    }

    switch (view) {
      case "day":
        return moment(date).isSame(moment(), "day")
          ? t("common.period.today")
          : moment(date).isSame(moment().add(-1, "day"), "day")
          ? t("common.period.yesterday")
          : moment(date).format("dddd, MMMM Do YYYY");
      case "week":
        return moment(date).isSame(moment(), "week")
          ? t("common.period.thisweek")
          : moment(date).isSame(moment().add(-1, "week"), "week")
          ? t("common.period.lastweek")
          : `${moment(date).startOf("week").format("YYYY-MM-DD")} - ${moment(
              date
            )
              .endOf("week")
              .format("YYYY-MM-DD")}`;
      case "month":
        return moment(date).isSame(moment(), "month")
          ? t("common.period.thismonth")
          : moment(date).isSame(moment().add(-1, "month"), "month")
          ? t("common.period.lastmonth")
          : `${moment(date).format("MMMM YYYY")}`;
      default:
        return moment(date).isSame(moment(), "year")
          ? t("common.period.thisyear")
          : moment(date).isSame(moment().add(-1, "year"), "year")
          ? t("common.period.lastyear")
          : `${moment(date).format("YYYY")}`;
    }
  }, [dateRange, view, byRange, date]);

  const views = useMemo(() => {
    switch (view) {
      case "day":
        return undefined;
      case "week":
        return undefined;
      default:
        return [view];
    }
  }, [view]);

  useEffect(() => {
    onPeriodChange(range);
  }, [range]);

  const handleByRange = useCallback(
    (event: any, checked: boolean) => {
      setByRange(checked);
    },
    [byRange]
  );

  const handleViewChange = useCallback(
    (event: any, value: any) => {
      if (!isEmpty(value)) {
        setView(value as TViewType);
      }
    },
    [view]
  );

  const handleDateChange = useCallback(
    (value) => {
      setDate(moment(value).isValid() ? moment(value).toISOString() : date);
      setOpen(false);
    },
    [open, date]
  );

  const handleDateRangeChange = useCallback(
    (value: DateRange<Date>) => {
      if (
        moment(value[0]?.toISOString()).isValid() &&
        moment(value[1]?.toISOString()).isValid()
      ) {
        setDateRange([value[0], value[1]]);
      }
      setOpen(false);
    },
    [dateRange, open]
  );
  return (
    <div className="filter">
      <div className="filter__header">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={byRange}
                onChange={handleByRange}
                name="checkedA"
              />
            }
            label={t("dashboard.userange")}
          />
        </FormGroup>
      </div>
      <div className="filter__main">
        {!byRange && (
          <ToggleButtonGroup
            className="options"
            value={view}
            exclusive
            onChange={handleViewChange}
          >
            <ToggleButton value="day">
              <span>Day</span>
            </ToggleButton>
            <ToggleButton value="week">
              <span>Week</span>
            </ToggleButton>
            <ToggleButton value="month">
              <span>Month</span>
            </ToggleButton>
            <ToggleButton value="year" selected={view === "year"}>
              <span>Year</span>
            </ToggleButton>
          </ToggleButtonGroup>
        )}
        <span className={byRange ? "period" : ""}>{period}</span>
        <div className="actions">
          {byRange ? (
            <DateRangeField
              fieldName="period"
              isValid={true}
              fieldValue={dateRange}
              format="dd/MM/YYY"
              onChange={handleDateRangeChange}
              TextFieldComponent={(props) => (
                <IconButton
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <CalendarTodaySharp />
                </IconButton>
              )}
              open={open}
            />
          ) : (
            <DateField
              fieldName="period"
              isValid={true}
              fieldValue={""}
              errorText=""
              label=""
              format="dd/MM/YYY"
              onChange={handleDateChange}
              views={views}
              TextFieldComponent={(props) => (
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setOpen(!open);
                  }}
                >
                  <CalendarTodaySharp />
                </IconButton>
              )}
              open={open}
            />
          )}
        </div>
      </div>
    </div>
  );
};
