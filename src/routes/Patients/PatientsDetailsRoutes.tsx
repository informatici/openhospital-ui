import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
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

export const PatientDetailsRoutes: FC = () => {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route element={<PatientDetailsActivity />}>
        <Route index element={<Navigate to="admissions" replace />} />
        <Route
          path="admissions"
          element={
            <PatientDetailsContent
              title={t("patient.admissions")}
              content={PatientAdmission}
            />
          }
        />
        <Route path="visits" element={<VisitDetailsContent />} />
        <Route
          path="laboratory"
          element={
            <PatientDetailsContent
              title={t("patient.laboratory")}
              content={PatientExams}
            />
          }
        />
        {false && (
          <Route
            path="therapy"
            element={
              <PatientDetailsContent
                title={t("patient.therapy")}
                content={PatientTherapy}
              />
            }
          />
        )}
        <Route
          path="triage"
          element={
            <PatientDetailsContent
              title={t("patient.triage")}
              content={PatientTriage}
            />
          }
        />
        <Route path="discharge" element={<DischargeDetailsContent />} />
        <Route
          path="clinic"
          element={
            <PatientDetailsContent
              title={t("patient.summary")}
              content={PatientSummary}
            />
          }
        />
        <Route
          path="operation"
          element={
            <PatientDetailsContent
              title={t("patient.operation")}
              content={PatientOperation}
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
