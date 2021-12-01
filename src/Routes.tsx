import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/accessories/privateRoute/PrivateRoute";
import DashboardActivity from "./components/activities/dashboardActivity/DashboardActivity";
import EditPatientActivity from "./components/activities/editPatientActivity/EditPatientActivity";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "./components/activities/loginActivity/RedirectAfterLogin";
import NewPatientActivity from "./components/activities/newPatientActivity/NewPatientActivity";
import NotFound from "./components/activities/notFound/NotFound";
import PatientDetailsActivity from "./components/activities/patientDetailsActivity/PatientDetailsActivity";
import SearchPatientActivity from "./components/activities/searchPatientActivity/SearchPatientActivity";
import NewMedicalActivity from "./components/activities/newMedicalActivity/NewMedicalActivity";
import MedicalsActivity from "./components/activities/MedicalsActivity/MedicalsActivity";
import EditMedicalActivity from "./components/activities/editMedicalActivity/EditMedicalActivity";

const Routes: FunctionComponent = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login">
          <RedirectAfterLogin successRoute="/">
            <LoginActivity />
          </RedirectAfterLogin>
        </Route>
        <PrivateRoute exact path="/">
          <DashboardActivity
            newPatientRoute="/new"
            searchPatientRoute="/search"
            newMedicalRoute="/newMedical"
            medicalsRoute="/Medicals"
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
        <PrivateRoute path="/newMedical">
          <NewMedicalActivity />
        </PrivateRoute>
        <PrivateRoute path="/Medicals">
          <MedicalsActivity />
        </PrivateRoute>
        <PrivateRoute path="/editMedical/:code">
          <EditMedicalActivity />
        </PrivateRoute>
        <PrivateRoute>
          <NotFound />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
