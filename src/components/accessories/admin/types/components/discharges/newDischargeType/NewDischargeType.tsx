import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { DischargeTypeDTO } from "../../../../../../../generated";
import { createDischargeType } from "../../../../../../../state/types/discharges";
import DischargeTypeForm from "../dischargeTypesForm/DischargeTypeForm";
import { getInitialFields } from "../dischargeTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewDischargeType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<DischargeTypeDTO>>(
    (state) => state.types.discharges.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: DischargeTypeDTO) => {
    dispatch(createDischargeType(value));
  };

  return (
    <div className="newDischargeType">
      <h3 className="title" data-cy="sub-discharge-title">
        {t("dischargeTypes.addDischargeType")}
      </h3>
      <DischargeTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("dischargeTypes.saveDischargeTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
