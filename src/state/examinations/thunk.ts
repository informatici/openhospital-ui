import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import {
  ExaminationsApi,
  PatientExaminationDTO,
  ReportsApi,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new ExaminationsApi(customConfiguration());

const apiReport = new ReportsApi(customConfiguration());

export const examinationsByPatientId = createAsyncThunk(
  "examinations/examinationsByPatientId",
  async (patId: number | undefined, thunkApi) =>
    wrapper(() => api.getByPatientId({ patId: patId ?? -1 }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getDefaultPatientExamination = createAsyncThunk(
  "examinations/getDefaultPatientExamination",
  async (patId: number, thunkApi) =>
    wrapper(() => api.getDefaultPatientExamination({ patId }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getLastByPatientId = createAsyncThunk(
  "examinations/getLastByPatientId",
  async (patId: number, thunkApi) =>
    wrapper(() => api.getLastByPatientId({ patId }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createExamination = createAsyncThunk(
  "examinations/createExamination",
  async (patientExaminationDTO: PatientExaminationDTO, thunkApi) =>
    wrapper(() => api.newPatientExamination({ patientExaminationDTO }))
      .toPromise()
      .then((result) => result)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateExamination = createAsyncThunk(
  "examinations/updateExamination",
  async (
    payload: { id: number; patientExaminationDTO: PatientExaminationDTO },
    thunkApi
  ) =>
    wrapper(() => api.updateExamination(payload))
      .toPromise()
      .then((result) => result)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteExamination = createAsyncThunk(
  "examinations/deleteExamination",
  async (id: number, thunkApi) =>
    thunkApi.rejectWithValue({ message: "Delete api not yet available !!!" })
);

export const printExamination = createAsyncThunk(
  "reports/patientexamination",
  async (examinationId: number | undefined, thunkApi) =>
    wrapper(() =>
      apiReport.printExaminationListPdf({ examinationId: examinationId ?? -1 })
    )
      .toPromise()
      .then((response) => response)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
