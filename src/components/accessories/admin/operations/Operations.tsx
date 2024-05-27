import React, { useEffect } from "react";
import classes from "./Operations.module.scss";
import { useDispatch } from "react-redux";
import {
  deleteOperation,
  getOperations,
} from "../../../../state/operations/actions";
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
  }, [dispatch]);

  const handleEdit = (row: OperationDTO) => {
    navigate(PATHS.operations_edit.replace("#id", row.code!), { state: row });
  };

  const handleDelete = (row: OperationDTO) => {
    dispatch(deleteOperation(row.code ?? ""));
  };

  return (
    <div className={classes.operations}>
      <OperationTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        headerActions={
          <Button
            onClick={() => {
              navigate("./new");
            }}
            type="button"
            variant="contained"
            color="primary"
          >
            {t("operation.addOperation")}
          </Button>
        }
      />
    </div>
  );
};
