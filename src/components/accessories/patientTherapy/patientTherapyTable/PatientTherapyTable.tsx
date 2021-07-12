import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TherapyRowDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
}
export const header = ["startDate"];
export const label = {
  startDate: "Start",
  endDate: "End",
  qty: "Quantity",
  freqInDay: "FID",
  unitID: "unitID",
  note: "Note",
  freqInPeriod: "FIP",
};
export const order = ["startDate"];

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  let therapyStore = useSelector<IState, TherapyRowDTO[]>((state) =>
    state.therapies.therapiesByPatientId.data
      ? state.therapies.therapiesByPatientId.data
      : []
  );
  const [data, setData] = useState(therapyStore);

  useEffect(() => {
    setData(therapyStore);
  }, [therapyStore, shouldUpdateTable]);

  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <>
      <div className="patientTherapyTable">
        <Table
          rowData={data}
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={5}
          isCollapsabile={true}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onEView}
        />
      </div>
    </>
  );
};

export default PatientTherapyTable;
