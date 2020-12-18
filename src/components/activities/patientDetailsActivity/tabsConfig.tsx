import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import PatientDetailsContent from '../patientDetailsActivityContent/PatientDetailsActivityContent';

export const patientDetailTabs: TTabConfig = [
  { label: "ODP", content: <PatientDetailsContent title="ODP" content={<SkeletonLoader />} /> },
  { label: "Summary", content: <PatientDetailsContent title="Summary" content={<SkeletonLoader />} /> },
  { label: "Triage", content: <PatientDetailsContent title="Triage" content={<SkeletonLoader />} /> },
  { label: "Admission", content: <PatientDetailsContent title="Admission" content={<SkeletonLoader />} /> },
  { label: "Therapy", content: <PatientDetailsContent title="Therapy" content={<SkeletonLoader />} /> },
  { label: "Vaccination", content: <PatientDetailsContent title="Vaccination" content={<SkeletonLoader />} /> },
  { label: "Lab Exam", content: <PatientDetailsContent title="Lab Exam" content={<SkeletonLoader />} /> },
];

