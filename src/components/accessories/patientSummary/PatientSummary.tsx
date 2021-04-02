import React, { FunctionComponent } from "react";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
import { PermissionDenied } from "../permissionDenied/PermissionDenied";
import Tabs from "../tabs/Tabs";
import "./styles.scss";
import { patientSummaryTabs } from "./tabsConfig";

const PatientSummary: FunctionComponent = () => {
  const canRead = usePermission("summary.read");

  return canRead ? (
    <div className="patientSummary">
      <Tabs config={patientSummaryTabs} />
    </div>
  ) : (
    <PermissionDenied />
  );
};

export default PatientSummary;
