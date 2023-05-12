import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  AdmissionDTO,
  WardDTO,
  AdmissionTypeDTO,
  AgeTypeDTO,
} from "../../../../generated";
import { generateColor } from "../../../../libraries/uiUtils/colorGenerator";
import { TAPIResponseStatus } from "../../../../state/types";
import { IState } from "../../../../types";

export const useData = () => {
  const { t } = useTranslation();
  const discharges = useSelector<IState, AdmissionDTO[]>(
    (state) =>
      state.admissions.getDischarges.data?.filter(
        (e) => e?.disDate !== undefined
      ) ?? []
  );
  const wards = useSelector<IState, WardDTO[]>(
    (state) => state.wards.allWards.data ?? []
  );
  const dischargeTypes = useSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.dischargeTypes.allDischargeTypes.data ?? []
  );
  const ageTypes = useSelector<IState, AgeTypeDTO[]>(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const dischargeTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.dischargeTypes.allDischargeTypes.status ?? "IDLE"
  );
  const admissionStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getDischarges.status ?? ""
    )
  );
  const wardStatus = useSelector<IState, TAPIResponseStatus>(
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
                adm.patient?.agetype === e.code && adm.patient?.sex === "M"
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
                adm.patient?.agetype === e.code && adm.patient?.sex === "F"
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
        backgroundColor: dischargeTypes.map((e, index) =>
          generateColor({ red: 255 })
        ),
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
