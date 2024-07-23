import React, { FC, useCallback, useEffect, useState } from "react";
import { IOwnProps, TPeriodType, TViewType } from "./types";
import "./styles.scss";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import { CalendarTodaySharp } from "@mui/icons-material";
import DateField from "../../../dateField/DateField";
import { ToggleButtonGroup, ToggleButton, DateRange } from "@mui/lab";
import { isEmpty } from "lodash";
import { usePeriodOptions } from "./usePeriodOptions";
import DateRangeField from "../../../dateRangeField/DateRangeField";

export const DashboardFilter: FC<IOwnProps> = ({ onPeriodChange }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    view,
    setView,
    dateRange,
    setDateRange,
    range,
    period,
    selection,
    setSelection,
  } = usePeriodOptions();

  useEffect(() => {
    onPeriodChange([range[0], range[1]]);
  }, [range]);

  const handleViewChange = useCallback(
    (event: any, value: any) => {
      if (!isEmpty(value)) {
        setView(value as TViewType);
        setSelection("current");
      }
    },
    [view]
  );

  const handleSelectionChange = useCallback(
    (event: any, value: any) => {
      if (!isEmpty(value)) {
        setSelection(value as TPeriodType);
      }
    },
    [selection]
  );

  const onIconClickHandler = useCallback(
    (event: any) => {
      setOpen(!open);
    },
    [open]
  );

  const handleDateRangeChange = useCallback(
    (value: DateRange<Date>) => {
      if (
        moment(value[0]?.toISOString()).isValid() &&
        moment(value[1]?.toISOString()).isValid()
      ) {
        setDateRange([value[0], value[1]]);
      }
      setSelection("custom");
      setOpen(false);
    },
    [dateRange]
  );

  const handleDateChange = useCallback(
    (value: Date | null) => {
      if (moment(value?.toISOString()).isValid()) {
        setDateRange([value, value]);
      }
      setView("day");
      setSelection("custom");
      setOpen(false);
    },
    [dateRange]
  );

  return (
    <div className="filter">
      <div className="filter__main">
        <ToggleButtonGroup
          className="options"
          value={view}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value="day">
            <span>{t("dashboard.period.day")}</span>
          </ToggleButton>
          <ToggleButton value="week">
            <span>{t("dashboard.period.week")}</span>
          </ToggleButton>
          <ToggleButton value="month">
            <span>{t("dashboard.period.month")}</span>
          </ToggleButton>
          <ToggleButton value="year">
            <span>{t("dashboard.period.year")}</span>
          </ToggleButton>
          <ToggleButton value="range">
            <span>{t("dashboard.period.range")}</span>
          </ToggleButton>
        </ToggleButtonGroup>

        {view !== "range" && (
          <ToggleButtonGroup
            className="options"
            value={selection}
            exclusive
            onChange={handleSelectionChange}
          >
            <ToggleButton value="current">
              <span>{t(`dashboard.period.${view}s.current`)}</span>
            </ToggleButton>
            <ToggleButton value="previous">
              <span>{t(`dashboard.period.${view}s.previous`)}</span>
            </ToggleButton>
            <ToggleButton value="last2">
              <span>{t(`dashboard.period.${view}s.last2`)}</span>
            </ToggleButton>
            <ToggleButton value="last3">
              <span>{t(`dashboard.period.${view}s.last3`)}</span>
            </ToggleButton>
          </ToggleButtonGroup>
        )}
        <ToggleButtonGroup
          className="options"
          value={selection}
          exclusive
          onChange={handleSelectionChange}
        >
          <ToggleButton value="custom">
            <span>{period ?? "Custom"}</span>
            {view === "range" ? (
              <DateRangeField
                fieldName="period"
                isValid={true}
                fieldValue={dateRange}
                format="dd/MM/YYY"
                onClose={() => setOpen(false)}
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
                errorText=""
                label=""
                fieldValue={dateRange[0]?.toISOString() ?? ""}
                format="dd/MM/YYY"
                onChange={handleDateChange}
                TextFieldComponent={(props) => (
                  <IconButton onClick={onIconClickHandler}>
                    <CalendarTodaySharp />
                  </IconButton>
                )}
                open={open}
              />
            )}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};
