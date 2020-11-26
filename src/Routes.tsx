import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./components/activities/notFound/NotFound";
import PrivateRoute from "./components/accessories/privateRoute/PrivateRoute";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";
import PatientDetailsActivity from "./components/activities/patientDetailsActivity/PatientDetailsActivity";
import SearchPatientActivity from "./components/activities/searchPatientActivity/SearchPatientActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login">
          <LoginActivity successRoute="/" />
        </Route>
        <PrivateRoute exact path="/">
          <DashboardActivity
            newPatientRoute="/new"
            searchPatientRoute="/search"
          />
        </PrivateRoute>
        <PrivateRoute path="/new">
          <NewPatientActivity dashboardRoute="/" />
        </PrivateRoute>
        <PrivateRoute path="/search">
          <SearchPatientActivity />
        </PrivateRoute>
        <PrivateRoute path="/details/:id">
          <PatientDetailsActivity />
        </PrivateRoute>
        <PrivateRoute>
          <NotFound />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
