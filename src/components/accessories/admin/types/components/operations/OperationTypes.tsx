import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "@/libraries/hooks/redux";
import { useNavigate } from "react-router";
import {
  deleteOperationType,
  deleteOperationTypeReset,
  getOperationTypes,
} from "../../../../../../state/types/operations";
import { OperationTypeDTO } from "../../../../../../generated";
import { PATHS } from "../../../../../../consts";
import OperationTypesTable from "./operationTypesTable";
import Button from "../../../../button/Button";
import "./styles.scss";
import { setTypeMode } from "../../../../../../state/types/config";

const OperationTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <h3>{t("operationTypes.title")}</h3>

      <div className="operationTypes">
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
