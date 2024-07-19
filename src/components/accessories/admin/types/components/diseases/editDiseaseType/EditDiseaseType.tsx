import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { DiseaseTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateDiseaseType } from "../../../../../../../state/types/diseases/actions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../diseaseTypesForm/consts";
import DiseaseTypeForm from "../diseaseTypesForm/DiseaseTypeForm";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditDiseaseType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: DiseaseTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<DiseaseTypeDTO>>(
    (state) => state.types.diseases.update
  );
  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const handleSubmit = (value: DiseaseTypeDTO) => {
    dispatch(updateDiseaseType(value));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_diseases_types} />;
  }

  return (
    <div className="editDiseaseType">
      <h3 data-cy="sub-activity-title" className="title">
        {t("diseaseTypes.editDiseaseType")}
      </h3>
      <DiseaseTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("diseaseTypes.updateDiseaseType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
