import React, { FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateComponent from "../../components/PrivateComponent";
import EditPatientActivity from "../../components/activities/editPatientActivity/EditPatientActivity";
import PatientDetailsActivity from "../../components/activities/patientDetailsActivity/PatientDetailsActivity";

export const PatientDetailsRoutes: FC = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/*" element={<PrivateComponent />}>
        <Route
            path={`${pathname}/edit`}
            element={
                <EditPatientActivity />
            }
          />
        <Route
            path={pathname}
            element={
                <PatientDetailsActivity />
            }
          />
      </Route>
    </Routes>
  );
};
