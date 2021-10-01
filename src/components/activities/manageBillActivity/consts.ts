export const initialFilter = {
  fromDate: new Date().setDate(new Date().getDate() - 6).toString(),
  toDate: new Date().setHours(23).toString(),
  patientCode: 0,
};
