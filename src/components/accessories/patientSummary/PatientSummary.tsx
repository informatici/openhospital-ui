import React, { FunctionComponent } from "react";
import { patientSummaryTabs } from "./tabsConfig";
import Tabs from "../tabs/Tabs";
import "./styles.scss";

const PatientSummary: FunctionComponent = () => {
  return (
    <div className="patientSummary">
      <Tabs config={patientSummaryTabs} />
    </div>
  );
};

export default PatientSummary;
