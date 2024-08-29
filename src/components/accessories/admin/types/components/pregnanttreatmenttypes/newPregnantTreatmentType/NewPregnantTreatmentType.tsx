import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { setTypeMode } from "../../../../../../../state/types/config";
import { createPregnantTreatmentType } from "../../../../../../../state/types/pregnantTreatment";
import PregnantTreatmentTypeForm from "../pregnantTreatmentTypeForm/PregnantTreatmentTypeForm";
import { getInitialFields } from "../pregnantTreatmentTypeForm/consts";
import "./styles.scss";

export const NewPregnantTreatmentType = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector(
    (state) => state.types.pregnantTreatment.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: PregnantTreatmentTypeDTO) => {
    dispatch(createPregnantTreatmentType(value));
  };

  return (
    <div className="newPregnantTreatmentType">
      <h3 data-cy="sub-activity-title" className="title">
        {t("pregnantTreatmentTypes.addPregnantTreatmentType")}
      </h3>
      <PregnantTreatmentTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t(
          "pregnantTreatmentTypes.savePregnantTreatmentTypes"
        )}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
