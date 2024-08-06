import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../../../consts";
import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { updatePregnantTreatmentType } from "../../../../../../../state/types/pregnantTreatment";
import { getInitialFields } from "../pregnantTreatmentTypeForm/consts";
import PregnantTreatmentTypeForm from "../pregnantTreatmentTypeForm/PregnantTreatmentTypeForm";
import "./styles.scss";

export const EditPregnantTreatmentType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: PregnantTreatmentTypeDTO | undefined } =
    useLocation();
  const { code } = useParams();
  const update = useAppSelector(
    (state) => state.types.pregnantTreatment.update
  );

  const mode = useAppSelector((state) => state.types.config.mode);

  const handleSubmit = (value: PregnantTreatmentTypeDTO) => {
    if (code) {
      dispatch(
        updatePregnantTreatmentType({ code, pregnantTreatmentTypeDTO: value })
      );
    }
  };

  useEffect(() => {
    if (mode !== "edit") {
      dispatch(setTypeMode("edit"));
    }
  }, [mode, dispatch]);

  if (state?.code !== code) {
    return <Navigate to={PATHS.admin_pregnant_treatment_types} />;
  }

  return (
    <div className="editPregnantTreatmentType">
      <h3 data-cy="sub-activity-title" className="title">
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
