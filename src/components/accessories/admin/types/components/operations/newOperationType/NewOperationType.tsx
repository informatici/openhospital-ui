import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { OperationTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { createOperationType } from "../../../../../../../state/types/operations";
import OperationTypeForm from "../operationTypesForm/OperationTypeForm";
import { getInitialFields } from "../operationTypesForm/consts";
import "./styles.scss";

export const NewOperationType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.types.operations.create);

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (code: string, value: OperationTypeDTO) => {
    dispatch(createOperationType(value));
  };

  return (
    <div className="newOperationType" data-cy="sub-operation-title">
      <h3 className="title">{t("operationTypes.addOperationType")}</h3>
      <OperationTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("operationTypes.saveOperationTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
