import { useTranslation } from "react-i18next";
import WardForm from "../wardForm/WardForm";
import React from "react";
import { getInitialFields } from "../wardForm/consts";
import { useDispatch, useSelector } from "react-redux";
import { WardDTO } from "../../../../../generated";
import { createWard } from "../../../../../state/ward/actions";
import { IState } from "../../../../../types";
import { IApiResponse } from "../../../../../state/types";

export const NewWard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const create = useSelector<IState, IApiResponse<WardDTO>>(
    (state) => state.wards.create
  );

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
