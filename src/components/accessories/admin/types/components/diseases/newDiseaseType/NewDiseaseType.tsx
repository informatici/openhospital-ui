import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { DiseaseTypeDTO } from "../../../../../../../generated";
import { createDiseaseType } from "../../../../../../../state/types/diseases/actions";
import DiseaseTypeForm from "../diseaseTypesForm/DiseaseTypeForm";
import { getInitialFields } from "../diseaseTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewDiseaseType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<DiseaseTypeDTO>>(
    (state) => state.types.diseases.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: DiseaseTypeDTO) => {
    dispatch(createDiseaseType(value));
  };

  return (
    <div className="newDiseaseType">
      <h3 data-cy="sub-activity-title" className="title">
        {t("diseaseTypes.addDiseaseType")}
      </h3>
      <DiseaseTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("diseaseTypes.saveDiseaseTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
