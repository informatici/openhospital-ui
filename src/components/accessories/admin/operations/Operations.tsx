import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getOperationTypes } from "state/types/operations";
import { PATHS } from "../../../../consts";
import { OperationDTO } from "../../../../generated";
import {
  deleteOperation,
  deleteOperationReset,
  getOperations,
} from "../../../../state/operations";
import Button from "../../button/Button";
import classes from "./Operations.module.scss";
import OperationTable from "./operationTable";

export const Operations = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOperations());
    dispatch(getOperationTypes());

    return () => {
      dispatch(deleteOperationReset());
    };
  }, [dispatch]);

  const handleEdit = (row: OperationDTO) => {
    navigate(PATHS.admin_operations_edit.replace(":id", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: OperationDTO) => {
    dispatch(deleteOperation(row.code ?? ""));
  };

  return (
    <div className={classes.operations} data-cy="operations-table">
      <OperationTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        headerActions={
          <Button
            onClick={() => {
              navigate(PATHS.admin_operations_new);
            }}
            type="button"
            variant="contained"
            color="primary"
            dataCy="add-new-operation"
          >
            {t("operation.addOperation")}
          </Button>
        }
      />
    </div>
  );
};
