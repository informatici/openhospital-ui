import { useTranslation } from "react-i18next";

const useSummaryLabel = () => {
  const { t } = useTranslation();
  const labels = {
    date: t("common.date"),
    type: t("common.type"),
    startDate: t("therapy.startDate"),
    endDate: t("therapy.endDate"),
    qty: t("therapy.quantity"),
    freqInDay: t("therapy.frequencyInDay"),
    freqInPeriod: t("therapy.frequencyInPeriod"),
    note: t("therapy.note"),
    medicalId: t("therapy.medical"),
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
  const dateFields = ["date", "startDate", "endDate"];
  const header = ["date"];
  const order = ["date"];

  return { labels, dateFields, header, order };
};

export default useSummaryLabel;
