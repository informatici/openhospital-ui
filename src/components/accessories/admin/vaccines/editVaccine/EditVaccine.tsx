import { useTranslation } from "react-i18next";
import VaccineForm from "../vaccineForm/VaccineForm";
import React from "react";
import { getInitialFields } from "../vaccineForm/consts";
import { useDispatch, useSelector } from "@/libraries/hooks/redux";
import { VaccineDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { updateVaccine } from "../../../../../state/vaccines";
import { IState } from "../../../../../types";
import { Navigate, useLocation, useParams } from "react-router";
import { PATHS } from "../../../../../consts";

export const EditVaccine = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { state }: { state: VaccineDTO | undefined } = useLocation();
  const { code } = useParams();
  const update = useSelector<IState, ApiResponse<VaccineDTO>>(
    (state) => state.vaccines.update
  );

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
