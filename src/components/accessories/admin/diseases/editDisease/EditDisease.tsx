import { useTranslation } from "react-i18next";
import DiseaseForm from "../diseaseForm/DiseaseForm";
import React from "react";
import { getInitialFields } from "../diseaseForm/consts";
import { useDispatch, useSelector } from "react-redux";
import { DiseaseDTO } from "../../../../../generated";
import { IApiResponse } from "../../../../../state/types";
import { updateDisease } from "../../../../../state/diseases/actions";
import { IState } from "../../../../../types";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";

export const EditDisease = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: DiseaseDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useSelector<IState, IApiResponse<DiseaseDTO>>(
    (state) => state.diseases.update
  );

  const handleSubmit = (value: DiseaseDTO) => {
    dispatch(updateDisease(value));
  };

  if (state?.code?.toString() !== id?.toString()) {
    return <Navigate to={PATHS.diseases} />;
  }

  return (
    <DiseaseForm
      creationMode={false}
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("disease.updateDisease")}
      fields={getInitialFields(state)}
    />
  );
};
