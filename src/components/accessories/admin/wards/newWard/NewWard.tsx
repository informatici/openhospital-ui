import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { WardDTO } from "../../../../../generated";
import { createWard } from "../../../../../state/ward";
import { getInitialFields } from "../wardForm/consts";
import WardForm from "../wardForm/WardForm";

export const NewWard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const create = useAppSelector((state) => state.wards.create);

  const handleSubmit = (value: WardDTO) => {
    dispatch(createWard(value));
  };

  return (
    <WardForm
      creationMode
      onSubmit={handleSubmit}
      isLoading={!!create.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("ward.saveWard")}
      fields={getInitialFields(undefined)}
    />
  );
};
