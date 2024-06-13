import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { DeliveryTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateDeliveryType } from "../../../../../../../state/types/deliveries/actions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../deliveryTypesForm/consts";
import DeliveryTypeForm from "../deliveryTypesForm/DeliveryTypeForm";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditDeliveryType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: DeliveryTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<DeliveryTypeDTO>>(
    (state) => state.types.deliveries.update
  );

  const handleSubmit = (value: DeliveryTypeDTO) => {
    dispatch(updateDeliveryType(value));
  };

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_deliveries_types} />;
  }

  return (
    <div className="editDeliveryType">
      <h3 className="title">{t("deliveryTypes.editDeliveryType")}</h3>
      <DeliveryTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("deliveryTypes.updateDeliveryType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
