import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { EncounterApi, EncounterDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { Param } from "./param";

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
