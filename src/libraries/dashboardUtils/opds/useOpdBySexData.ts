import { useTranslation } from "react-i18next";
import { useAppSelector } from "libraries/hooks/redux";
import { AgeTypeDTO, OpdDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";

export const useOpdBySexData = () => {
  const { t } = useTranslation();
  const opds = useAppSelector(
    (state) => state.opds.searchOpds.data?.data ?? []
  );
  const status = useAppSelector(
    (state) => state.opds.searchOpds.status ?? "IDLE"
  );
  const success = useAppSelector((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(state.opds.searchOpds.status ?? "")
  );
  const labels = [t("common.male"), t("common.female")];
  const data = {
    labels: labels,
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

  const csvData = [
    { [t("common.male")]: opds.filter((e) => e.sex === "M").length },
    { [t("common.female")]: opds.filter((e) => e.sex === "F").length },
  ];

  return {
    status,
    data,
    csvData,
    success,
    total: opds.length,
    opds,
  };
};
