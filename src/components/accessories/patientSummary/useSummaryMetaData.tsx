import { useTranslation } from "react-i18next";

const useSummaryMetaData = () => {
  const { t } = useTranslation();
  const labels = {
    date: t("common.date"),
    visitDate: t("opd.date"),
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
    pex_date: t("examination.datetriage"),
    pex_height: t("examination.height"),
    pex_weight: t("examination.weight"),
    pex_ap_max: t("examination.ap.max"),
    pex_ap_min: t("examination.ap.min"),
    pex_temp: t("examination.temperature"),
    pex_sat: t("examination.saturation"),
    pex_diuresis: t("examination.diuresisvolume24h"),
    pex_rr: t("examination.respiratoryrate"),
    pex_hr: t("examination.heartrate"),
    pex_hgt: t("examination.hgt"),
    pex_diuresis_desc: t("examination.diuresis"),
    pex_bowel_desc: t("examination.bowel"),
    pex_auscultation: t("examination.auscultation"),
    pex_note: t("examination.note"),
    exam: t("lab.exam"),
    material: t("lab.material"),
    result: t("lab.result"),
    startDate: t("therapy.startDate"),
    endDate: t("therapy.endDate"),
    qty: t("therapy.quantity"),
    freqInDay: t("therapy.frequencyInDay"),
    freqInPeriod: t("therapy.frequencyInPeriod"),
    note: t("therapy.note"),
    medicalId: t("therapy.medical"),
    service: t("visit.service"),
    duration: t("visit.duration"),
  };
  const dateFields = [
    "date",
    //"date",
    "admDate",
    "disDate",
    "opDate",
    "visitDate",
    "pex_date",
    "startDate",
    "endDate",
  ];
  const header = {
    date: ["date", "type"],
    type: {
      opd: ["date", "disease"],
      triage: ["date", "pex_temp"],
      exam: ["date", "exam"],
      admission: ["date", "diseaseIn"],
      operation: ["date", "operation"],
      therapy: ["date", "medicalId"],
      visit: ["date", "duration"],
    },
  };

  const order = ["date", "type"];

  return { labels, dateFields, header, order };
};

export default useSummaryMetaData;
