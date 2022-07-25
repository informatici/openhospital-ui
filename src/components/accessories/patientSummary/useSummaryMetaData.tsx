import { useTranslation } from "react-i18next";

const useSummaryMetaData = () => {
  const { t } = useTranslation();
  const labels = {
    date: t("common.date"),
    type: t("common.type"),
    opDate: t("operation.opDate"),
    ward: t("admission.ward"),
    admDate: t("admission.admDate"),
    admType: t("admission.admType"),
    disType: t("admission.disType"),
    disDate: t("admission.disDate"),
    diseaseIn: t("admission.diseaseIn"),
    diseaseOut1: t("admission.diseaseOut1"),
    diseaseOut2: t("admission.diseaseOut2"),
    diseaseOut3: t("admission.diseaseOut3"),
    operation: t("operation.operation"),
    opResult: t("operation.opResult"),
    transUnits: t("operation.transUnits"),
    remarks: t("operation.remarks"),
    prescriber: t("operation.prescriber"),
    disease: t("opd.disease1"),
    disease2: t("opd.disease2"),
    disease3: t("opd.disease3"),
    pex_height: t("examination.height"),
    pex_weight: t("examination.weight"),
    pex_pa_max: t("examination.ap.max"),
    pex_pa_min: t("examination.ap.min"),
    pex_fc: t("examination.heartrate"),
    pex_temp: t("examination.temperature"),
    pex_sat: t("examination.saturation"),
    pex_note: t("examination.note"),
    exam: t("lab.exam"),
    material: t("lab.material"),
    result: t("lab.result"),
  };
  const dateFields = ["date", "examDate", "admDate", "disDate", "opDate"];
  const header = {
    date: ["date", "type"],
    type: {
      opd: ["date", "disease"],
      triage: ["date", "pex_temp"],
      exam: ["date", "exam"],
      admission: ["date", "diseaseIn"],
      operation: ["date", "operation"],
    },
  };

  const order = ["date", "type"];

  return { labels, dateFields, header, order };
};

export default useSummaryMetaData;
