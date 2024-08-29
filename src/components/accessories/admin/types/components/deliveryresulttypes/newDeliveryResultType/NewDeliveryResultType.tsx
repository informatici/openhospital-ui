import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DeliveryResultTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { createDeliveryResultType } from "../../../../../../../state/types/deliveryResults";
import DeliveryResultTypeForm from "../deliveryResultTypeForm/DeliveryResultTypeForm";
import { getInitialFields } from "../deliveryResultTypeForm/consts";
import "./styles.scss";

export const NewDeliveryResultType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.types.deliveryResult.create);

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: DeliveryResultTypeDTO) => {
    dispatch(createDeliveryResultType(value));
  };

  return (
    <div className="newDeliveryResultType">
      <h3 className="title" data-cy="sub-activity-title">
        {t("deliveryResultType.addDeliveryResultType")}
      </h3>
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
