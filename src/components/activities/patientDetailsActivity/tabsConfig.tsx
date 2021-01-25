import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientDetailsContent from '../patientDetailsActivityContent/PatientDetailsActivityContent';

export const patientDetailTabs: TTabConfig = [
  { label: "ODP", content: <PatientDetailsContent title="ODP" content={<PatientOPD />} /> },
  { label: "Summary", content: <PatientDetailsContent title="Summary" content={<PatientSummary />} /> },
  { label: "Triage", content: <PatientDetailsContent title="Triage" content={<PatientTriage />} /> },
  { label: "Admission", content: <PatientDetailsContent title="Admission" content={<SkeletonLoader />} /> },
  { label: "Therapy", content: <PatientDetailsContent title="Therapy" content={<SkeletonLoader />} /> },
  { label: "Vaccination", content: <PatientDetailsContent title="Vaccination" content={<SkeletonLoader />} /> },
  { label: "Lab Exam", content: <PatientDetailsContent title="Lab Exam" content={<SkeletonLoader />} /> },
];

