import { useTranslation } from "react-i18next";
import { useSelector } from "@/libraries/hooks/redux";
import { AdmissionDTO, WardDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useDisByWardData = () => {
  const { t } = useTranslation();
  const admissions = useSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getDischarges.data?.data ?? []
  );
  const wards = useSelector<IState, WardDTO[]>(
    (state) => state.wards.allWards.data ?? []
  );
  const wardStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.wards.allWards.status ?? "IDLE"
  );
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getDischarges.status ?? ""
    )
  );
  const labels = wards.map((e) => e.description ?? "");
  const data = {
    labels: labels,
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

  const csvData = [
    ...wards.map((e) => ({
      [t("admission.ward")]: e.description ?? "",
      [t("common.male")]: admissions.filter(
        (adm) => adm.ward?.code === e.code && adm.patient?.sex === "M"
      ).length,
      [t("common.female")]: admissions.filter(
        (adm) => adm.ward?.code === e.code && adm.patient?.sex === "F"
      ).length,
    })),
  ];

  return {
    status,
    wardStatus,
    data,
    csvData,
    success,
    total: admissions.length,
  };
};
