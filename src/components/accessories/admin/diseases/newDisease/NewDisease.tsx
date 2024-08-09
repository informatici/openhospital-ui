import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { DiseaseDTO } from "../../../../../generated";
import { createDisease } from "../../../../../state/diseases";
import { getInitialFields } from "../diseaseForm/consts";
import DiseaseForm from "../diseaseForm/DiseaseForm";

export const NewDisease = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.diseases.create);

  const handleSubmit = (value: DiseaseDTO) => {
    dispatch(createDisease(value));
  };

  return (
    <DiseaseForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={!!create.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("disease.saveDisease")}
      fields={getInitialFields(undefined)}
    />
  );
};
