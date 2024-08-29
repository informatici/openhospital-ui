import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { VaccineDTO } from "../../../../../generated";
import { createVaccine } from "../../../../../state/vaccines";
import { getInitialFields } from "../vaccineForm/consts";
import VaccineForm from "../vaccineForm/VaccineForm";

export const NewVaccine = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.vaccines.create);

  const handleSubmit = (value: VaccineDTO) => {
    dispatch(createVaccine(value));
  };

  return (
    <VaccineForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={!!create.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("vaccine.saveVaccine")}
      fields={getInitialFields(undefined)}
    />
  );
};
