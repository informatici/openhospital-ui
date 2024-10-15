import { useAppSelector } from "libraries/hooks/redux";
import { useTranslation } from "react-i18next";

export const useData = () => {
  const { t } = useTranslation();
  const opds = useAppSelector(
    (state) => state.opds.searchOpds.data?.data ?? []
  );
  const ageTypes = useAppSelector(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useAppSelector(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const opdStatus = useAppSelector(
    (state) => state.opds.searchOpds.status ?? "IDLE"
  );
  const success = useAppSelector((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(state.opds.searchOpds.status ?? "")
  );
  const sexLabels = [t("common.male"), t("common.female")];
  const ageTypeLabels = ageTypes.map((e) =>
    t(`patient.agetypes.${e.code ?? ""}`)
  );
  const dataBySex = {
    labels: sexLabels,
    datasets: [
      {
        data: [
          opds.filter((e) => e.sex === "M").length,
          opds.filter((e) => e.sex === "F").length,
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
        label: t("opd.male"),
        data: ageTypes.map(
          (e) =>
            opds.filter((opd) => opd.ageType === e.code && opd.sex === "M")
              .length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: t("opd.female"),
        data: ageTypes.map(
          (e) =>
            opds.filter((opd) => opd.ageType === e.code && opd.sex === "F")
              .length
        ),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };

  return {
    ageTypeStatus,
    opdStatus,
    dataByAgeType,
    dataBySex,
    success,
    total: opds.length,
    opds,
  };
};
