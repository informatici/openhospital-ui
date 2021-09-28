import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/accessories/privateRoute/PrivateRoute";
import BillingActivity from "./components/activities/billingActivity/BillingActivity";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import EditPatientActivity from "./components/activities/editPatientActivity/EditPatientActivity";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "./components/activities/loginActivity/RedirectAfterLogin";
import { ManageBillActivity } from "./components/activities/manageBillActivity/ManageBillActivity";
import NewBillActivity from "./components/activities/newBillActivity/NewBillActivity";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";
import NotFound from "./components/activities/notFound/NotFound";
import PatientDetailsActivity from "./components/activities/patientDetailsActivity/PatientDetailsActivity";
import SearchPatientActivity from "./components/activities/searchPatientActivity/SearchPatientActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login">
          <RedirectAfterLogin successRoute="/">
            <LoginActivity />
          </RedirectAfterLogin>
        </Route>
        <PrivateRoute path="/billing">
          <BillingActivity />
        </PrivateRoute>
        <PrivateRoute path="/bills">
          <NewBillActivity billHomeRoute="/billing" dashboardRoute="/" />
          <ManageBillActivity />
        </PrivateRoute>
        <PrivateRoute path="/managebills">
          <ManageBillActivity />
        </PrivateRoute>
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
        <PrivateRoute path="/details/:id/edit">
          <EditPatientActivity />
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
