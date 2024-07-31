import { useTranslation } from "react-i18next";
import DiseaseForm from "../diseaseForm/DiseaseForm";
import React from "react";
import { getInitialFields } from "../diseaseForm/consts";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { DiseaseDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { updateDisease } from "../../../../../state/diseases";
import { IState } from "../../../../../types";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";

export const EditDisease = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: DiseaseDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useSelector<IState, ApiResponse<DiseaseDTO>>(
    (state) => state.diseases.update
  );

  const handleSubmit = (value: DiseaseDTO) => {
    dispatch(updateDisease({ ...value, lock: state?.lock }));
  };

  if (state?.code?.toString() !== id?.toString()) {
    return <Navigate to={PATHS.admin_diseases} />;
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
