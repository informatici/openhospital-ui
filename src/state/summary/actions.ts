import { Dispatch } from "redux";
import { concat, of } from "rxjs";
import { catchError, map, toArray } from "rxjs/operators";
import { AdmissionsApi } from "../../generated/apis/AdmissionsApi";
import { ExaminationsApi } from "../../generated/apis/ExaminationsApi";
import { LaboratoriesApi } from "../../generated/apis/LaboratoriesApi";
import { OpdsApi } from "../../generated/apis/OpdsApi";
import { OperationsApi } from "../../generated/apis/OperationsApi";
import { TherapiesApi } from "../../generated/apis/TherapiesApi";
import { VisitApi } from "../../generated/apis/VisitApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { convertToSummaryData } from "../../libraries/reduxUtils/convert";
import { IAction } from "../types";
import {
  GET_SUMMARY_FAIL,
  GET_SUMMARY_LOADING,
  GET_SUMMARY_SUCCESS,
  SummaryField,
} from "./consts";

const therapiesApi = new TherapiesApi(customConfiguration());

const operationsApi = new OperationsApi(customConfiguration());
const admissionsApi = new AdmissionsApi(customConfiguration());
const opdControllerrApi = new OpdsApi(customConfiguration());
const visitControllerrApi = new VisitApi(customConfiguration());

const examinationsApi = new ExaminationsApi(customConfiguration());

const laboratoriesApi = new LaboratoriesApi(customConfiguration());

export const loadSummaryData =
  (code: number) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_SUMMARY_LOADING,
    });
    if (code)
      concat(
        examinationsApi.getByPatientId({ patId: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.triage)),
          catchError((err) => of([]))
        ),
        opdControllerrApi.getOpdByPatient({ pcode: code }).pipe(
          map((res) =>
            convertToSummaryData(
              res.map((e) => e.opdDTO),
              SummaryField.opd
            )
          ),
          catchError((err) => of([]))
        ),
        laboratoriesApi.getLaboratory1({ patId: code }).pipe(
          map((res) =>
            convertToSummaryData(
              res.map((e) => e.laboratoryDTO),
              SummaryField.exam
            )
          ),
          catchError((err) => of([]))
        ),
        admissionsApi.getAdmissions1({ patientCode: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.admission)),
          catchError((err) => of([]))
        ),
        visitControllerrApi.getVisit({ patID: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.visit)),
          catchError((err) => of([]))
        ),
        operationsApi.getOperationRowsByPatient({ patientCode: code }).pipe(
          map((res) => convertToSummaryData(res, SummaryField.operation)),
          catchError((err) => of([]))
        ),
        therapiesApi.getTherapyRows({ codePatient: code }).pipe(
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
