import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { DiseaseTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { updateDiseaseType } from "../../../../../../../state/types/diseases";
import { getInitialFields } from "../diseaseTypesForm/consts";
import DiseaseTypeForm from "../diseaseTypesForm/DiseaseTypeForm";
import "./styles.scss";

export const EditDiseaseType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: DiseaseTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.types.diseases.update);
  const mode = useAppSelector((state) => state.types.config.mode);

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
