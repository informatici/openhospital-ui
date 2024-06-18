import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { MedicalTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateMedicalType } from "../../../../../../../state/types/medicals/actions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../medicalTypesForm/consts";
import MedicalTypeForm from "../medicalTypesForm/MedicalTypeForm";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditMedicalType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: MedicalTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<MedicalTypeDTO>>(
    (state) => state.types.medicals.update
  );

  const handleSubmit = (value: MedicalTypeDTO) => {
    dispatch(updateMedicalType(value));
  };

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_medicals_types} />;
  }

  return (
    <div className="editMedicalType">
      <h3 className="title">{t("medicalTypes.editMedicalType")}</h3>
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
