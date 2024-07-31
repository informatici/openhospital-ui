import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { Navigate, useLocation, useParams } from "react-router";
import { MedicalTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateMedicalType } from "../../../../../../../state/types/medicals";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../medicalTypesForm/consts";
import MedicalTypeForm from "../medicalTypesForm/MedicalTypeForm";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditMedicalType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: MedicalTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<MedicalTypeDTO>>(
    (state) => state.types.medicals.update
  );

  const mode = useSelector<IState, TypeMode>(
    (state) => state.types.config.mode
  );

  const handleSubmit = (value: MedicalTypeDTO) => {
    dispatch(updateMedicalType(value));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_medicals_types} />;
  }

  return (
    <div className="editMedicalType">
      <h3 className="title" data-cy="sub-medical-title">
        {t("medicalTypes.editMedicalType")}
      </h3>
      <MedicalTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("medicalTypes.updateMedicalType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
