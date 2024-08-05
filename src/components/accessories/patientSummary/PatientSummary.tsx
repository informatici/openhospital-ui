import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "libraries/hooks/redux";
import { getMedicals } from "../../../state/medicals";
import { PatientExtraData } from "../patientExtraData/patientExtraData";
import Tabs from "../tabs/Tabs";
import { TTabConfig } from "../tabs/types";
import PatientSummaryByDate from "./patientSummaryByDate/PatientSummaryByDate";
import PatientSummaryByType from "./patientSummaryByType/PatientSummaryByType";
import "./styles.scss";

const PatientSummary: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  const patientSummaryTabs: TTabConfig = [
    { label: t("common.orderbydate"), content: <PatientSummaryByDate /> },
    { label: t("common.orderbytype"), content: <PatientSummaryByType /> },
  ];

  return (
    <div className="patientSummary">
      <PatientExtraData readOnly={true} />
      <Tabs config={patientSummaryTabs} />
    </div>
  );
};

export default PatientSummary;
