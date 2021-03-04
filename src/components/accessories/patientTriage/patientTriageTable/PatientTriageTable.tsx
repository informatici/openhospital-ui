import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Table from "../../table/Table";
import { data, header, order } from "./consts";

const PatientTriageTable: FunctionComponent = () => {
  const { t } = useTranslation();

  const label = {
    date: "Date",
    H: t("examination.height"),
    W: t("examination.weight"),
    AP: "Arterial pressure",
    HR: t("examination.heartrate"),
    T: t("examination.temperature"),
    O2: t("examination.saturation"),
    HGT: t("examination.hgt"),
    RR: t("examination.respiratoryrate"),
    D24G: t("examination.diuresisvolume24h"),
    D: "Diuresis",
    B: "Bowel",
    AUSC: "Auscultation",
  };

  const onDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <div className="patientTriageTable">
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          onDelete={onDelete}
          isCollapsabile={true}
        />
      </div>
    </>
  );
};

export default PatientTriageTable;
