import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "../components/accessories/dashboard/Dashboard";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import NotFound from "../components/activities/notFound/NotFound";
import { Private } from "../components/Private";
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
            <RedirectAfterLogin successRoute="/dashboard">
              <LoginActivity />
            </RedirectAfterLogin>
          }
        />

        <Route element={<Private />}>
          <Route path={`${PATHS.dashboard}`} element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
