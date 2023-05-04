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
  const admissions = useSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getAdmissions.data ?? []
  );
  const wards = useSelector<IState, WardDTO[]>(
    (state) => state.wards.allWards.data ?? []
  );
  const admissionTypes = useSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.admissionTypes.allAdmissionTypes.data ?? []
  );
  const ageTypes = useSelector<IState, AgeTypeDTO[]>(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const admissionTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissionTypes.allAdmissionTypes.status ?? "IDLE"
  );
  const admissionStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissions.getAdmissions.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getAdmissions.status ?? ""
    )
  );
  const wardStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.wards.allWards.status ?? "IDLE"
  );
  const sexLabels = [t("common.male"), t("common.female")];
  const ageTypeLabels = ageTypes.map((e) =>
    t(`patient.agetypes.${e.code ?? ""}`)
  );
  const admissionTypeLabels = admissionTypes.map((e) => e.description ?? "");
  const wardLabels = wards.map((e) => e.description ?? "");
  const dataBySex = {
    labels: sexLabels,
    datasets: [
      {
        data: [
          admissions.filter((e) => e.patient?.sex === "M").length,
          admissions.filter((e) => e.patient?.sex === "F").length,
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
            admissions.filter(
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
            admissions.filter(
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
  const dataByAdmissionType = {
    labels: admissionTypeLabels,
    datasets: [
      {
        data: admissionTypes.map(
          (e) => admissions.filter((adm) => adm.admType?.code === e.code).length
        ),
        backgroundColor: admissionTypes.map((e, index) =>
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
            admissions.filter(
              (adm) => adm.ward?.code === e.code && adm.patient?.sex === "M"
            ).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: t("common.female"),
        data: wards.map(
          (e) =>
            admissions.filter(
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
    admissionTypeStatus,
    dataByAdmissionType,
    dataByAgeType,
    dataBySex,
    dataByWards,
    success,
    total: admissions.length,
  };
};
