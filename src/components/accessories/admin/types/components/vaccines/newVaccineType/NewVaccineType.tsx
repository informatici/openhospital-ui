import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { ApiResponse } from "../../../../../../../state/types";
import { VaccineTypeDTO } from "../../../../../../../generated";
import { createVaccineType } from "../../../../../../../state/types/vaccines/actions";
import VaccineTypeForm from "../vaccineTypesForm/VaccineTypeForm";
import { getInitialFields } from "../vaccineTypesForm/consts";
import { setTypeMode } from "../../../../../../../state/types/config";
import "./styles.scss";

export const NewVaccineType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, ApiResponse<VaccineTypeDTO>>(
    (state) => state.types.vaccines.create
  );

  useEffect(() => {
    dispatch(setTypeMode("edit"));
  });

  const handleSubmit = (value: VaccineTypeDTO) => {
    dispatch(createVaccineType(value));
  };

  return (
    <div className="newVaccineType">
      <h3 className="title">{t("vaccineTypes.addVaccineType")}</h3>
      <VaccineTypeForm
        creationMode
        onSubmit={handleSubmit}
        isLoading={!!create.isLoading}
        resetButtonLabel={t("common.cancel")}
        submitButtonLabel={t("vaccineTypes.saveVaccineTypes")}
        fields={getInitialFields(undefined)}
      />
    </div>
  );
};
