import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../../../consts";
import { OperationTypeDTO } from "../../../../../../generated";
import { setTypeMode } from "../../../../../../state/types/config";
import {
  deleteOperationType,
  deleteOperationTypeReset,
  getOperationTypes,
} from "../../../../../../state/types/operations";
import Button from "../../../../button/Button";
import OperationTypesTable from "./operationTypesTable";
import "./styles.scss";

const OperationTypes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOperationTypes());
    dispatch(setTypeMode("manage"));

    return () => {
      dispatch(deleteOperationTypeReset());
    };
  }, [dispatch]);

  const handleEdit = (row: OperationTypeDTO) => {
    navigate(PATHS.admin_operations_types_edit.replace(":code", row.code!), {
      state: row,
    });
  };

  const handleDelete = (row: OperationTypeDTO) => {
    dispatch(deleteOperationType(row.code ?? ""));
  };

  const { t } = useTranslation();
  return (
    <>
      <h3 data-cy="sub-operation-title">{t("operationTypes.title")}</h3>

      <div className="operationTypes" data-cy="operation-types-table">
        <OperationTypesTable
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
              dataCy="add-operation-type"
            >
              {t("operationTypes.addOperationType")}
            </Button>
          }
        />
      </div>
    </>
  );
};

export default OperationTypes;
