import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { Navigate, useLocation, useParams } from "react-router";
import { DischargeTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateDischargeType } from "../../../../../../../state/types/discharges";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../dischargeTypesForm/consts";
import DischargeTypeForm from "../dischargeTypesForm/DischargeTypeForm";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditDischargeType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: DischargeTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<DischargeTypeDTO>>(
    (state) => state.types.discharges.update
  );

  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const handleSubmit = (value: DischargeTypeDTO) => {
    dispatch(updateDischargeType(value));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);
  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_discharges_types} />;
  }

  return (
    <div className="editDischargeType">
      <h3 className="title" data-cy="sub-discharge-title">
        {t("dischargeTypes.editDischargeType")}
      </h3>
      <DischargeTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("dischargeTypes.updateDischargeType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
