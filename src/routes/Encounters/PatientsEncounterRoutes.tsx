import Conditioning from "components/accessories/conditioning/Conditioning";
import MedicalHistory from "components/accessories/medicalhistory/MedicalHistory";
import { Radiology, Series, Studies } from "components/accessories/radiology";
import PermissionDenied from "components/activities/PermissionDenied/PermissionDenied";
import DischargeDetailsActivityContent from "components/activities/patientDetailsActivityContent/DischargeDetailsActivityContent";
import VisitDetailsActivityContent from "components/activities/patientDetailsActivityContent/VisitDetailsActivityContent";
import { PatientEncounterActivityContent } from "components/activities/patientEncounterActivity";
import PatientEncounterActivity from "components/activities/patientEncounterActivity/PatientEncounterActivity";
import { withPermission } from "libraries/permissionUtils/withPermission";
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

export const PatientsEncounterRoutes: FC = () => {
  const { t } = useTranslation();

  const RadiologyRoutes = withPermission(
    "radiology.read",
    PermissionDenied
  )(() => (
    <Routes>
      <Route
        element={
          <PatientEncounterActivityContent
            title={t("patient.radiology")}
            content={Radiology}
          />
        }
      >
        <Route path="" element={<Navigate to="studies" />} />
        <Route path="studies" element={<Studies />} />
        <Route path="studies/:id/series" element={<Series />} />
        <Route
          path="studies/:id/series/:serie_id/instances"
          element={<h1>Serie Instances</h1>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  ));

  return (
    <Routes>
      <Route element={<PatientEncounterActivity />}>
        <Route index element={<Navigate to={"admissions"} replace={true} />} />
        <Route
          path="conditioning"
          element={
            <PatientEncounterActivityContent
              title={t("patient.conditioning")}
              content={Conditioning}
            />
          }
        />
        <Route
          path="medical-history"
          element={
            <PatientEncounterActivityContent
              title={t("patient.medicalHistory")}
              content={MedicalHistory}
            />
          }
        />
        <Route
          path="admissions"
          element={
            <PatientEncounterActivityContent
              title={t("patient.admissions")}
              content={PatientAdmission}
            />
          }
        />
        <Route path="visits" element={<VisitDetailsActivityContent />} />
        <Route
          path="laboratory"
          element={
            <PatientEncounterActivityContent
              title={t("patient.laboratory")}
              content={PatientExams}
            />
          }
        />
        {false && (
          <Route
            path="therapy"
            element={
              <PatientEncounterActivityContent
                title={t("patient.therapy")}
                content={PatientTherapy}
              />
            }
          />
        )}
        <Route
          path="triage"
          element={
            <PatientEncounterActivityContent
              title={t("patient.triage")}
              content={PatientTriage}
            />
          }
        />
        <Route path="discharge" element={<DischargeDetailsActivityContent />} />
        <Route
          path="clinic"
          element={
            <PatientEncounterActivityContent
              title={t("patient.summary")}
              content={PatientSummary}
            />
          }
        />
        <Route
          path="operation"
          element={
            <PatientEncounterActivityContent
              title={t("patient.operation")}
              content={PatientOperation}
            />
          }
        />
        <Route path="radiology/*" element={<RadiologyRoutes />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
