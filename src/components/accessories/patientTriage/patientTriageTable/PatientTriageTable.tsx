import React, { FunctionComponent } from 'react';
import Table from "../../table/Table";

const data = [
  { date: "21/12/2021", H: 150, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 151, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2021", H: 152, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 153, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2018", H: 154, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2018", H: 155, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 156, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2019", H: 157, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2019", H: 158, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2019", H: 159, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 },
  { date: "21/12/2020", H: 160, W: 6, AP: 24, HR: 4, T: 0, O2: 0, HGT: 0, RR: 0, D24G: 0, D: 0, B: 0, AUSC: 0 }
];

const header = ["date"];
const search = ["date"];
const label = {
  "date": "Date",
  "H": "Height",
  "W": "Weight",
  "AP": "Arterial pressure",
  "HR" : "Heart rate",
  "T" : "Temperature",
  "O2" : "Saturation",
  "HGT": "HGT",
  "RR": "Respitatory rate",
  "D24G" : "Diuresis 24H",
  "D" : "Diuresis",
  "B": "Bowel",
  "AUSC" : "Auscultation",
}

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
          columnsSearch={search}
          rowsPerPage={5}
          onDelete={onDelete}
          isCollapsabile={true}
        />
      </div>
    </>
  );
}

export default PatientTriageTable;