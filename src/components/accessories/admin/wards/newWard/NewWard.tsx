import { useTranslation } from "react-i18next";
import WardForm from "../wardForm/WardForm";
import React from "react";
import { getInitialFields } from "../wardForm/consts";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { WardDTO } from "../../../../../generated";
import { createWard } from "../../../../../state/ward";
import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";

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
