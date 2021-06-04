export const GET_SUMMARY_LOADING = "summary/GET_SUMMARY_LOADING";
export const GET_SUMMARY_SUCCESS = "summary/GET_SUMMARY_SUCCESS";
export const GET_SUMMARY_FAIL = "summary/GET_SUMMARY_FAIL";

export const SummaryField = {
  therapy: {
    type: "therapy",
    dateField: "startDate",
    noteField: "note",
  },
  opd: {
    type: "opd",
    dateField: "date",
    noteField: "note",
  },
  triage: {
    type: "triage",
    dateField: "pex_date",
    noteField: "pex_note",
  },
  visit: {
    type: "visit",
    dateField: "date",
  },
};
