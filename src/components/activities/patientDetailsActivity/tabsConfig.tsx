import React from "react";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import { TTabConfig } from "../../accessories/tabs/types";
import PatientDetailsContent from "../patientDetailsActivityContent/PatientDetailsActivityContent";

export const patientDetailTabs: TTabConfig = [
  {
    checkPermissions: "summary.read",
    label: "Summary",
    path: "/summary",
    content: <PatientDetailsContent title="Summary" content={PatientSummary} />,
  },
  {
    checkPermissions: "odp.read",
    label: "OPD",
    path: "/OPD",
    content: <PatientDetailsContent title="OPD" content={PatientOPD} />,
  },
  {
    checkPermissions: "examination.read",
    label: "Triage",
    path: "/triage",
    content: <PatientDetailsContent title="Triage" content={PatientTriage} />,
  },
  {
    label: "Therapy",
    path: "/therapy",
    content: <PatientDetailsContent title="Therapy" content={SkeletonLoader} />,
  },
  {
    label: "Booking",
    path: "/booking",
    content: <PatientDetailsContent title="Booking" content={SkeletonLoader} />,
  },
];
