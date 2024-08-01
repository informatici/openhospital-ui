import { useTranslation } from "react-i18next";
import DiseaseForm from "../diseaseForm/DiseaseForm";
import React from "react";
import { getInitialFields } from "../diseaseForm/consts";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { DiseaseDTO } from "../../../../../generated";
import { createDisease } from "../../../../../state/diseases";
import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";

export const NewDisease = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector((state) => state.diseases.create);

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
