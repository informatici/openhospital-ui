import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { Param } from "./param";
import { EncounterApi, EncounterDTO } from "generated";

const api = new EncounterApi(customConfiguration());

export const createEncounter = createAsyncThunk(
  "encounter/CREATE_ENCOUNTER",
  async (encounterDTO: EncounterDTO, thunkApi) =>
    wrapper(() => api.createEncounter({ encounterDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateEncounter = createAsyncThunk(
  "encounter/UPDATE_ENCOUNTER",
  async ({ code, body }: Param, thunkApi) =>
    wrapper(() => api.updateEncounter({ code: code, encounterDTO: body }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getCurrentEncounterByPatient = createAsyncThunk(
  "encounter/GET_CURRENT_ENCOUNTER",
  async (patientId: number, thunkApi) =>
    wrapper(() => api.getCurrentEncounterByPatient({ patientId }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getEncountersByPatient = createAsyncThunk(
  "encounters/GET_ENCOUNTER_BY_PATIENT",
  async (patientId: number, thunkApi) =>
    wrapper(() => api.getEncountersByPatient({ patientId }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getEncounterAdmissions = createAsyncThunk(
  "encounters/GET_ENCOUNTER_ADMISSIONS",
  async (payload: { code: string }, thunkApi) =>
    firstValueFrom(wrapper(() => api.getAdmissionsByEncounter(payload))).catch(
      (error) => thunkApi.rejectWithValue(error.response)
    )
);

export const getEncounterLaboratoryExams = createAsyncThunk(
  "encounters/GET_ENCOUNTER_LABORATORY_EXAMS",
  async (payload: { code: string }, thunkApi) =>
    firstValueFrom(wrapper(() => api.getLaboratoryByEncounter(payload))).catch(
      (error) => thunkApi.rejectWithValue(error.response)
    )
);

export const getEncounterExamRequests = createAsyncThunk(
  "encounters/GET_ENCOUNTER_EXAM_REQUESTS",
  async (payload: { code: string }, thunkApi) =>
    firstValueFrom(wrapper(() => api.getLaboratoryExamRequestByEncounter(payload))).catch(
      (error) => thunkApi.rejectWithValue(error.response)
    )
);

