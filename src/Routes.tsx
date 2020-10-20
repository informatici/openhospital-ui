import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";
import SearchPatientActivity from "./components/activities/searchPatientActivity/SearchPatientActivity";
import PatientDetailsActivity from "./components/activities/patientDetailsActivity/PatientDetailsActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
        <Route path="/search">
          <SearchPatientActivity />
        </Route>
        <Route path="/details/:id">
          <PatientDetailsActivity />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
