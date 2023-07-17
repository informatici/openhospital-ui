import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AdmissionDTO, AdmissionTypeDTO } from "../../../generated";
import { TAPIResponseStatus } from "../../../state/types";
import { IState } from "../../../types";
import { colorGen } from "../../uiUtils/colorGenerator";

export const useAdmByAdmTypeData = () => {
  const { t } = useTranslation();
  const admissions = useSelector<IState, AdmissionDTO[]>(
    (state) => state.admissions.getAdmissions.data?.data ?? []
  );
  const admissionTypes = useSelector<IState, AdmissionTypeDTO[]>(
    (state) => state.admissionTypes.allAdmissionTypes.data ?? []
  );
  const admissionTypeStatus = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissionTypes.allAdmissionTypes.status ?? "IDLE"
  );
  const status = useSelector<IState, TAPIResponseStatus>(
    (state) => state.admissions.getAdmissions.status ?? "IDLE"
  );
  const success = useSelector<IState, boolean>((state) =>
    ["SUCCESS", "SUCCESS_EMPTY"].includes(
      state.admissions.getAdmissions.status ?? ""
    )
  );
  const wardStatus = useSelector<IState, TAPIResponseStatus>(
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
