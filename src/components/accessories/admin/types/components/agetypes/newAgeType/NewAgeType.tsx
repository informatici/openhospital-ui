import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { AgeTypeDTO } from "../../../../../../../generated";
//import { createAgeType } from "../../../../../../../state/types/ages/actions";
import AgeTypeForm from "../ageTypesForm/AgeTypeForm";
import { getInitialFields } from "../ageTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewAgeType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<AgeTypeDTO>>(
    (state) => state.types.ages.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: AgeTypeDTO) => {};

  return (
    <div className="newAgeType">
      <h3 className="title">{t("ageTypes.addAgeType")}</h3>
      <AgeTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("ageTypes.saveAgeTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
