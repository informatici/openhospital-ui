import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AdmissionDTO, AdmissionTypeDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { colorGen } from "../../uiUtils/colorGenerator";

export const useDisByDisTypeData = () => {
  const { t } = useTranslation();
  const admissions = useSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getDischarges.data?.data ?? []
  );
  const dischargeTypes = useSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.dischargeTypes.allDischargeTypes.data ?? []
  );
  const dischargeTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.dischargeTypes.allDischargeTypes.status ?? "IDLE"
  );
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getDischarges.status ?? ""
    )
  );
  const labels = dischargeTypes.map((e) => e.description ?? "");
  const data = {
    labels: labels,
    datasets: [
      {
        data: dischargeTypes.map(
          (e) => admissions.filter((adm) => adm.disType?.code === e.code).length
        ),
        backgroundColor: colorGen(dischargeTypes.length),
      },
    ],
  };

  const csvData = [
    ...dischargeTypes.map((e) => ({
      [t("admission.distype")]: e.description ?? "",
      [t("common.male")]: admissions.filter(
        (adm) => adm.disType?.code === e.code && adm.patient?.sex === "M"
      ).length,
      [t("common.female")]: admissions.filter(
        (adm) => adm.disType?.code === e.code && adm.patient?.sex === "F"
      ).length,
    })),
  ];

  return {
    status,
    dischargeTypeStatus,
    data,
    csvData,
    success,
    total: admissions.length,
  };
};
