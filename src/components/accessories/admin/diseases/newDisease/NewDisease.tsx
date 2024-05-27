import { useTranslation } from "react-i18next";
import DiseaseForm from "../diseaseForm/DiseaseForm";
import React from "react";
import { getInitialFields } from "../diseaseForm/consts";
import { useDispatch, useSelector } from "react-redux";
import { DiseaseDTO } from "../../../../../generated";
import { createDisease } from "../../../../../state/diseases/actions";
import { IState } from "../../../../../types";
import { IApiResponse } from "../../../../../state/types";

export const NewDisease = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, IApiResponse<DiseaseDTO>>(
    (state) => state.diseases.create
  );

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
