import patientDTO from "./patientDTO";

const visitDTO = {
    visitID: Math.floor(Math.random() * 100 + 1),
    patient: patientDTO,
    date: "2021-03-19T14:58:00.000Z",
    note: "last visit",
    sms: true
}
export default visitDTO;