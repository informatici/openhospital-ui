import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "../components/accessories/dashboard/Dashboard";
import LaboratoryActivity from "../components/activities/laboratoryActivity/LaboratoryActivity";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import ForgotActivity from "../components/activities/forgotActivity/ForgotActivity";
import NotFound from "../components/activities/notFound/NotFound";
import VisitsActivity from "../components/activities/visitsActivity/VisitsActivity";
import { Private } from "../components/Private";
import { PatientsRoutes } from "./Patients/PatientsRoutes";
import { PATHS } from "../consts";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../types";
import { TAPIResponseStatus } from "../state/types";
import { getUserSettings } from "../state/main/actions";
import { AdminRoutes } from "./Admin";

export const MainRouter: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.main.authentication.status!
  );
  useEffect(() => {
    if (status === "SUCCESS") {
      dispatch(getUserSettings());
    }
  }, [status]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* TODO: based on user profile, redirect to patient, dashboard or whatever */}
        <Route index element={<Navigate to="/patients" replace />} />

        <Route
          path="login"
          element={
            <RedirectAfterLogin>
              <LoginActivity />
            </RedirectAfterLogin>
          }
        />
        <Route path="forgot" element={<ForgotActivity />} />

        <Route element={<Private />}>
          <Route path={`${PATHS.dashboard}`} element={<Dashboard />} />
          <Route path={`${PATHS.visits}`} element={<VisitsActivity />} />
          <Route
            path={`${PATHS.laboratory}/*`}
            element={<LaboratoryActivity />}
          />
          <Route path={`${PATHS.patients}/*`} element={<PatientsRoutes />} />
          <Route path={`${PATHS.admin}/*`} element={<AdminRoutes />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
