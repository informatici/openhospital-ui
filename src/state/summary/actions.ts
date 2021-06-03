import { Dispatch } from "redux";
import { concat } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import {
  Configuration,
  ExaminationControllerApi,
  LoginResponse,
  OpdControllerApi,
  TherapyControllerApi,
  UserProfileDTO,
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

    concat(
      therapyControllerApi.getTherapyRowsUsingGET({ codePatient: code }).pipe(),
      opdControllerrApi.getOpdByPatientUsingGET({ pcode: code }).pipe(),
      visitsControllerApi.getVisitUsingGET({ patID: code }),
      examinationControllerApi.getByPatientIdUsingGET({ patId: code })
    )
      .pipe(toArray())
      .subscribe(
        ([summaryData, me]) => {
          dispatch({
            type: GET_SUMMARY_SUCCESS,
            payload: summaryData,
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
