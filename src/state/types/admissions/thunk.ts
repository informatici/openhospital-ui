import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { AdmissionTypeDTO, AdmissionTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new AdmissionTypesApi(customConfiguration());

export const getAdmissionTypes = createAsyncThunk(
  "admissionTypes/getAdmissionTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getAdmissionTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createAdmissionType = createAsyncThunk(
  "admissionTypes/createAdmissionType",
  async (admissionTypeDTO: AdmissionTypeDTO, thunkApi) =>
    wrapper(() => api.newAdmissionType({ admissionTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateAdmissionType = createAsyncThunk(
  "admissionTypes/updateAdmissionType",
  async (admissionTypeDTO: AdmissionTypeDTO, thunkApi) =>
    wrapper(() => api.updateAdmissionTypes({ admissionTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteAdmissionType = createAsyncThunk(
  "admissionTypes/deleteAdmissionType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteAdmissionType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
