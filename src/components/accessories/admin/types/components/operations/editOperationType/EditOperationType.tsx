import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { OperationTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { updateOperationType } from "../../../../../../../state/types/operations";
import OperationTypeForm from "../operationTypesForm/OperationTypeForm";
import { getInitialFields } from "../operationTypesForm/consts";
import "./styles.scss";

export const EditOperationType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: OperationTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.types.operations.update);

  const mode = useAppSelector((state) => state.types.config.mode);

  const handleSubmit = (code: string, value: OperationTypeDTO) => {
    dispatch(updateOperationType({ code, operationTypeDTO: value }));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_operations_types} />;
  }

  return (
    <div className="editOperationType">
      <h3 className="title" data-cy="sub-operation-title">
        {t("operationTypes.editOperationType")}
      </h3>
      <OperationTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("operationTypes.updateOperationType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
