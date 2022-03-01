export const GET_SUMMARY_LOADING = "summary/GET_SUMMARY_LOADING";
export const GET_SUMMARY_SUCCESS = "summary/GET_SUMMARY_SUCCESS";
export const GET_SUMMARY_FAIL = "summary/GET_SUMMARY_FAIL";

export const SummaryField = {
  therapy: {
    type: "THERAPY",
    dateField: "startDate",
  },
  opd: {
    type: "OPD",
    dateField: "date",
  },
  exam: {
    type: "EXAM",
    dateField: "date",
  },
  triage: {
    type: "TRIAGE",
    dateField: "pex_date",
  },
  visit: {
    type: "VISIT",
    dateField: "date",
  },
};
