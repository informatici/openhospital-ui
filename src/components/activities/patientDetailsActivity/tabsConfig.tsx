import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientDetailsContent from '../patientDetailsActivityContent/PatientDetailsActivityContent';

export const patientDetailTabs: TTabConfig = [
  { label: "Summary", path:"/summary", content: <PatientDetailsContent title="Summary" content={<PatientSummary />} /> },
  { label: "OPD", path:"/OPD", content: <PatientDetailsContent title="OPD" content={<PatientOPD />} /> },
  { label: "Triage", path:"/triage", content: <PatientDetailsContent title="Triage" content={<PatientTriage />} /> },
  { label: "Therapy", path:"/therapy", content: <PatientDetailsContent title="Therapy" content={<SkeletonLoader />} /> },
  { label: "Booking", path:"/booking", content: <PatientDetailsContent title="Booking" content={<SkeletonLoader />} /> },
];

