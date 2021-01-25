import React, { FunctionComponent } from 'react';
import { patientSummaryTabs } from "./tabsConfig";
import Tabs from '../tabs/Tabs';

const PatientSummary: FunctionComponent = () => {

  return (
    <div className="patientSummary">
      <Tabs config={patientSummaryTabs} />
    </div>
  );
}

export default PatientSummary;