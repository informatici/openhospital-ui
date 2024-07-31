import { useTranslation } from "react-i18next";
import { useSelector } from "libraries/hooks/redux";
import { AgeTypeDTO, OpdDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useOpdByAgeTypeData = () => {
  const { t } = useTranslation();
  const opds = useSelector<IState, OpdDTO[]>(
    (state) => state.opds.searchOpds.data?.data ?? []
  );
  const ageTypes = useSelector<IState, AgeTypeDTO[]>(
    (state) => state.ageTypes.getAllAgeTypes.data ?? []
  );
  const ageTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.ageTypes.getAllAgeTypes.status ?? "IDLE"
  );
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.opds.searchOpds.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(state.opds.searchOpds.status ?? "")
  );
  const labels = ageTypes.map((e) => t(`patient.agetypes.${e.code ?? ""}`));
  const data = {
    labels: labels,
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

  const csvData = [
    ...ageTypes.map((e) => ({
      [t("patient.agetype")]: t(`patient.agetypes.${e.code ?? ""}`),
      [t("common.male")]: opds.filter(
        (opd) => opd.ageType === e.code && opd.sex === "M"
      ).length,
      [t("common.female")]: opds.filter(
        (opd) => opd.ageType === e.code && opd.sex === "F"
      ).length,
    })),
  ];

  return {
    ageTypeStatus,
    status,
    data,
    csvData,
    success,
    total: opds.length,
    opds,
  };
};
