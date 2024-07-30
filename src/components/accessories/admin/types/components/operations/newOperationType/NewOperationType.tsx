import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/libraries/hooks/redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { OperationTypeDTO } from "../../../../../../../generated";
import { createOperationType } from "../../../../../../../state/types/operations";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";
import OperationTypeForm from "../operationTypesForm/OperationTypeForm";
import { getInitialFields } from "../operationTypesForm/consts";

export const NewOperationType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<OperationTypeDTO>>(
    (state) => state.types.operations.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (code: string, value: OperationTypeDTO) => {
    dispatch(createOperationType(value));
  };

  return (
    <div className="newOperationType">
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
