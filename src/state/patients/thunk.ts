import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import moment from "moment";
import { TValues } from "../../components/activities/searchPatientActivity/types";
import { PatientDTO, PatientsApi, UpdatePatientRequest } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new PatientsApi(customConfiguration());

export const searchPatient = createAsyncThunk(
  "patients/searchPatient",
  async (values: TValues, thunkApi) => {
    if (values.id) {
      return wrapper(() => api.getPatient({ code: parseInt(values.id) }))
        .toPromise()
        .then((result) => (result ? [result] : []))
        .catch((error) => thunkApi.rejectWithValue(error.response));
    }
    return wrapper(() =>
      api.searchPatient({
        ...values,
        birthDate: moment(values.birthDate).isValid()
          ? values.birthDate
          : undefined,
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
