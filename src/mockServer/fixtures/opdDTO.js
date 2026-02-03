import { diseasesDTO } from "./diseasesDTO";
import patientDTO from "./patientDTO";
import { wards } from "./wardDTO";

const opdDTO = {
  code: Math.floor(Math.random() * 100 + 1),
  date: "2021-08-01T15:19:44.000Z",
  nextVisitDate: "2021-08-01T15:19:44.000Z",
  patientCode: patientDTO.code,
  patientName: "Antonio Carlos",
  age: 18,
  sex: "M",
  note: "out patient consultation",
  prog_year: 18,
  disease: diseasesDTO[0],
  disease2: diseasesDTO[1],
  disease3: diseasesDTO[0],
  ward: wards[0],
  newPatient: "N",
  referralFrom: "R",
  referralTo: "R",
  ageType: "d0",
  lock: 0,
  userID: "admin",
  prescription: "Paracetamol 500mg tablets - 1 box",
};

export default opdDTO;
