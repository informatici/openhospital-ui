import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <DashboardActivity />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
