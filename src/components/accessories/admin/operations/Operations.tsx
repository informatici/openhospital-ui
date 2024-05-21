import React, { useEffect } from "react";
import classes from "./Operations.module.scss";
import { useDispatch } from "react-redux";
import { OperationDTO } from "../../../../generated";
import OperationTable from "./operationTable";
import { getOperations } from "../../../../state/operations/actions";
import { getOperationTypes } from "../../../../state/operationTypes/actions";

export const Operations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOperations());
    dispatch(getOperationTypes());
  }, [dispatch]);

  const handleEdit = (row: OperationDTO) => {
    // TODO
  };

  const handleDelete = (row: OperationDTO) => {
    // TODO
  };

  return (
    <div className={classes.operations}>
      <div className={classes.actions}></div>
      <OperationTable onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
