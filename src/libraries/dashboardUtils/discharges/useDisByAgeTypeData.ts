import { useTranslation } from "react-i18next";
import { useSelector } from "@/libraries/hooks/redux";
import { AdmissionDTO, AgeTypeDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useDisByAgeTypeData = () => {
  const { t } = useTranslation();
  const admissions = useSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getDischarges.data?.data ?? []
  );
  const ageTypes = useSelector<IState, AgeTypeDTO[]>(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getDischarges.status ?? ""
    )
  );
  const labels = ageTypes.map((e) => t(`patient.agetypes.${e.code ?? ""}`));
  const data = {
    labels: labels,
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

  const csvData = [
    ...ageTypes.map((e) => ({
      [t("patient.agetype")]: t(`patient.agetypes.${e.code ?? ""}`),
      [t("common.male")]: admissions.filter(
        (adm) =>
          adm.patient?.age &&
          adm.patient?.age >= (e.from ?? 0) &&
          adm.patient?.age <= (e.to ?? 0) &&
          adm.patient?.sex === "M"
      ).length,
      [t("common.female")]: admissions.filter(
        (adm) =>
          adm.patient?.age &&
          adm.patient?.age >= (e.from ?? 0) &&
          adm.patient?.age <= (e.to ?? 0) &&
          adm.patient?.sex === "F"
      ).length,
    })),
  ];

  return {
    ageTypeStatus,
    status,
    data,
    csvData,
    success,
    total: admissions.length,
  };
};
