import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "libraries/hooks/redux";
import {
  AdmissionDTO,
  WardDTO,
  AdmissionTypeDTO,
  AgeTypeDTO,
} from "../../../../generated";
import { colorGen } from "../../../../libraries/uiUtils/colorGenerator";
import { TAPIResponseStatus } from "../../../../state/types";
import { IState } from "../../../../types";

export const useData = () => {
  const { t } = useTranslation();
  const discharges = useAppSelector<IState, AdmissionDTO[]>(
    (state) =>
      state.admissions.getDischarges.data?.data?.filter(
        (e) => e?.disDate !== undefined
      ) ?? []
  );
  const wards = useAppSelector<IState, WardDTO[]>(
    (state) => state.wards.allWards.data ?? []
  );
  const dischargeTypes = useAppSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.types.discharges.getAll.data ?? []
  );
  const ageTypes = useAppSelector<IState, AgeTypeDTO[]>(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useAppSelector(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const dischargeTypeStatus = useAppSelector(
    (state) => state.types.discharges.getAll.status ?? "IDLE"
  );
  const admissionStatus = useAppSelector(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useAppSelector((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getDischarges.status ?? ""
    )
  );
  const wardStatus = useAppSelector(
    (state) => state.wards.allWards.status ?? "IDLE"
  );
  const sexLabels = [t("common.male"), t("common.female")];
  const ageTypeLabels = ageTypes.map((e) =>
    t(`patient.agetypes.${e.code ?? ""}`)
  );
  const dischargeTypeLabels = dischargeTypes.map((e) => e.description ?? "");
  const wardLabels = wards.map((e) => e.description ?? "");
  const dataBySex = {
    labels: sexLabels,
    datasets: [
      {
        data: [
          discharges.filter((e) => e.patient?.sex === "M").length,
          discharges.filter((e) => e.patient?.sex === "F").length,
        ],
        borderJoinStyle: "bevel",
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
        hoverOffset: 4,
      },
    ],
  };
  const dataByAgeType = {
    labels: ageTypeLabels,
    datasets: [
      {
        label: t("common.male"),
        data: ageTypes.map(
          (e) =>
            discharges.filter(
              (adm) =>
                adm.patient?.age &&
                adm.patient?.age >= (e.from ?? 0) &&
                adm.patient?.age <= (e.to ?? 0) &&
                adm.patient?.sex === "M"
            ).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: t("common.female"),
        data: ageTypes.map(
          (e) =>
            discharges.filter(
              (adm) =>
                adm.patient?.age &&
                adm.patient?.age >= (e.from ?? 0) &&
                adm.patient?.age <= (e.to ?? 0) &&
                adm.patient?.sex === "F"
            ).length
        ),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };
  const dataByDischargeType = {
    labels: dischargeTypeLabels,
    datasets: [
      {
        data: dischargeTypes.map(
          (e) => discharges.filter((adm) => adm.disType?.code === e.code).length
        ),
        backgroundColor: colorGen(dischargeTypes.length),
      },
    ],
  };
  const dataByWards = {
    labels: wardLabels,
    datasets: [
      {
        label: t("common.male"),
        data: wards.map(
          (e) =>
            discharges.filter(
              (adm) => adm.ward?.code === e.code && adm.patient?.sex === "M"
            ).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: t("common.female"),
        data: wards.map(
          (e) =>
            discharges.filter(
              (adm) => adm.ward?.code === e.code && adm.patient?.sex === "F"
            ).length
        ),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };

  return {
    ageTypeStatus,
    admissionStatus,
    wardStatus,
    dischargeTypeStatus,
    dataByDischargeType,
    dataByAgeType,
    dataBySex,
    dataByWards,
    success,
    total: discharges.length,
  };
};
