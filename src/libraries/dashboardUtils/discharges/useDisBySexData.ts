import { useAppSelector } from "libraries/hooks/redux";
import { useTranslation } from "react-i18next";

export const useDisBySexData = () => {
  const { t } = useTranslation();
  const admissions = useAppSelector(
    (state) => state.admissions.getDischarges.data?.data ?? []
  );
  const status = useAppSelector(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useAppSelector((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getDischarges.status ?? ""
    )
  );
  const labels = [t("common.male"), t("common.female")];
  const data = {
    labels: labels,
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

  const csvData = [
    {
      [t("common.male")]: admissions.filter((e) => e.patient?.sex === "M")
        .length,
    },
    {
      [t("common.female")]: admissions.filter((e) => e.patient?.sex === "F")
        .length,
    },
  ];

  return {
    status,
    data,
    csvData,
    success,
    total: admissions.length,
  };
};
