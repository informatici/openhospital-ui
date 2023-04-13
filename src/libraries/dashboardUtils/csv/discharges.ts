import { AdmissionDTO } from "../../../generated";

export const dischargeDataCsv = (data: AdmissionDTO[]) => {
  return data.map((e) => ({
    Id: e.id,
    "Patient Code": e.patient?.code,
    Patient: `${e.patient?.firstName} ${e.patient?.secondName}`,
    Age: e.patient?.age,
    "Age Type": e.patient?.agetype,
    "Admission Date": e.admDate,
    "Disease In": e.diseaseIn?.description ?? "",
    "Admission Type": e.admType?.description ?? "",
    "Discharge Type": e.disType?.description ?? "",
    "Discharge Date": e.disDate,
    "Disease Out 1": e.diseaseOut1?.description ?? "",
    "Disease Out 2": e.diseaseOut2?.description ?? "",
    "Disease Out 3": e.diseaseOut3?.description ?? "",
  }));
};
