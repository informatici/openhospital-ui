import { Dispatch } from "redux";
import { concat, of } from "rxjs";
import { catchError, map, toArray } from "rxjs/operators";
import {
  AdmissionControllerApi,
  ExaminationControllerApi,
  LaboratoryControllerApi,
  OpdControllerApi,
  OperationControllerApi,
  TherapyControllerApi,
  VisitsControllerApi,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { convertToSummaryData } from "../../libraries/reduxUtils/convert";
import { IAction } from "../types";
import {
  GET_SUMMARY_FAIL,
  GET_SUMMARY_LOADING,
  GET_SUMMARY_SUCCESS,
  SummaryField,
} from "./consts";

const therapyControllerApi = new TherapyControllerApi(customConfiguration());

const operationControllerApi = new OperationControllerApi(
  customConfiguration()
);
const admissionControllerApi = new AdmissionControllerApi(
  customConfiguration()
);
const opdControllerrApi = new OpdControllerApi(customConfiguration());
const visitControllerrApi = new VisitsControllerApi(customConfiguration());

const examinationControllerApi = new ExaminationControllerApi(
  customConfiguration()
);

const laboratoryControllerApi = new LaboratoryControllerApi(
  customConfiguration()
);

export const loadSummaryData =
  (code: number) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_SUMMARY_LOADING,
    });
    if (code)
      concat(
        examinationControllerApi.getByPatientIdUsingGET({ patId: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.triage)),
          catchError((err) => of([]))
        ),
        opdControllerrApi.getOpdByPatientUsingGET({ pcode: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.opd)),
          catchError((err) => of([]))
        ),
        laboratoryControllerApi.getLaboratoryUsingGET({ patId: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.exam)),
          catchError((err) => of([]))
        ),
        admissionControllerApi
          .getAdmissionsUsingGET({ patientcode: code })
          .pipe(
            map((res) => convertToSummaryData(res, SummaryField.admission)),
            catchError((err) => of([]))
          ),
        visitControllerrApi.getVisitUsingGET({ patID: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.visit)),
          catchError((err) => of([]))
        ),
        operationControllerApi
          .getOperationRowsByPatientUsingGET({ patientCode: code })
          .pipe(
            map((res) => convertToSummaryData(res, SummaryField.operation)),
            catchError((err) => of([]))
          ),
        therapyControllerApi.getTherapyRowsUsingGET({ codePatient: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.therapy)),
          catchError((err) => of([]))
        )
      )
        .pipe(toArray())
        .subscribe(
          ([
            triages,
            opds,
            exams,
            admissions,
            visits,
            operations,
            therapies,
          ]) => {
            dispatch({
              type: GET_SUMMARY_SUCCESS,
              payload: [
                ...triages,
                ...opds,
                ...exams,
                ...admissions,
                ...visits,
                ...operations,
                ...therapies,
              ],
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
