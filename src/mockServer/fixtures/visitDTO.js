import patientDTO from "./patientDTO";

const visitDTO = {
    visitID: Math.floor(Math.random() * 100 + 1),
    patient: patientDTO,
    date: "1616165880000",
    note: "last visit",
    sms: true
}
export default visitDTO;