import React, { FunctionComponent } from "react";
import Tabs from "../tabs/Tabs";
import "./styles.scss";
import { patientSummaryTabs } from "./tabsConfig";

const PatientSummary: FunctionComponent = () => {
  return (
    <div className="patientSummary">
      <Tabs config={patientSummaryTabs} />
    </div>
  );
};

export default PatientSummary;
