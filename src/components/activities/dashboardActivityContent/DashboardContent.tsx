import moment from "moment";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Admissions } from "../../accessories/dashboard/admissions/Admissions";
import { Opds } from "../../accessories/dashboard/opds/Opds";
import { DashboardFilter } from "./filter/DashboardFilter";
import { TViewType } from "./filter/types";
import { SideContent } from "./SideContent";
import "./styles.scss";
import { usePeriod } from "./usePeriod";

export const DashboardContent: FunctionComponent = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(moment().toISOString());
  const [view, setView] = useState<TViewType>("day");
  const handleDateChange = useCallback(
    (value: string) => {
      setDate(value);
    },
    [date]
  );
  const handleViewChange = useCallback(
    (value: TViewType) => {
      setView(value);
    },
    [view]
  );

  const period = usePeriod(view, date);

  return (
    <div className="dashboard__content">
      <div className="dashboard__main">
        <div className="header">
          <DashboardFilter
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
          />
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
