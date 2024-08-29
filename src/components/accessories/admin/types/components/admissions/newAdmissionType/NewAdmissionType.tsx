import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionTypeDTO } from "../../../../../../../generated";
import { createAdmissionType } from "../../../../../../../state/types/admissions";
import { setTypeMode } from "../../../../../../../state/types/config";
import AdmissionTypeForm from "../admissionTypesForm/AdmissionTypeForm";
import { getInitialFields } from "../admissionTypesForm/consts";
import "./styles.scss";

export const NewAdmissionType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.types.admissions.create);

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
