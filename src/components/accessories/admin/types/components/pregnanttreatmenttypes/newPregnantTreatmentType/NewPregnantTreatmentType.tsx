import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { createPregnantTreatmentType } from "../../../../../../../state/types/pregnantTreatment/actions";
import PregnantTreatmentTypeForm from "../pregnantTreatmentTypeForm/PregnantTreatmentTypeForm";
import { getInitialFields } from "../pregnantTreatmentTypeForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewPregnantTreatmentType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<PregnantTreatmentTypeDTO>>(
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
      <h3 className="title">
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
