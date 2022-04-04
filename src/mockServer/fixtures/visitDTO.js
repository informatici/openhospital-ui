import patientDTO from "./patientDTO";
import { wards } from "./wardDTO";

const visitDTO = {
    visitID: Math.floor(Math.random() * 100 + 1),
    patient: patientDTO,
    ward: wards[2],
    duration: 30,
    service: "Simple service",
    date: "2021-03-19T14:58:00.000Z"
}
export default visitDTO;