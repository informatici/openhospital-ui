import { useTranslation } from "react-i18next";
import OperationForm from "../operationForm/OperationForm";
import React from "react";
import { getInitialFields } from "../operationForm/consts";
import { useDispatch, useSelector } from "react-redux";
import { OperationDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { updateOperation } from "../../../../../state/operations";
import { IState } from "../../../../../types";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";

export const EditOperation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: OperationDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useSelector<IState, ApiResponse<OperationDTO>>(
    (state) => state.operations.update
  );

  const handleSubmit = (value: OperationDTO) => {
    dispatch(
      updateOperation({
        code: id ?? "",
        operationDTO: { ...value, lock: state?.lock },
      })
    );
  };

  if (state?.code !== id) {
    return <Navigate to={PATHS.admin_operations} />;
  }

  return (
    <OperationForm
      creationMode={false}
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("operation.updateOperation")}
      fields={getInitialFields(state)}
    />
  );
};
