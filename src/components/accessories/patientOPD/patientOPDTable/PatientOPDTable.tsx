import { format } from "date-fns";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpdDTO } from "../../../../generated";
import { getOpds } from "../../../../state/opds/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { CircularProgress } from "@material-ui/core";
import { header, order, label } from "./consts";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientOPDTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const dispatch = useDispatch();
  const data = useSelector<IState, OpdDTO[]>((state) =>
    state.opds.getOpds.data ? state.opds.getOpds.data : []
  );
  const isLoading = useSelector<IState, boolean>(
    (state) => state.opds.createOpd.status === "LOADING"
  );
  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    dispatch(getOpds(patientCode));
  }, [shouldUpdateTable]);

  const formatDataToDisplay = (data: OpdDTO[] | undefined) => {
    let results: any = [];
    if (data)
      results = data.map((item) => {
        return {
          date: item.date ? format(new Date(item.date), "dd/MM/yyyy") : "",
          disease: item.disease ? item.disease.description : "",
          disease2: item.disease2 ? item.disease2.description : "",
          disease3: item.disease3 ? item.disease3.description : "",
          note: item.note + "",
        };
      });
    return results;
  };

  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <>
      <div className="patientOPDTable">
        {!isLoading ? (
          <Table
            rowData={formatDataToDisplay(data)}
            tableHeader={header}
            labelData={label}
            columnsOrder={order}
            rowsPerPage={5}
            onDelete={onDelete}
            isCollapsabile={true}
            onEdit={onEdit}
            onView={onEView}
          />
        ) : (
          <CircularProgress
            style={{ marginLeft: "50%", position: "relative" }}
          />
        )}
      </div>
    </>
  );
};

export default PatientOPDTable;
