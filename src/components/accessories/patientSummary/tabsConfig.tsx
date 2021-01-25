import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";
import PatientSummaryByType from "./patientSummaryByType/PatientSummaryByType";
import PatientSummaryByDate from "./patientSummaryByDate/PatientSummaryByDate";

export const patientSummaryTabs: TTabConfig = [
  { label: "Order by date", content: <PatientSummaryByDate /> },
  { label: "Order by type", content: <PatientSummaryByType /> }
];

