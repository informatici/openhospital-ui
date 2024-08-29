import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { MedicalTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { updateMedicalType } from "../../../../../../../state/types/medicals";
import { getInitialFields } from "../medicalTypesForm/consts";
import MedicalTypeForm from "../medicalTypesForm/MedicalTypeForm";
import "./styles.scss";

export const EditMedicalType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: MedicalTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.types.medicals.update);

  const mode = useAppSelector((state) => state.types.config.mode);

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
