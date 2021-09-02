import React, { FunctionComponent } from "react";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import { sampleData } from "../consts";

interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientAdmissionTable: FunctionComponent<IOwnProps> = ({}) => {
  const { t } = useTranslation();

  const header = ["admDate", "admType"];

  const label = {
    admDate: t("admission.admDate"),
    admType: t("admission.admType"),
    diseaseIn: t("admission.diseaseIn"),
    transUnit: t("admission.transUnit"),
    ward: t("admission.ward"),
  };
  const order = ["admDate", "admType"];

  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <Table
      rowData={sampleData}
      compareRows={dateComparator}
      tableHeader={header}
      labelData={label}
      columnsOrder={order}
      rowsPerPage={5}
      onDelete={onDelete}
      isCollapsabile={true}
      onEdit={onEdit}
      onView={onEView}
    />
  );
};

export default PatientAdmissionTable;
