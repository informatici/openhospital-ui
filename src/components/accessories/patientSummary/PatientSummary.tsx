import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMedicals } from "../../../state/medicals/actions";
import { PatientExtraData } from "../patientExtraData/patientExtraData";
import Tabs from "../tabs/Tabs";
import "./styles.scss";
import { patientSummaryTabs } from "./tabsConfig";

const PatientSummary: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  return (
    <div className="patientSummary">
      <PatientExtraData />
      <Tabs config={patientSummaryTabs} />
    </div>
  );
};

export default PatientSummary;
