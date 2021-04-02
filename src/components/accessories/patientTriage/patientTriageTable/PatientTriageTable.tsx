import React, { FunctionComponent, useEffect, useState } from "react";
import Table from "../../table/Table";
import { data, header, label, order } from "./consts";

interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientTriageTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const [, setUpdate] = useState(false);

  const onDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    setUpdate(shouldUpdateTable);
  }, [shouldUpdateTable]);

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
