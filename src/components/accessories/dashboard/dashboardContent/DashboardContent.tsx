import React, { FunctionComponent } from "react";
import { DashboardFilter } from "./filter/DashboardFilter";
import { GridLayoutToolbox } from "../layouts/toolbox/GridLayoutToolBox";
import GridLayoutContainer from "../layouts/container/GridLayoutContainer";
import { setDashboardPeriod } from "../../../../state/dashboard/actions";
import { useDispatch } from "react-redux";
import "./styles.scss";

export const DashboardContent: FunctionComponent = () => {
  const dispatch = useDispatch();
  const handlePeriodChange = (value: string[]) => {
    dispatch(setDashboardPeriod(value));
  };

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
