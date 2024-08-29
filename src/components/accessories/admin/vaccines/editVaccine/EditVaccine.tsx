import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";
import { VaccineDTO } from "../../../../../generated";
import { updateVaccine } from "../../../../../state/vaccines";
import { getInitialFields } from "../vaccineForm/consts";
import VaccineForm from "../vaccineForm/VaccineForm";

export const EditVaccine = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { state }: { state: VaccineDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useAppSelector((state) => state.vaccines.update);

  const handleSubmit = (value: VaccineDTO) => {
    dispatch(updateVaccine({ ...value, lock: state?.lock }));
  };

  if (state?.code?.toString() !== code?.toString()) {
    return <Navigate to={PATHS.admin_vaccines} />;
  }

  return (
    <VaccineForm
      creationMode={false}
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("vaccine.updateVaccine")}
      fields={getInitialFields(state)}
    />
  );
};
