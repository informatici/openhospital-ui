import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { Navigate, useLocation, useParams } from "react-router";
import { DeliveryTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateDeliveryType } from "../../../../../../../state/types/deliveries";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../deliveryTypesForm/consts";
import DeliveryTypeForm from "../deliveryTypesForm/DeliveryTypeForm";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditDeliveryType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: DeliveryTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.types.deliveries.update);

  const mode = useAppSelector((state) => state.types.config.mode);

  const handleSubmit = (value: DeliveryTypeDTO) => {
    dispatch(updateDeliveryType(value));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_deliveries_types} />;
  }

  return (
    <div className="editDeliveryType">
      <h3 data-cy="sub-delivery-title" className="title">
        {t("deliveryTypes.editDeliveryType")}
      </h3>
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
