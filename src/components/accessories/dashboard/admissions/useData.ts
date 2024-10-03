import { useAppSelector } from "libraries/hooks/redux";
import { useTranslation } from "react-i18next";
import { colorGen } from "../../../../libraries/uiUtils/colorGenerator";

export const useData = () => {
  const { t } = useTranslation();
  const admissions = useAppSelector(
    (state) => state.admissions.getAdmissions.data?.data ?? []
  );
  const wards = useAppSelector((state) => state.wards.allWards.data ?? []);
  const admissionTypes = useAppSelector(
    (state) => state.types.admissions.getAll.data ?? []
  );
  const ageTypes = useAppSelector(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useAppSelector(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const admissionTypeStatus = useAppSelector(
    (state) => state.types.admissions.getAll.status ?? "IDLE"
  );
  const admissionStatus = useAppSelector(
    (state) => state.admissions.getAdmissions.status ?? "IDLE"
  );
  const success = useAppSelector((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getAdmissions.status ?? ""
    )
  );
  const wardStatus = useAppSelector(
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
        backgroundColor: colorGen(admissionTypes.length),
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
