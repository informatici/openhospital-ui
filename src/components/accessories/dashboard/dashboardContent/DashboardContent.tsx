import { DateRange } from "@material-ui/pickers";
import moment from "moment";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Admissions } from "../admissions/Admissions";
import { Opds } from "../opds/Opds";
import { DashboardFilter } from "./filter/DashboardFilter";
import { SideContent } from "./SideContent";
import "./styles.scss";
import { usePeriod } from "./usePeriod";

export const DashboardContent: FunctionComponent = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<DateRange<Date>>([null, null]);
  const handleDateChange = useCallback(
    (value: DateRange<Date>) => {
      setDate(value);
    },
    [date]
  );

  const period = usePeriod(date);

  return (
    <div className="dashboard__content">
      <div className="dashboard__main">
        <div className="header">
          <DashboardFilter onDateChange={handleDateChange} />
        </div>
        <div className="body">
          <Opds period={period} />
          <Admissions period={period} />
        </div>
      </div>
      <div className="dashboard__side">
        <SideContent />
      </div>
    </div>
  );
};
