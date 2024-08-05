import { useTranslation } from "react-i18next";
import { useAppSelector } from "libraries/hooks/redux";
import { AdmissionDTO, AdmissionTypeDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { colorGen } from "../../uiUtils/colorGenerator";

export const useAdmByAdmTypeData = () => {
  const { t } = useTranslation();
  const admissions = useAppSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getAdmissions.data?.data ?? []
  );
  const admissionTypes = useAppSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.types.admissions.getAll.data ?? []
  );
  const admissionTypeStatus = useAppSelector(
    (state) => state.types.admissions.getAll.status ?? "IDLE"
  );
  const status = useAppSelector(
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
  const labels = admissionTypes.map((e) => e.description ?? "");
  const data = {
    labels: labels,
    datasets: [
      {
        data: admissionTypes.map(
          (e) => admissions.filter((adm) => adm.admType?.code === e.code).length
        ),
        backgroundColor: colorGen(admissionTypes.length),
      },
    ],
  };

  const csvData = [
    ...admissionTypes.map((e) => ({
      [t("admission.admtype")]: e.description ?? "",
      [t("common.male")]: admissions.filter(
        (adm) => adm.admType?.code === e.code && adm.patient?.sex === "M"
      ).length,
      [t("common.female")]: admissions.filter(
        (adm) => adm.admType?.code === e.code && adm.patient?.sex === "F"
      ).length,
    })),
  ];

  return {
    status,
    admissionTypeStatus,
    data,
    csvData,
    success,
    total: admissions.length,
  };
};
