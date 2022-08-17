import React, { FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute";
import DashboardActivity from "../../components/activities/dashboardActivity/DashboardActivity";
import NewPatientActivity from "../../components/activities/newPatientActivity/NewPatientActivity";
import NotFound from "../../components/activities/notFound/NotFound";
import SearchPatientActivity from "../../components/activities/searchPatientActivity/SearchPatientActivity";
import { PatientDetailsRoutes } from "./PatientsDetailsRoutes";

export const PatientsRoutes: FC = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Routes>
      <Route
          path={pathname}
          element={
            <PrivateRoute>
              <DashboardActivity
                newPatientRoute={`${pathname}/new`}
                searchPatientRoute={`${pathname}/search`}
              />
            </PrivateRoute>
          }
        />
      <Route
          path={`${pathname}/new`}
          element={
            <PrivateRoute>
              <NewPatientActivity dashboardRoute={pathname} />
            </PrivateRoute>
          }
        />
      <Route
          path={`${pathname}/search`}
          element={
            <PrivateRoute>
              <SearchPatientActivity />
            </PrivateRoute>
          }
        />
      <Route
          path={`${pathname}/details/:id`}
          element={
            <PrivateRoute>
              <PatientDetailsRoutes />
            </PrivateRoute>
          }
        />
      <Route
          element={
            <PrivateRoute>
              <NotFound backRoute={pathname} />
            </PrivateRoute>
          }
        />
    </Routes>
  );
};
