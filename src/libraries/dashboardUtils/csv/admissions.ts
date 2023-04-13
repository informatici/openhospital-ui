import { AdmissionDTO } from "../../../generated";

export const admissionDataCsv = (data: AdmissionDTO[]) => {
  return data.map((e) => ({
    Id: e.id,
    "Patient Code": e.patient?.code,
    Patient: `${e.patient?.firstName} ${e.patient?.secondName}`,
    Age: e.patient?.age,
    "Age Type": e.patient?.agetype,
    "Admission Date": e.admDate,
    "Disease In": e.diseaseIn?.description ?? "",
    "Admission Type": e.admType?.description ?? "",
  }));
};
