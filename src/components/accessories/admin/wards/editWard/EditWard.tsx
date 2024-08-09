import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import { WardDTO } from "../../../../../generated";
import { updateWard } from "../../../../../state/ward";
import { getInitialFields } from "../wardForm/consts";
import WardForm from "../wardForm/WardForm";

export const EditWard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: WardDTO | undefined } = useLocation();
  const { id } = useParams();
  const update = useAppSelector((state) => state.wards.update);

  const handleSubmit = (value: WardDTO) => {
    dispatch(updateWard({ ...value, lock: state?.lock }));
  };

  if (state?.code?.toString() !== id?.toString()) {
    return <Navigate to={PATHS.admin_wards} />;
  }

  return (
    <WardForm
      creationMode={false}
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("ward.updateWard")}
      fields={getInitialFields(state)}
    />
  );
};
