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
    SD: "Start date",
    ED: "End date",
    medical: t("Medical"),
    Qty: t("Quantity"),
    FID: "Frequence In Day",
    D: t("Duration"),
    FIP: t("Frequence In Period")
  };

  const onDelete = () => {
    console.log("delete");
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
        />
      </div>
    </>
  );
};

export default PatientTherapyTable;
