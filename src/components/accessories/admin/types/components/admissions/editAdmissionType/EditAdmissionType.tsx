import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { AdmissionTypeDTO } from "../../../../../../../generated";
import { updateAdmissionType } from "../../../../../../../state/types/admissions";
import { setTypeMode } from "../../../../../../../state/types/config";
import AdmissionTypeForm from "../admissionTypesForm/AdmissionTypeForm";
import { getInitialFields } from "../admissionTypesForm/consts";
import "./styles.scss";

export const EditAdmissionType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: AdmissionTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.types.admissions.update);
  const mode = useAppSelector((state) => state.types.config.mode);

  const handleSubmit = (value: AdmissionTypeDTO) => {
    dispatch(updateAdmissionType(value));
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_admissions_types} />;
  }

  return (
    <div className="editAdmissionType">
      <h3 data-cy="sub-activity-title" className="title">
        {t("admissionTypes.editAdmissionType")}
      </h3>
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
