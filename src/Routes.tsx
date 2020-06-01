import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <DashboardActivity
            newPatientRoute="/new"
            searchPatientRoute="/search"
          />
        </Route>
        <Route path="/new">
          <NewPatientActivity />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
