import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router";
import { AgeTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updateAgeType } from "../../../../../../../state/types/ages/actions";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../ageTypesForm/consts";
import AgeTypeForm from "../ageTypesForm/AgeTypeForm";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditAgeType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: AgeTypeDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<AgeTypeDTO>>(
    (state) => state.types.ages.update
  );

  const handleSubmit = (value: AgeTypeDTO) => {
    dispatch(updateAgeType(value));
  };

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_deliveries_types} />;
  }

  return (
    <div className="editAgeType">
      <h3 className="title">{t("ageTypes.editAgeType")}</h3>
      <AgeTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("ageTypes.updateAgeType")}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
