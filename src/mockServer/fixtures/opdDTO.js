import { diseaseDTO } from "./diseaseDTO";
import patientDTO from "./patientDTO";

const opdDTO = {
  code: Math.floor(Math.random() * 100 + 1),
  date: "1627831184000",
  visitDate: "1627831184000",
  nextVisitDate: "1627831184000",
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
