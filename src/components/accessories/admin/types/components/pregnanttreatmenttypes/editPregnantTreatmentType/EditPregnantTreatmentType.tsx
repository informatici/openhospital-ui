import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { Navigate, useLocation, useParams } from "react-router";
import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { updatePregnantTreatmentType } from "../../../../../../../state/types/pregnantTreatment";
import { PATHS } from "../../../../../../../consts";
import { getInitialFields } from "../pregnantTreatmentTypeForm/consts";
import PregnantTreatmentTypeForm from "../pregnantTreatmentTypeForm/PregnantTreatmentTypeForm";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const EditPregnantTreatmentType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: PregnantTreatmentTypeDTO | undefined } =
    useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<PregnantTreatmentTypeDTO>>(
    (state) => state.types.pregnantTreatment.update
  );

  const handleSubmit = (value: PregnantTreatmentTypeDTO) => {
    if (code) {
      dispatch(
        updatePregnantTreatmentType({ code, pregnantTreatmentTypeDTO: value })
      );
    }
  };

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_pregnant_treatment_types} />;
  }

  return (
    <div className="editPregnantTreatmentType">
      <h3 className="title">
        {t("pregnantTreatmentTypes.editPregnantTreatmentType")}
      </h3>
      <PregnantTreatmentTypeForm
        creationMode={false}
        onSubmit={handleSubmit}
        isLoading={!!update.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t(
          "pregnantTreatmentTypes.updatePregnantTreatmentType"
        )}
        fields={getInitialFields(state)}
      />
    </div>
  );
};
