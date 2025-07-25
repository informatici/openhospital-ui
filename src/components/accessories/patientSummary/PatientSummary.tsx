import { Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch } from "libraries/hooks/redux";
import { printSubject } from "libraries/printUtilis/printUtils";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const handlePrint = () => {
    printSubject.next();
    console.log("printin ..");
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <div className="patientSummary">
      <Button
        startIcon={<Print />}
        type="button"
        onClick={handlePrint}
        variant="contained"
      >
        {t("common.print_data")}
      </Button>
      <PatientExtraData readOnly={true} />
      <Tabs config={patientSummaryTabs} />
    </div>
  );
};

export default PatientSummary;
