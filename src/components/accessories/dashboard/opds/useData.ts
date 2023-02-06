import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AgeTypeDTO, OpdDTO } from "../../../../generated";
import { TAPIResponseStatus } from "../../../../state/types";
import { IState } from "../../../../types";

export const useData = () => {
  const { t } = useTranslation();
  const opds = useSelector<IState, OpdDTO[]>(
    (state) => state.opds.searchOpds.data ?? []
  );
  const ageTypes = useSelector<IState, AgeTypeDTO[]>(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const opdStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.opds.searchOpds.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
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
  };
};
