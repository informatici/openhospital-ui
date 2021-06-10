import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ITherapiesState } from "../../../../state/therapies/types";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { data, header, order, label } from "./consts";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const [, setUpdate] = useState(false);
  const therapy = useSelector<IState, ITherapiesState>(
    (state) => state.therapies
  );
  if (therapy.createTherapy.data) {
    const newRow = {
      startDate: therapy.createTherapy.data!.startDate!,
      endDate: therapy.createTherapy.data!.endDate!,
      medicalId: therapy.createTherapy.data!.medicalId! + "",
      qty: therapy.createTherapy.data!.qty!,
      freqInDay: therapy.createTherapy.data!.freqInDay!,
      freqInPeriod: therapy.createTherapy.data!.freqInPeriod!,
      unitID: therapy.createTherapy.data!.unitID!,
      note: therapy.createTherapy.data!.note!,
    };
    const found = data.some((el) => el.medicalId === newRow.medicalId);
    if (!found) data.push(newRow);
  }

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
