import { diseaseDTO } from "./diseaseDTO";
import patientDTO from "./patientDTO";

const opdDTO = {
  code: Math.floor(Math.random() * 100 + 1),
  date: "2021-06-02T15:19:44.911Z",
  visitDate: "2021-06-02T15:19:44.911Z",
  nextVisitDate: "2021-06-02T15:19:44.911Z",
  patientCode: patientDTO.code,
  age: 18,
  sex: "M",
  note: "out patient consultation",
  prog_year: 18,
  disease: diseaseDTO,
  disease2: diseaseDTO,
  disease3: diseaseDTO,
  newPatient: "N",
  referralFrom: "R",
  referralTo: "R",
  lock: 0,
  userID: "admin",
};

export default opdDTO;
