import patientDTO from "./patientDTO";

const therapyDTO = {
    therapyID: Math.floor(Math.random() * 100 + 1),
    patID: patientDTO,
    startDate: "2021-07-06T14:58:00.000Z",
    endDate: "2021-07-30T14:58:00.000Z",
    medicalId: 16,
    qty: 48,
    unitID: 1,
    freqInDay: 2,
    freqInPeriod: 1,
    note: "Sample note",
    notifyInt: 0,
    smsInt: 0
}
export default therapyDTO;