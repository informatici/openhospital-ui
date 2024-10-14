import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { updateHospital } from "state/hospital";
import { PATHS } from "../../../../../consts";
import { HospitalDTO } from "../../../../../generated";
import HospitalForm from "../hospitalForm/HospitalForm";
import { getInitialFields } from "../hospitalForm/consts";

export const EditHospital = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const hospital = useAppSelector((state) => state.hospital.getHospital.data);
  const update = useAppSelector((state) => state.hospital.updateHospital);

  const navigate = useNavigate();

  const handleSubmit = (value: HospitalDTO) => {
    dispatch(
      updateHospital({
        code: hospital!.code!!,
        hospitalDTO: { ...hospital, ...value },
      })
    );
  };

  useEffect(() => {
    if (!hospital) {
      navigate(PATHS.admin);
    }
  }, [navigate, hospital]);

  return (
    <HospitalForm
      onSubmit={handleSubmit}
      isLoading={!!update.isLoading}
      resetButtonLabel={t("common.cancel")}
      submitButtonLabel={t("hospital.updateHospital")}
      fields={getInitialFields(hospital)}
    />
  );
};
