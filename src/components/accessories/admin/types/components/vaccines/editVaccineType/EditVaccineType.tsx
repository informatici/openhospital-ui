import { useTranslation } from "react-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { VaccineTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateVaccineType } from "../../../../../../../state/vaccineTypes/actions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../vaccineTypesForm/consts";
import VaccineTypeForm from "../vaccineTypesForm/VaccineTypeForm";
import "./styles.scss";

export const EditVaccineType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: VaccineTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<VaccineTypeDTO>>(
    (state) => state.vaccineTypes.update
  );

  const handleSubmit = (value: VaccineTypeDTO) => {
    dispatch(updateVaccineType(value));
  };

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_vaccines_types} />;
  }

  return (
    <div className="editVaccineType">
      <h3 className="title">{t("vaccineTypes.editVaccineType")}</h3>
      <VaccineTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("vaccineTypes.updateVaccineType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
