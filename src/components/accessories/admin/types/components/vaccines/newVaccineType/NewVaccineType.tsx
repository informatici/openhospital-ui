import { useTranslation } from "react-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../../../types";
import { IApiResponse } from "../../../../../../../state/types";
import { VaccineTypeDTO } from "../../../../../../../generated";
import { createVaccineType } from "../../../../../../../state/vaccineTypes/actions";
import VaccineTypeForm from "../vaccineTypesForm/VaccineTypeForm";
import { getInitialFields } from "../vaccineTypesForm/consts";

export const NewVaccineType = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, IApiResponse<VaccineTypeDTO>>(
    (state) => state.vaccineTypes.create
  );

  const handleSubmit = (value: VaccineTypeDTO) => {
    dispatch(createVaccineType(value));
  };

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>
        {t("vaccineTypes.addVaccineType")}
      </h3>
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
