import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/accessories/privateRoute/PrivateRoute";
import BillingActivity from "./components/activities/billingActivity/BillingActivity";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import EditPatientActivity from "./components/activities/editPatientActivity/EditPatientActivity";
import LaboratoryActivity from "./components/activities/laboratoryActivity/LabotatoryActivity";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "./components/activities/loginActivity/RedirectAfterLogin";
import NewBillingActivity from "./components/activities/newBillingActivity/NewBillingActivity";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";
import NotFound from "./components/activities/notFound/NotFound";
import PatientDetailsActivity from "./components/activities/patientDetailsActivity/PatientDetailsActivity";
import SearchPatientActivity from "./components/activities/searchPatientActivity/SearchPatientActivity";
import VisitsActivity from "./components/activities/visitsActivity/VisitsActivity";
import { PATHS } from "./consts";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path={PATHS.login}>
          <RedirectAfterLogin successRoute={PATHS.home}>
            <LoginActivity />
          </RedirectAfterLogin>
        </Route>
        <PrivateRoute path={PATHS.visits}>
          <VisitsActivity />
        </PrivateRoute>
        <PrivateRoute path={PATHS.laboratory}>
          <LaboratoryActivity />
        </PrivateRoute>
        <PrivateRoute exact path={PATHS.home}>
          <DashboardActivity
            newPatientRoute={PATHS.patients_new}
            searchPatientRoute={PATHS.patients_search}
          />
        </PrivateRoute>
        <PrivateRoute exact path={PATHS.patients}>
          <DashboardActivity
            newPatientRoute={PATHS.patients_new}
            searchPatientRoute={PATHS.patients_search}
          />
        </PrivateRoute>
        <PrivateRoute path={PATHS.patients_new}>
          <NewPatientActivity dashboardRoute={PATHS.patients} />
        </PrivateRoute>
        <PrivateRoute path={PATHS.patients_search}>
          <SearchPatientActivity />
        </PrivateRoute>
        <PrivateRoute path={PATHS.patients_details_edit}>
          <EditPatientActivity />
        </PrivateRoute>
        <PrivateRoute path={PATHS.patients_details_id}>
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
