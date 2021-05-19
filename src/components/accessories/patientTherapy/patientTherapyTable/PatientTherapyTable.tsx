import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Table from "../../table/Table";
import { data, header, order } from "./consts";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const [, setUpdate] = useState(false);
  const { t } = useTranslation();

  const label = {
    SD: t("therapy.startdate"),
    ED: t("therapy.enddate"),
    medical: t("therapy.medical"),
    Qty: t("therapy.quantity"),
    FID: t("therapy.frequencyInDay"),
    D: t("therapy.duration"),
    FIP: t("therapy.frequencyInPeriod"),
  };

  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {
    console.log("view");
  };

  useEffect(() => {
    setUpdate(shouldUpdateTable);
  }, [shouldUpdateTable]);

  return (
    <>
      <div className="patientTherapyTable">
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          onDelete={onDelete}
          isCollapsabile={true}
          onEdit={onEdit}
          onView={onEView}
        />
      </div>
    </>
  );
};

export default PatientTherapyTable;
