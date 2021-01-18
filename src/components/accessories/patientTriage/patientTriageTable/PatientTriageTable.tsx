import React, { FunctionComponent } from 'react';
import Table from "../../table/Table";

const values = [
  {name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24, protein: 4},
  {name: "Ice cream sandwich", calories: 237, fat: 9, carbs: 37, protein: 4.3},
  {name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6},
  {name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
  {name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 3.9}
];

const PatientTriageTable: FunctionComponent = () => {
  return (
    <>
      <div className="patientTriageTable">
        <Table values={values} />
      </div>
    </>
  );
}

export default PatientTriageTable;