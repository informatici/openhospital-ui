import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import { OperationDTO } from "../../../../../generated";
import { updateOperation } from "../../../../../state/operations";
import OperationForm from "../operationForm/OperationForm";
import { getInitialFields } from "../operationForm/consts";

export const EditOperation = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: OperationDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useAppSelector((state) => state.operations.update);

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
      resetButtonLabel={t("common.reset")}
      submitButtonLabel={t("operation.updateOperation")}
      fields={getInitialFields(state)}
    />
  );
};
