import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "../components/accessories/dashboard/Dashboard";
import LaboratoryActivity from "../components/activities/laboratoryActivity/LaboratoryActivity";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import NotFound from "../components/activities/notFound/NotFound";
import VisitsActivity from "../components/activities/visitsActivity/VisitsActivity";
import { Private } from "../components/Private";
import { PatientsRoutes } from "./Patients/PatientsRoutes";
import { PATHS } from "../consts";

export const MainRouter: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* TODO: based on user profile, redirect to patient, dashboard or whatever */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route
          path="login"
          element={
            <RedirectAfterLogin successRoute="/patients">
              <LoginActivity />
            </RedirectAfterLogin>
          }
        />

        <Route element={<Private />}>
          <Route path={`${PATHS.dashboard}`} element={<Dashboard />} />
          <Route path={`${PATHS.visits}`} element={<VisitsActivity />} />
          <Route
            path={`${PATHS.laboratory}/*`}
            element={<LaboratoryActivity />}
          />
          <Route path={`${PATHS.patients}/*`} element={<PatientsRoutes />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
