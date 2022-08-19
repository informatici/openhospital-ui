import React, { FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateComponent from "../../components/PrivateComponent";
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
                <DashboardActivity
                  newPatientRoute={`${pathname}/new`}
                  searchPatientRoute={`${pathname}/search`}
                />
            }
          />
        <Route
            path={`${pathname}/new`}
            element={
                <NewPatientActivity dashboardRoute={pathname} />
            }
          />
        <Route
            path={`${pathname}/search`}
            element={
                <SearchPatientActivity />
            }
          />
        <Route
            path={`${pathname}/details/:id`}
            element={
                <PatientDetailsRoutes />
            }
          />
        <Route
            element={
                <NotFound backRoute={pathname} />
            }
          />
    </Routes>
  );
};
