import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { Navigate, useLocation, useParams } from "react-router";
import { AdmissionTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateAdmissionType } from "../../../../../../../state/types/admissions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../admissionTypesForm/consts";
import AdmissionTypeForm from "../admissionTypesForm/AdmissionTypeForm";
import { setTypeMode, TypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditAdmissionType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: AdmissionTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector((state) => state.types.admissions.update);
  const mode = useSelector((state) => state.types.config.mode);

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
