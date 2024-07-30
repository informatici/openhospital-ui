import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdmissionTypeDTO, AdmissionTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new AdmissionTypesApi(customConfiguration());

export const getAdmissionTypes = createAsyncThunk(
  "admissionTypes/getAdmissionTypes",
  async (_, thunkApi) =>
    api
      .getAdmissionTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createAdmissionType = createAsyncThunk(
  "admissionTypes/createAdmissionType",
  async (admissionTypeDTO: AdmissionTypeDTO, thunkApi) =>
    api
      .newAdmissionType({ admissionTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateAdmissionType = createAsyncThunk(
  "admissionTypes/updateAdmissionType",
  async (admissionTypeDTO: AdmissionTypeDTO, thunkApi) =>
    api
      .updateAdmissionTypes({ admissionTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteAdmissionType = createAsyncThunk(
  "admissionTypes/deleteAdmissionType",
  async (code: string, thunkApi) =>
    api
      .deleteAdmissionType({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
