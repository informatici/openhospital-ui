import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { OperationDTO } from "../../../../../generated";
import { createOperation } from "../../../../../state/operations";
import { getInitialFields } from "../operationForm/consts";
import OperationForm from "../operationForm/OperationForm";

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
