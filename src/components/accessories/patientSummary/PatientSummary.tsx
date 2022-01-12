import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetMedicalsUsingGETSortByEnum } from "../../../generated";
import { getMedicals } from "../../../state/medicals/actions";
import Tabs from "../tabs/Tabs";
import "./styles.scss";
import { patientSummaryTabs } from "./tabsConfig";

const PatientSummary: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMedicals(GetMedicalsUsingGETSortByEnum.NAME));
  }, [dispatch]);

  return (
    <div className="patientSummary">
      <Tabs config={patientSummaryTabs} />
    </div>
  );
};

export default PatientSummary;
