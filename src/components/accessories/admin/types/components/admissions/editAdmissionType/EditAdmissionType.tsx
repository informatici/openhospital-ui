import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { AdmissionTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateAdmissionType } from "../../../../../../../state/types/admissions/actions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../admissionTypesForm/consts";
import AdmissionTypeForm from "../admissionTypesForm/AdmissionTypeForm";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditAdmissionType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: AdmissionTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<AdmissionTypeDTO>>(
    (state) => state.types.admissions.update
  );

  const handleSubmit = (value: AdmissionTypeDTO) => {
    dispatch(updateAdmissionType(value));
  };

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_admissions_types} />;
  }

  return (
    <div className="editAdmissionType">
      <h3 className="title">{t("admissionTypes.editAdmissionType")}</h3>
      <AdmissionTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("admissionTypes.updateAdmissionType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
