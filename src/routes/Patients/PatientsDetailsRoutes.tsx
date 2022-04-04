import React, { FC } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../components/accessories/privateRoute/PrivateRoute";
import EditPatientActivity from "../../components/activities/editPatientActivity/EditPatientActivity";
import PatientDetailsActivity from "../../components/activities/patientDetailsActivity/PatientDetailsActivity";

export const PatientDetailsRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute exact path={`${path}/edit`}>
        <EditPatientActivity />
      </PrivateRoute>
      <PrivateRoute path={path}>
        <PatientDetailsActivity />
      </PrivateRoute>
    </Switch>
  );
};
