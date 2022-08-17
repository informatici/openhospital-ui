import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../components/accessories/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import LaboratoryActivity from "../components/activities/laboratoryActivity/LaboratoryActivity";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import NotFound from "../components/activities/notFound/NotFound";
import VisitsActivity from "../components/activities/visitsActivity/VisitsActivity";
import { PatientsRoutes } from "./Patients";

export const MyRoutes: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/login" element={
          <RedirectAfterLogin successRoute="/patients">
            <LoginActivity />
          </RedirectAfterLogin>
          } 
        /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/*"
          element={
            <PrivateRoute>
              <PatientsRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/visits"
          element={
            <PrivateRoute>
              <VisitsActivity />
            </PrivateRoute>
          }
        />
        <Route
          path="/laboratory"
          element={
            <PrivateRoute>
              <LaboratoryActivity />
            </PrivateRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
