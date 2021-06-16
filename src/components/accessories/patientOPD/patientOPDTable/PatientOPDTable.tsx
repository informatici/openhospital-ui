import { format } from "date-fns";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OpdDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { header, order, label } from "./consts";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientOPDTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const [, setUpdate] = useState(true);
  const formatDataToDisplay = (data: OpdDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          code: item.code,
          date: item.date ? format(new Date(item.date), "dd/MM/yyyy") : "",
          disease: item.disease ? item.disease.description : "",
          disease2: item.disease2 ? item.disease2.description : "",
          disease3: item.disease3 ? item.disease3.description : "",
          note: item.note + "",
        };
      });
    return results;
  };
  let data = useSelector<IState, OpdDTO[]>((state) =>
    formatDataToDisplay(state.opds.getOpds.data)
  );

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
      <div className="patientOPDTable">
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

export default PatientOPDTable;
