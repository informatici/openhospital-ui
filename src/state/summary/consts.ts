export const GET_SUMMARY_LOADING = "summary/GET_SUMMARY_LOADING";
export const GET_SUMMARY_SUCCESS = "summary/GET_SUMMARY_SUCCESS";
export const GET_SUMMARY_FAIL = "summary/GET_SUMMARY_FAIL";

export const SummaryField = {
  admission: {
    type: "ADMISSION",
    dateField: "admDate",
  },
  operation: {
    type: "OPERATION",
    dateField: "opDate",
  },
  opd: {
    type: "OPD",
    dateField: "visitDate",
  },
  exam: {
    type: "EXAM",
    dateField: "examDate",
  },
  triage: {
    type: "TRIAGE",
    dateField: "pex_date",
  },
  visit: {
    type: "VISIT",
    dateField: "date",
  },
  therapy: {
    type: "THERAPY",
    dateField: "startDate",
  },
};
