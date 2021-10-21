export const initialFilter = {
  fromDate: new Date().setDate(new Date().getDate() - 6).toString(),
  toDate: new Date().getTime().toString(),
  patientCode: 0,
  status: "ALL",
};
