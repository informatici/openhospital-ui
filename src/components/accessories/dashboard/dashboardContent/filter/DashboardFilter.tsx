import { IconButton } from "@material-ui/core";
import {
  Edit,
  CalendarViewDayRounded,
  CalendarTodayRounded,
} from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import isEmpty from "lodash.isempty";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IOwnProps, TViewType } from "./types";
import "./styles.scss";
import moment from "moment";
import { useTranslation } from "react-i18next";
import DateField from "../../../dateField/DateField";

export const DashboardFilter: FC<IOwnProps> = ({
  onDateChange,
  onViewChange,
}) => {
  const { t } = useTranslation();
  const [view, setView] = useState<TViewType>("day");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(moment().toISOString());
  useEffect(() => {
    setDate(moment().toISOString());
    onViewChange(view);
  }, [view]);
  useEffect(() => {
    onDateChange(date);
  }, [date]);
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
  const period = useMemo(() => {
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
  }, [date, view]);
  const handleChange = (event: any, value: any) => {
    if (!isEmpty(value)) {
      setView(value as TViewType);
    }
  };
  const handleDateChange = useCallback(
    (value) => {
      setDate(moment(value).isValid() ? moment(value).toISOString() : date);
      setOpen(false);
    },
    [open]
  );
  return (
    <div className="filter">
      <ToggleButtonGroup
        className="options"
        value={view}
        exclusive
        onChange={handleChange}
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
      <div className="actions">
        <span>{period}</span>
        <DateField
          fieldName="period"
          isValid={true}
          fieldValue={""}
          errorText=""
          label=""
          format="dd/MM/YYY"
          onChange={handleDateChange}
          open={open}
          views={views}
          TextFieldComponent={(props: any) => (
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <CalendarTodayRounded />
            </IconButton>
          )}
        />
      </div>
    </div>
  );
};
