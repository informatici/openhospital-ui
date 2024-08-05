import { useTranslation } from "react-i18next";
import OperationForm from "../operationForm/OperationForm";
import React from "react";
import { getInitialFields } from "../operationForm/consts";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { OperationDTO } from "../../../../../generated";
import { createOperation } from "../../../../../state/operations";
import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";

export const NewOperation = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.operations.create);

  const handleSubmit = (value: OperationDTO) => {
    dispatch(createOperation(value));
  };

  return (
    <OperationForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={!!create.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("operation.saveOperation")}
      fields={getInitialFields(undefined)}
    />
  );
};
