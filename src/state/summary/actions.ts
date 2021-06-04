import { Dispatch } from "redux";
import { of, concat } from "rxjs";
import { map, catchError, toArray } from "rxjs/operators";
import {
  Configuration,
  ExaminationControllerApi,
  OpdControllerApi,
  TherapyControllerApi,
  VisitsControllerApi,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { convertToSummaryData } from "../../libraries/reduxUtils/convert";
import { IAction } from "../types";
import {
  GET_SUMMARY_FAIL,
  GET_SUMMARY_LOADING,
  GET_SUMMARY_SUCCESS,
  SummaryField,
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
        opdControllerrApi.getOpdByPatientUsingGET({ pcode: code }).pipe(
          catchError((err) => of([])),
          map((res) => convertToSummaryData(res, SummaryField.opd))
        ),
        therapyControllerApi.getTherapyRowsUsingGET({ codePatient: code }).pipe(
          catchError((err) => of([])),
          map((res) => convertToSummaryData(res, SummaryField.therapy))
        ),
        visitsControllerApi.getVisitUsingGET({ patID: code }).pipe(
          catchError((err) => of([])),
          map((res) => convertToSummaryData(res, SummaryField.visit))
        ),
        examinationControllerApi.getByPatientIdUsingGET({ patId: code }).pipe(
          catchError((err) => of([])),
          map((res) => convertToSummaryData(res, SummaryField.triage))
        )
      )
        .pipe(toArray())
        .subscribe(
          ([opds, therapies, visits, triages]) => {
            dispatch({
              type: GET_SUMMARY_SUCCESS,
              payload: opds.concat(therapies, visits, triages),
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
