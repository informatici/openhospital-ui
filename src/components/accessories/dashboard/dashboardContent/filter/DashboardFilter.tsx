import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IOwnProps } from "./types";
import "./styles.scss";
import moment from "moment";
import { useTranslation } from "react-i18next";
import DateRangeField from "../../../dateRangeField/DateRangeField";
import { DateRange } from "@material-ui/pickers";
import { IconButton } from "@material-ui/core";
import { CalendarTodaySharp } from "@material-ui/icons";

export const DashboardFilter: FC<IOwnProps> = ({ onDateChange }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState<DateRange<Date>>([
    moment().add(-7, "days").toDate(),
    moment().toDate(),
  ]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    onDateChange(date);
  }, [date]);
  const period = useMemo(() => {
    if (
      (moment(date[0]?.toISOString()).startOf("day") ?? "") ===
      moment(date[1]?.toISOString()).startOf("day")
    ) {
      return t("common.period.today");
    }
    return `${moment(date[0]?.toISOString()).format("yyyy-MM-DD")} - ${moment(
      date[1]?.toISOString()
    ).format("yyyy-MM-DD")}`;
  }, [date]);
  const handleDateChange = useCallback(
    (value: DateRange<Date>) => {
      if (
        moment(value[0]?.toISOString()).isValid() &&
        moment(value[1]?.toISOString()).isValid()
      ) {
        setDate([value[0], value[1]]);
      }
      setOpen(false);
    },
    [date]
  );
  return (
    <div className="filter">
      <span>{period}</span>
      <div className="actions">
        <DateRangeField
          fieldName="period"
          isValid={true}
          fieldValue={date}
          format="dd/MM/YYY"
          onChange={handleDateChange}
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
      </div>
    </div>
  );
};
