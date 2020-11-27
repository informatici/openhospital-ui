import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/accessories/privateRoute/PrivateRoute";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";
import EditPatientActivity from "./components/activities/editPatientActivity/EditPatientActivity";
import PatientDetailsActivity from "./components/activities/patientDetailsActivity/PatientDetailsActivity";
import SearchPatientActivity from "./components/activities/searchPatientActivity/SearchPatientActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <LoginActivity successRoute="/dashboard" />
        </Route>
        <PrivateRoute path="/dashboard">
          <DashboardActivity
            newPatientRoute="/new"
            searchPatientRoute="/search"
          />
        </PrivateRoute>
        <PrivateRoute path="/new">
          <NewPatientActivity dashboardRoute="/dashboard" />
        </PrivateRoute>
        <PrivateRoute path="/search">
          <SearchPatientActivity />
        </PrivateRoute>
        <PrivateRoute path="/details/:id/edit">
          <EditPatientActivity />
        </PrivateRoute>
        <PrivateRoute path="/details/:id">
          <PatientDetailsActivity />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
