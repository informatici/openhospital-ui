import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientDetailsContent from '../patientDetailsActivityContent/PatientDetailsActivityContent';

export const patientDetailTabs: TTabConfig = [
  { label: "Summary", content: <PatientDetailsContent title="Summary" content={<PatientSummary />} /> },
  { label: "OPD", content: <PatientDetailsContent title="OPD" content={<PatientOPD />} /> },
  { label: "Triage", content: <PatientDetailsContent title="Triage" content={<PatientTriage />} /> },
  { label: "Therapy", content: <PatientDetailsContent title="Therapy" content={<SkeletonLoader />} /> },
  { label: "Booking", content: <PatientDetailsContent title="Booking" content={<SkeletonLoader />} /> },
];

