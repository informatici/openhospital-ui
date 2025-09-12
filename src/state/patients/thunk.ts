import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import moment from "moment";
import { TValues } from "../../components/activities/searchPatientActivity/types";
import { PatientDTO, PatientsApi, UpdatePatientRequest } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new PatientsApi(customConfiguration());

export const searchPatient = createAsyncThunk(
  "patients/searchPatient",
  async (
    payload: { values: TValues; page?: number; size?: number },
    thunkApi
  ) => {
    if (payload.values.id) {
      return wrapper(() =>
        api.getPatient({ code: parseInt(payload.values.id) })
      )
        .toPromise()
        .then((result) => (result ? [result] : []))
        .catch((error) => thunkApi.rejectWithValue(error.response));
    }
    return wrapper(() =>
      api.searchPatient({
        ...payload.values,
        birthDate: moment(payload.values.birthDate).isValid()
          ? payload.values.birthDate
          : undefined,
        page: payload.page,
        size: payload.size,
      })
    )
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response));
  }
);

export const getCities = createAsyncThunk(
  "patients/getCities",
  async (_, thunkApi) =>
    wrapper(() => api.getPatientCities())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async ({ page, size }: { page?: number; size?: number }, thunkApi) =>
    wrapper(() =>
      api.getPatients({
        page: page ?? 0,
        size: size ?? 80,
      })
    )
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPatient = createAsyncThunk(
  "patients/getPatient",
  async (id: string, thunkApi) =>
    wrapper(() => api.getPatient({ code: parseInt(id) }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (patientDTO: PatientDTO, thunkApi) =>
    wrapper(() => api.newPatient({ patientDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (payload: UpdatePatientRequest, thunkApi) =>
    wrapper(() => api.updatePatient(payload))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
