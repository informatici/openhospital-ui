import React, { FC } from "react";
import { Route, Routes } from "react-router";
import DashboardActivity from "../../components/activities/dashboardActivity/DashboardActivity";
import EditPatientActivity from "../../components/activities/editPatientActivity/EditPatientActivity";
import NewPatientActivity from "../../components/activities/newPatientActivity/NewPatientActivity";
import NotFound from "../../components/activities/notFound/NotFound";
import SearchPatientActivity from "../../components/activities/searchPatientActivity/SearchPatientActivity";
import { PATHS } from "../../consts";
import { PatientDetailsRoutes } from "./PatientsDetailsRoutes";

export const PatientsRoutes: FC = () => (
  <Routes>
    <Route
      index
      element={
        <DashboardActivity
          newPatientRoute={PATHS.patients_new}
          searchPatientRoute={PATHS.patients_search}
        />
      }
    />
    <Route
      path="new"
      element={<NewPatientActivity dashboardRoute={PATHS.patients} />}
    />
    <Route path="search" element={<SearchPatientActivity />} />
    <Route path="details/:id/*" element={<PatientDetailsRoutes />} />
    <Route path="details/:id/edit" element={<EditPatientActivity />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
