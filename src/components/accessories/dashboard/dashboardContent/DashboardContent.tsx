import { DateRange } from "@material-ui/pickers";
import moment from "moment";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Tabs from "../../tabs/Tabs";
import { TTabConfig } from "../../tabs/types";
import { Admissions } from "../admissions/Admissions";
import { Discharges } from "../discharges/Discharges";
import { Opds } from "../opds/Opds";
import { DashboardFilter } from "./filter/DashboardFilter";
import { SideContent } from "./SideContent";
import "./styles.scss";
import { GridLayoutToolbox } from "../layouts/toolbox/GridLayoutToolBox";
import GridLayoutContainer from "../layouts/container/GridLayoutContainer";

export const DashboardContent: FunctionComponent = () => {
  const { t } = useTranslation();

  const [period, setPeriod] = useState([
    moment().startOf("day").toISOString(),
    moment().endOf("day").toISOString(),
  ]);

  const handlePeriodChange = useCallback((value: string[]) => {
    setPeriod(value);
  }, []);

  const patientSummaryTabs: TTabConfig = [
    { label: "OPD", content: <Opds period={period} /> },
    { label: "Admissions", content: <Admissions period={period} /> },
    { label: "Discharges", content: <Discharges period={period} /> },
  ];

  return (
    <div className="dashboard__content">
      <div className="dashboard__main">
        <div className="dashboard__main-content">
          <div className="dashboard__main-header">
            <DashboardFilter onPeriodChange={handlePeriodChange} />
          </div>
          <div className="dashboard__main-body">
            <GridLayoutContainer />
          </div>
        </div>
        <div className="dashboard__main-side">
          <GridLayoutToolbox />
        </div>
      </div>
    </div>
  );
};
