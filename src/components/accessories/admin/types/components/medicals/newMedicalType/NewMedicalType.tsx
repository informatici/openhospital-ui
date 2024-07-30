import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/libraries/hooks/redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { MedicalTypeDTO } from "../../../../../../../generated";
import { createMedicalType } from "../../../../../../../state/types/medicals";
import MedicalTypeForm from "../medicalTypesForm/MedicalTypeForm";
import { getInitialFields } from "../medicalTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewMedicalType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<MedicalTypeDTO>>(
    (state) => state.types.medicals.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: MedicalTypeDTO) => {
    dispatch(createMedicalType(value));
  };

  return (
    <div className="newMedicalType" data-cy="sub-medical-title">
      <h3 className="title">{t("medicalTypes.addMedicalType")}</h3>
      <MedicalTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("medicalTypes.saveMedicalTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
