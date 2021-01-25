import React, { FunctionComponent } from 'react';
import Table from '../../table/Table';

const data = [
  { date: "21/12/2021", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2021", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2020", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2020", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2020", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2020", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2021", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2018", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2019", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2019", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "21/12/2019", type: "Pharmacologic treatment", result: "Result (1)", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
];

const header = ["date", "type", "result"];
const order = ["date"];
const label = {
  "date": "Date",
  "type": "Typology",
  "result": "Result",
  "note": "Additional notes"
}

const PatientSummaryByType: FunctionComponent = () => {

  return (
    <div className="patientSummary_type">
      <div className="patientSummary_type_row">
        <h4>Visite (3)</h4>
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>
      
      <div className="patientSummary_type_row">
        <h4>Esame obiettivo (3)</h4>
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>

      <div className="patientSummary_type_row">
        <h4>Prestazioni specialistiche (3)</h4>
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>

      <div className="patientSummary_type_row">
        <h4>Prestazioni diagnostiche (3)</h4>
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>

      <div className="patientSummary_type_row">
        <h4>Interventi operatori (3)</h4>
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>
    </div>
  );
}

export default PatientSummaryByType;