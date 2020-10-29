import React from "react";
import { TTabConfig } from "../../accessories/tabs/types";

export const patientDetailTabs: TTabConfig = [
  { label: "Summary", content: <div className="patientDetils__content__body_header">Summary</div> },
  { label: "Triage", content: <div className="patientDetils__content__body_header">Triage</div> },
  { label: "Admission", content: <div className="patientDetils__content__body_header">Admission</div> },
  { label: "Therapy", content: <div className="patientDetils__content__body_header">Therapy</div> },
  { label: "Vaccination", content: <div className="patientDetils__content__body_header">Vaccination</div> },
  { label: "Lab Exam", content: <div className="patientDetils__content__body_header">Lab Exam</div> },
  { label: "OPD", content: <div className="patientDetils__content__body_header">OPD</div> },
];

