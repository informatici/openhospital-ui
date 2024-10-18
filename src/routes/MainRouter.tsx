import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../components/accessories/dashboard/Dashboard";
import ForgotActivity from "../components/activities/forgotActivity/ForgotActivity";
import LaboratoryActivity from "../components/activities/laboratoryActivity/LaboratoryActivity";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import NotFound from "../components/activities/notFound/NotFound";
import PermissionDenied from "../components/activities/PermissionDenied/PermissionDenied";
import VisitsActivity from "../components/activities/visitsActivity/VisitsActivity";
import { Private } from "../components/Private";
import { PATHS } from "../consts";
import { withPermission } from "../libraries/permissionUtils/withPermission";
import { getUserSettings } from "../state/main";
import { AdminRoutes } from "./Admin";
import { PatientsRoutes } from "./Patients/PatientsRoutes";

export const MainRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.main.authentication.status!);
  useEffect(() => {
    if (status === "SUCCESS") {
      dispatch(getUserSettings());
    }
  }, [dispatch, status]);

  const RequiredAdminAccess = withPermission(
    "admin.access",
    PermissionDenied
  )(AdminRoutes);

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
          <Route path={`${PATHS.admin}/*`} element={<RequiredAdminAccess />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
