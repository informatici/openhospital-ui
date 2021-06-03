import { Dispatch } from "redux";
import { concat } from "rxjs";
import { toArray } from "rxjs/operators";
import {
  Configuration,
  ExaminationControllerApi,
  OpdControllerApi,
  TherapyControllerApi,
  VisitsControllerApi,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_SUMMARY_FAIL,
  GET_SUMMARY_LOADING,
  GET_SUMMARY_SUCCESS,
} from "./consts";

const therapyControllerApi = new TherapyControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);
const opdControllerrApi = new OpdControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);
const visitsControllerApi = new VisitsControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

const examinationControllerApi = new ExaminationControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const loadSummaryData =
  (code: number) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_SUMMARY_LOADING,
    });
    if (code)
      concat(
        opdControllerrApi.getOpdByPatientUsingGET({ pcode: code }).pipe(),
        therapyControllerApi.getTherapyRowsUsingGET({ codePatient: code }),
        visitsControllerApi.getVisitUsingGET({ patID: code }),
        examinationControllerApi.getByPatientIdUsingGET({ patId: code })
      )
        .pipe(toArray())
        .subscribe(
          ([opds, therapies, visits, triages]) => {
            dispatch({
              type: GET_SUMMARY_SUCCESS,
              payload: convert(opds, therapies, visits, triages),
            });
          },
          (error) => {
            dispatch({
              type: GET_SUMMARY_FAIL,
              error,
            });
          }
        );
  };

const convert = (
  opds: Array<any>,
  therapies: Array<any>,
  visits: Array<any>,
  triages: Array<any>
) => {
  return opds
    .map(({ ...rest }) => ({
      type: "opd",
      ...rest,
    }))
    .concat(
      therapies.map(({ startDate: date, ...rest }) => ({
        type: "therapy",
        date,
        ...rest,
      })),

      visits.map(({ ...rest }) => ({
        type: "visits",
        ...rest,
      })),

      triages.map(({ pex_date: date, ...rest }) => ({
        type: "triages",
        date,
        ...rest,
      }))
    );
};
