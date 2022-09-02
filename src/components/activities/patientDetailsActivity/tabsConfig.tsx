import React from "react";
import PatientBooking from "../../accessories/patientBooking/PatientBooking";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientTherapy from "../../accessories/patientTherapy/PatientTherapy";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import { TTabConfig } from "../../accessories/tabs/types";
import PatientDetailsContent from "../patientDetailsActivityContent/PatientDetailsActivityContent";

export const patientDetailTabs: TTabConfig = [
  {
    label: "Summary",
    path: "/summary",
    content: <PatientDetailsContent title="Summary" content={PatientSummary} />,
  },
  {
    label: "OPD",
    path: "/OPD",
    content: <PatientDetailsContent title="OPD" content={PatientOPD} />,
  },
  {
    label: "Triage",
    path: "/triage",
    content: <PatientDetailsContent title="Triage" content={PatientTriage} />,
  },
  {
    label: "Therapy",
    path: "/therapy",
    content: <PatientDetailsContent title="Therapy" content={PatientTherapy} />,
  },
  {
    label: "Booking",
    path: "/booking",
    content: <PatientDetailsContent title="Booking" content={PatientBooking} />,
  },
];
