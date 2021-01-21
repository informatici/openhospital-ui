import React, { FunctionComponent } from 'react';
import Table from "../../table/Table";

const values = [
  { date: "21/12/2021", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2021", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2018", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2018", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2019", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2019", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2019", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 }
];

const header = ["date"];
const search = ["date"];

const PatientTriageTable: FunctionComponent = () => {

  const onEdit = () => {
    console.log('edit');
  }

  const onDelete = () => {
    console.log('delete');
  }

  const onPrint = () => {
    console.log('print');
  }

  return (
    <>
      <div className="patientTriageTable">
        <Table
          tableValues={values}
          tableHeader={header}
          columnsSearch={search}
          rowsPerPage={5}
          onEdit={onEdit}
          onDelete={onDelete}
          onPrint={onPrint}
        />
      </div>
    </>
  );
}

export default PatientTriageTable;