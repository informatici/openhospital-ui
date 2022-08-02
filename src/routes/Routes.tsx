import React, { FC } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Dashboard } from "../components/accessories/dashboard/Dashboard";
import PrivateRoute from "../components/accessories/privateRoute/PrivateRoute";
import LaboratoryActivity from "../components/activities/laboratoryActivity/LaboratoryActivity";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import NotFound from "../components/activities/notFound/NotFound";
import VisitsActivity from "../components/activities/visitsActivity/VisitsActivity";
import { PatientsRoutes } from "./Patients";

export const Routes: FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/login">
          <RedirectAfterLogin successRoute="/dashboard">
            <LoginActivity />
          </RedirectAfterLogin>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <PrivateRoute exact path="/">
          <Redirect to="/dashboard" />
        </PrivateRoute>
        <PrivateRoute path="/patients">
          <PatientsRoutes />
        </PrivateRoute>
        <PrivateRoute path="/visits">
          <VisitsActivity />
        </PrivateRoute>
        <PrivateRoute path="/laboratory">
          <LaboratoryActivity />
        </PrivateRoute>
        <PrivateRoute>
          <NotFound />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};
