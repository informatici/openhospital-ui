import { OpdDTO } from "../../../generated";

export const opdDataCsv = (data: OpdDTO[]) => {
  return data.map((e) => ({
    Code: e.code,
    "Patient Code": e.patientCode,
    Patient: e.patientName,
    Age: e.age,
    "Age Type": e.ageType,
    Date: e.date,
    "Next Visit Date": e.nextVisitDate,
    "Desease 1": e.disease?.description ?? "",
    "Desease 2": e.disease2?.description ?? "",
    "Desease 3": e.disease3?.description ?? "",
  }));
};
