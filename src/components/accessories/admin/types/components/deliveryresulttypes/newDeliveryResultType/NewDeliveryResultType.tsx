import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { DeliveryResultTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";
import DeliveryResultTypeForm from "../deliveryResultTypeForm/DeliveryResultTypeForm";
import { getInitialFields } from "../deliveryResultTypeForm/consts";
import { createDeliveryResultType } from "../../../../../../../state/types/deliveryResults";

export const NewDeliveryResultType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<DeliveryResultTypeDTO>>(
    (state) => state.types.deliveryResult.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: DeliveryResultTypeDTO) => {
    dispatch(createDeliveryResultType(value));
  };

  return (
    <div className="newDeliveryResultType">
      <h3 className="title">{t("deliveryResultType.addDeliveryResultType")}</h3>
      <DeliveryResultTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("deliveryResultType.saveDeliveryResultTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
