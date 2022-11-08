import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PatientAdmission from "../../components/accessories/admission/PatientAdmission";
import PatientExams from "../../components/accessories/patientExams/PatientExams";
import PatientOperation from "../../components/accessories/patientOperation/PatientOperation";
import PatientSummary from "../../components/accessories/patientSummary/PatientSummary";
import PatientTherapy from "../../components/accessories/patientTherapy/PatientTherapy";
import PatientTriage from "../../components/accessories/patientTriage/PatientTriage";
import NotFound from "../../components/activities/notFound/NotFound";
import PatientDetailsActivity from "../../components/activities/patientDetailsActivity/PatientDetailsActivity";
import DischargeDetailsContent from "../../components/activities/patientDetailsActivityContent/DischargeDetailsActivityContent";
import PatientDetailsContent from "../../components/activities/patientDetailsActivityContent/PatientDetailsActivityContent";
import VisitDetailsContent from "../../components/activities/patientDetailsActivityContent/VisitDetailsActivityContent";

export const PatientDetailsRoutes: FC = () => (
  <Routes>
    <Route element={<PatientDetailsActivity />}>
      <Route index element={<Navigate to="admissions" replace />} />
      <Route
        path="admissions"
        element={
          <PatientDetailsContent
            title="Admissions"
            content={PatientAdmission}
          />
        }
      />
      <Route path="visits" element={<VisitDetailsContent />} />
      <Route
        path="laboratory"
        element={
          <PatientDetailsContent title="Laboratory" content={PatientExams} />
        }
      />
      <Route
        path="therapy"
        element={
          <PatientDetailsContent title="Therapy" content={PatientTherapy} />
        }
      />
      <Route
        path="triage"
        element={
          <PatientDetailsContent title="Triage" content={PatientTriage} />
        }
      />
      <Route path="discharge" element={<DischargeDetailsContent />} />
      <Route
        path="clinic"
        element={
          <PatientDetailsContent title="Summary" content={PatientSummary} />
        }
      />
      <Route
        path="operation"
        element={
          <PatientDetailsContent title="Operation" content={PatientOperation} />
        }
      />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
