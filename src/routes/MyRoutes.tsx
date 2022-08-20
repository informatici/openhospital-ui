import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../components/accessories/dashboard/Dashboard";
import PrivateComponent from "../components/PrivateComponent";
import LaboratoryActivity from "../components/activities/laboratoryActivity/LaboratoryActivity";
import LoginActivity from "../components/activities/loginActivity/LoginActivity";
import { RedirectAfterLogin } from "../components/activities/loginActivity/RedirectAfterLogin";
import NotFound from "../components/activities/notFound/NotFound";
import VisitsActivity from "../components/activities/visitsActivity/VisitsActivity";
import DashboardActivity from "../components/activities/dashboardActivity/DashboardActivity";
import NewPatientActivity from "../components/activities/newPatientActivity/NewPatientActivity";
import SearchPatientActivity from "../components/activities/searchPatientActivity/SearchPatientActivity";
import EditPatientActivity from "../components/activities/editPatientActivity/EditPatientActivity";
import PatientDetailsActivity from "../components/activities/patientDetailsActivity/PatientDetailsActivity";
import PatientDetailsContent from "../components/activities/patientDetailsActivityContent/PatientDetailsActivityContent";
import PatientAdmission from "../components/accessories/admission/PatientAdmission";
import PatientExams from "../components/accessories/patientExams/PatientExams";
import PatientTherapy from "../components/accessories/patientTherapy/PatientTherapy";
import PatientTriage from "../components/accessories/patientTriage/PatientTriage";
import PatientSummary from "../components/accessories/patientSummary/PatientSummary";
import PatientOperation from "../components/accessories/patientOperation/PatientOperation";
import VisitDetailsContent from "../components/activities/patientDetailsActivityContent/VisitDetailsActivityContent";
import DischargeDetailsContent from "../components/activities/patientDetailsActivityContent/DischargeDetailsActivityContent";

export const MyRoutes: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
      <Route path="/" element={
          <RedirectAfterLogin successRoute="/patients">
            <LoginActivity />
          </RedirectAfterLogin> } 
        /> 
        <Route path="/login" element={
          <RedirectAfterLogin successRoute="/patients">
            <LoginActivity />
          </RedirectAfterLogin> } 
        /> 
        
        <Route path="/*" element={<PrivateComponent />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="visits" element={<VisitsActivity />} />
          <Route path="laboratory" element={<LaboratoryActivity />} />
        </Route>

        <Route path="patients/*" element={<PrivateComponent />}>
          <Route path="*" element={<DashboardActivity
                  newPatientRoute="{`new`}"
                  searchPatientRoute={`search`}
                />} />
          <Route path="new" element={<NewPatientActivity dashboardRoute="patients" />} />
          <Route path="search" element={<SearchPatientActivity />} />
          <Route path="edit" element={<EditPatientActivity />} />
          <Route path="details/:id/*" element={<PatientDetailsActivity />}>
          <Route path="*" element={<PatientDetailsContent
                  title="Admissions"
                  content={PatientAdmission}
                />} />
            <Route path="admissions" element={<PatientDetailsContent
                        title="Admissions"
                        content={PatientAdmission} /> } />
            <Route path="visits" element={<VisitDetailsContent /> } />
            <Route path="laboratory" element={<PatientDetailsContent
                        title="Laboratory"
                        content={PatientExams} />} />
            <Route path="therapy" element={<PatientDetailsContent
                        title="Therapy"
                        content={PatientTherapy} />} />
            <Route path="triage" element={<PatientDetailsContent
                          title="Triage"
                          content={PatientTriage} />} />
            <Route path="discharge" element={<DischargeDetailsContent /> } />
            <Route path="clinic" element={<PatientDetailsContent
                          title="Summary"
                          content={PatientSummary} />} />
            <Route path="operation" element={<PatientDetailsContent
                            title="Operation"
                            content={PatientOperation} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
