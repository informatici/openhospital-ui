import React, { FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute";
import EditPatientActivity from "../../components/activities/editPatientActivity/EditPatientActivity";
import PatientDetailsActivity from "../../components/activities/patientDetailsActivity/PatientDetailsActivity";

export const PatientDetailsRoutes: FC = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route
          path={`${pathname}/edit`}
          element={
            <PrivateRoute>
              <EditPatientActivity />
            </PrivateRoute>
          }
        />
      <Route
          path={pathname}
          element={
            <PrivateRoute>
              <PatientDetailsActivity />
            </PrivateRoute>
          }
        />
    </Routes>
  );
};
