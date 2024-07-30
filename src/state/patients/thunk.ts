import { createAsyncThunk } from "@reduxjs/toolkit";
import { PatientDTO, PatientsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import moment from "moment";
import { TValues } from "../../components/activities/searchPatientActivity/types";

const api = new PatientsApi(customConfiguration());

export const searchPatient = createAsyncThunk(
  "patients/searchPatient",
  async (values: TValues, thunkApi) => {
    if (values.id) {
      return api
        .getPatient({ code: parseInt(values.id) })
        .toPromise()
        .then((result) => [result])
        .catch((error) => thunkApi.rejectWithValue(error.response));
    }
    return api
      .searchPatient({
        ...values,
        birthDate: moment(values.birthDate).isValid()
          ? values.birthDate
          : undefined,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response));
  }
);

export const getCities = createAsyncThunk(
  "patients/getCities",
  async (_, thunkApi) =>
    api
      .getPatientCities()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async ({ page, size }: { page?: number; size?: number }, thunkApi) =>
    api
      .getPatients({
        page: page ?? 0,
        size: size ?? 80,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPatient = createAsyncThunk(
  "patients/getPatient",
  async (id: string, thunkApi) =>
    api
      .getPatient({ code: parseInt(id) })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (patientDTO: PatientDTO, thunkApi) =>
    api
      .newPatient({ patientDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (payload: { code: number; patientDTO: PatientDTO }, thunkApi) =>
    api
      .updatePatient(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
