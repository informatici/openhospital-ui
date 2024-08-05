import { useTranslation } from "react-i18next";
import { useAppSelector } from "libraries/hooks/redux";
import { AdmissionDTO, AdmissionTypeDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { colorGen } from "../../uiUtils/colorGenerator";

export const useDisByDisTypeData = () => {
  const { t } = useTranslation();
  const admissions = useAppSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getDischarges.data?.data ?? []
  );
  const dischargeTypes = useAppSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.types.discharges.getAll.data ?? []
  );
  const dischargeTypeStatus = useAppSelector(
    (state) => state.types.discharges.getAll.status ?? "IDLE"
  );
  const status = useAppSelector(
    (state) => state.admissions.getDischarges.status ?? "IDLE"
  );
  const success = useAppSelector((state) =>
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
