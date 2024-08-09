import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { DischargeTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { updateDischargeType } from "../../../../../../../state/types/discharges";
import { getInitialFields } from "../dischargeTypesForm/consts";
import DischargeTypeForm from "../dischargeTypesForm/DischargeTypeForm";
import "./styles.scss";

export const EditDischargeType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: DischargeTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.types.discharges.update);

  const mode = useAppSelector((state) => state.types.config.mode);

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
