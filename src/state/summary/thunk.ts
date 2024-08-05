import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AdmissionsApi,
  ExaminationsApi,
  LaboratoriesApi,
  OpdsApi,
  OperationsApi,
  TherapiesApi,
  VisitApi,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { of, concat } from "rxjs";
import { catchError, map, toArray } from "rxjs/operators";
import { convertToSummaryData } from "../../libraries/reduxUtils/convert";
import { SummaryField } from "./consts";

const therapiesApi = new TherapiesApi(customConfiguration());

const operationsApi = new OperationsApi(customConfiguration());
const admissionsApi = new AdmissionsApi(customConfiguration());
const opdControllerrApi = new OpdsApi(customConfiguration());
const visitControllerrApi = new VisitApi(customConfiguration());

const examinationsApi = new ExaminationsApi(customConfiguration());

const laboratoriesApi = new LaboratoriesApi(customConfiguration());

export const loadSummaryData = createAsyncThunk(
  "summary/loadSummaryData",
  async (code: number, thunkApi) =>
    concat(
      examinationsApi.getByPatientId({ patId: code }).pipe(
        map((res) => convertToSummaryData(res, SummaryField.triage)),
        catchError(() => of([]))
      ),
      opdControllerrApi.getOpdByPatient({ pcode: code }).pipe(
        map((res) =>
          convertToSummaryData(
            res.map((e) => e.opdDTO),
            SummaryField.opd
          )
        ),
        catchError(() => of([]))
      ),
      laboratoriesApi.getLaboratory1({ patId: code }).pipe(
        map((res) =>
          convertToSummaryData(
            res.map((e) => e.laboratoryDTO),
            SummaryField.exam
          )
        ),
        catchError(() => of([]))
      ),
      admissionsApi.getAdmissions1({ patientCode: code }).pipe(
        map((res) => convertToSummaryData(res, SummaryField.admission)),
        catchError(() => of([]))
      ),
      visitControllerrApi.getVisit({ patID: code }).pipe(
        map((res) => convertToSummaryData(res, SummaryField.visit)),
        catchError(() => of([]))
      ),
      operationsApi.getOperationRowsByPatient({ patientCode: code }).pipe(
        map((res) => convertToSummaryData(res, SummaryField.operation)),
        catchError(() => of([]))
      ),
      therapiesApi.getTherapyRows({ codePatient: code }).pipe(
        map((res) => convertToSummaryData(res, SummaryField.therapy)),
        catchError(() => of([]))
      )
    )
      .pipe(toArray())
      .toPromise()
      .then(
        ([triages, opds, exams, admissions, visits, operations, therapies]) => [
          ...triages,
          ...opds,
          ...exams,
          ...admissions,
          ...visits,
          ...operations,
          ...therapies,
        ]
      )
      .catch((error) => thunkApi.rejectWithValue(error))
);
