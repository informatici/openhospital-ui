import React, { FunctionComponent } from 'react';
import Table from "../../table/Table";
import { data, header, label, order } from './consts';

const PatientTriageTable: FunctionComponent = () => {

  const onDelete = () => {
    console.log('delete');
  }

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
}

export default PatientTriageTable;