import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { header, order, label } from "./consts";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const [, setUpdate] = useState(false);

  let data = useSelector<IState, any[]>((state) =>
    state.therapies.therapiesByPatientId.data
      ? state.therapies.therapiesByPatientId.data
      : []
  );

  const updateTableData = (state: IState) => {
    let newTherapyObj = state.therapies.createTherapy.data;
    if (newTherapyObj) {
      const found = data.find(
        (item) => item.medicalId == newTherapyObj?.medicalId
      );
      if (!found) {
        data = [...data, newTherapyObj];
      }
    }
  };
  useSelector<IState>((state) => updateTableData(state));

  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

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
