import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DischargeTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { createDischargeType } from "../../../../../../../state/types/discharges";
import DischargeTypeForm from "../dischargeTypesForm/DischargeTypeForm";
import { getInitialFields } from "../dischargeTypesForm/consts";
import "./styles.scss";

export const NewDischargeType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.types.discharges.create);

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
