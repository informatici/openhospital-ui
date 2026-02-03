import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent } from "react";
import { Navigate } from "react-router";
import { PATHS } from "../../../../consts";
import { setDashboardPeriod } from "../../../../state/dashboard";
import GridLayoutContainer from "../layouts/container/GridLayoutContainer";
import GridLayoutToolbox from "../layouts/toolbox/GridLayoutToolBox";
import { DashboardFilter } from "./filter/DashboardFilter";
import "./styles.scss";

export const DashboardContent: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handlePeriodChange = (value: string[]) => {
    dispatch(setDashboardPeriod(value));
  };

  const authUserStatus = useAppSelector(
    (state) => state.main.authentication.status ?? "IDLE"
  );

  return (
    <>
      {authUserStatus === "SUCCESS" && (
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
      )}

      {authUserStatus === "LOADING" && (
        <CircularProgress
          style={{
            marginLeft: "50%",
            marginTop: "200px",
            position: "relative",
          }}
        />
      )}

      {authUserStatus === "FAIL" && <Navigate to={PATHS.login} />}
    </>
  );
};
