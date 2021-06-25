import patientDTO from "./patientDTO";

const therapyDTO = {
    therapyID: Math.floor(Math.random() * 100 + 1),
    patID: patientDTO,
    startDate: "2020-07-16",
    endDate: "2020-07-30",
    medicalId: Math.floor(Math.random() * 100 + 1),
    qty: 48,
    unitID: 1,
    freqInDay: 2,
    freqInPeriod: 1,
    note: "Sample note",
    notifyInt: 0,
    smsInt: 0
}
export default therapyDTO;