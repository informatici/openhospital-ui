import React, { FunctionComponent } from "react";
import { DashboardFilter } from "./filter/DashboardFilter";
import GridLayoutToolbox from "../layouts/toolbox/GridLayoutToolBox";
import GridLayoutContainer from "../layouts/container/GridLayoutContainer";
import { setDashboardPeriod } from "../../../../state/dashboard";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import "./styles.scss";
import { IState } from "../../../../types";
import { TAPIResponseStatus } from "../../../../state/types";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router";
import { PATHS } from "../../../../consts";

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
