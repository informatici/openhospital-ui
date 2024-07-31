import React, { useEffect } from "react";
import classes from "./Operations.module.scss";
import { useDispatch } from "libraries/hooks/redux";
import {
  deleteOperation,
  deleteOperationReset,
  getOperations,
} from "../../../../state/operations";
import { OperationDTO } from "../../../../generated";
import OperationTable from "./operationTable";
import Button from "../../button/Button";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../../consts";

export const Operations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOperations());

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
