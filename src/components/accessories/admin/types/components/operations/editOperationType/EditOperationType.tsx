import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { OperationTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateOperationType } from "../../../../../../../state/types/operations/actions";
import { PATHS } from "../../../../../../../consts";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";
import OperationTypeForm from "../operationTypesForm/OperationTypeForm";
import { getInitialFields } from "../operationTypesForm/consts";

export const EditOperationType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: OperationTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<OperationTypeDTO>>(
    (state) => state.types.operations.update
  );

  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const handleSubmit = (code: string, value: OperationTypeDTO) => {
    dispatch(updateOperationType(code, value));
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
