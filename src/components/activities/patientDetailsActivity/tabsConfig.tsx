import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";
import PatientDetailsContent from '../patientDetailsActivityContent/PatientDetailsActivityContent';

export const patientDetailTabs: TTabConfig = [
  { label: "ODP", content: <PatientDetailsContent title="ODP" content="ODP" /> },
  { label: "Summary", content: <PatientDetailsContent title="Summary" content="Summary" /> },
  { label: "Triage", content: <PatientDetailsContent title="Triage" content="Triage" /> },
  { label: "Admission", content: <PatientDetailsContent title="Admission" content="Admission" /> },
  { label: "Therapy", content: <PatientDetailsContent title="Therapy" content="Therapy" /> },
  { label: "Vaccination", content: <PatientDetailsContent title="Vaccination" content="Vaccination" /> },
  { label: "Lab Exam", content: <PatientDetailsContent title="Lab Exam" content="Lab Exam" /> },
];

