import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DiseaseTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { createDiseaseType } from "../../../../../../../state/types/diseases";
import DiseaseTypeForm from "../diseaseTypesForm/DiseaseTypeForm";
import { getInitialFields } from "../diseaseTypesForm/consts";
import "./styles.scss";

export const NewDiseaseType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.types.diseases.create);

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
