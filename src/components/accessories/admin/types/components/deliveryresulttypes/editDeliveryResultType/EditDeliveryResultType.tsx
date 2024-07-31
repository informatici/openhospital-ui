import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { DeliveryResultTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { PATHS } from "../../../../../../../consts";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";
import DeliveryResultTypeForm from "../deliveryResultTypeForm/DeliveryResultTypeForm";
import { getInitialFields } from "../deliveryResultTypeForm/consts";
import { updateDeliveryResultType } from "../../../../../../../state/types/deliveryResultType/actions";

export const EditDeliveryResultType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: DeliveryResultTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<DeliveryResultTypeDTO>>(
    (state) => state.types.deliveryResult.update
  );

  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const handleSubmit = (value: DeliveryResultTypeDTO) => {
    dispatch(updateDeliveryResultType(value));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_delivery_result_types} />;
  }

  return (
    <div className="editDeliveryResultType">
      <h3 className="title" data-cy="sub-activity-title">
        {t("deliveryResultType.editDeliveryResultType")}
      </h3>
      <DeliveryResultTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("deliveryResultType.updateDeliveryResultType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
