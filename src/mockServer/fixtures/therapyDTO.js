import patientDTO from "./patientDTO";

const therapyDTO = {
    therapyID: Math.floor(Math.random() * 100 + 1),
    patID: patientDTO,
    startDate: "1627657080000",
    endDate: "1629040784000",
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