import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/dashboard">
        <DashboardActivity />
      </Route>
    </Switch>
  );
};

export default Routes;
