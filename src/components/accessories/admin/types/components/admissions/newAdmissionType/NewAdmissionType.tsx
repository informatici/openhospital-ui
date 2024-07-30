import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { AdmissionTypeDTO } from "../../../../../../../generated";
import { createAdmissionType } from "../../../../../../../state/types/admissions";
import AdmissionTypeForm from "../admissionTypesForm/AdmissionTypeForm";
import { getInitialFields } from "../admissionTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewAdmissionType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<AdmissionTypeDTO>>(
    (state) => state.types.admissions.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: AdmissionTypeDTO) => {
    dispatch(createAdmissionType(value));
  };

  return (
    <div className="newAdmissionType">
      <h3 data-cy="sub-activity-title" className="title">
        {t("admissionTypes.addAdmissionType")}
      </h3>
      <AdmissionTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("admissionTypes.saveAdmissionTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
