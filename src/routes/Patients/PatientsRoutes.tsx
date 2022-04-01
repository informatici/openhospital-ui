import React, { FC } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../components/accessories/privateRoute/PrivateRoute";
import DashboardActivity from "../../components/activities/dashboardActivity/DashboardActivity";
import NewPatientActivity from "../../components/activities/newPatientActivity/NewPatientActivity";
import NotFound from "../../components/activities/notFound/NotFound";
import SearchPatientActivity from "../../components/activities/searchPatientActivity/SearchPatientActivity";
import { PatientDetailsRoutes } from "./PatientsDetailsRoutes";

export const PatientsRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute exact path={path}>
        <DashboardActivity
          newPatientRoute={`${path}/new`}
          searchPatientRoute={`${path}/search`}
        />
      </PrivateRoute>
      <PrivateRoute path={`${path}/new`}>
        <NewPatientActivity dashboardRoute={path} />
      </PrivateRoute>
      <PrivateRoute path={`${path}/search`}>
        <SearchPatientActivity />
      </PrivateRoute>
      <PrivateRoute path={`${path}/details/:id`}>
        <PatientDetailsRoutes />
      </PrivateRoute>
      <PrivateRoute>
        <NotFound backRoute={path} />
      </PrivateRoute>
    </Switch>
  );
};
