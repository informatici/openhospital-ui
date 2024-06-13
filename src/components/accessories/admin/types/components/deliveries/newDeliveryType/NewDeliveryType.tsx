import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { DeliveryTypeDTO } from "../../../../../../../generated";
import { createDeliveryType } from "../../../../../../../state/types/deliveries/actions";
import DeliveryTypeForm from "../deliveryTypesForm/DeliveryTypeForm";
import { getInitialFields } from "../deliveryTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewDeliveryType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<DeliveryTypeDTO>>(
    (state) => state.types.deliveries.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: DeliveryTypeDTO) => {
    dispatch(createDeliveryType(value));
  };

  return (
    <div className="newDeliveryType">
      <h3 className="title">{t("deliveryTypes.addDeliveryType")}</h3>
      <DeliveryTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("deliveryTypes.saveDeliveryTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
