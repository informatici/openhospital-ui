import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import moment from "moment";
import { firstValueFrom } from "rxjs";
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
      return firstValueFrom(
        wrapper(() => api.getPatient({ code: parseInt(payload.values.id) }))
      )
        .then((result) => (result ? [result] : []))
        .catch((error) => thunkApi.rejectWithValue(error.response));
    }
    return firstValueFrom(
      wrapper(() =>
        api.searchPatient({
          ...payload.values,
          birthDate: moment(payload.values.birthDate).isValid()
            ? payload.values.birthDate
            : undefined,
          page: payload.page,
          size: payload.size,
        })
      )
    ).catch((error) => thunkApi.rejectWithValue(error.response));
  }
);

export const getCities = createAsyncThunk(
  "patients/getCities",
  async (_, thunkApi) =>
    firstValueFrom(wrapper(() => api.getPatientCities())).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);

export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async ({ page, size }: { page?: number; size?: number }, thunkApi) =>
    firstValueFrom(
      wrapper(() =>
        api.getPatients({
          page: page ?? 0,
          size: size ?? 80,
        })
      )
    ).catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPatient = createAsyncThunk(
  "patients/getPatient",
  async (id: string, thunkApi) =>
    firstValueFrom(wrapper(() => api.getPatient({ code: parseInt(id) }))).catch(
      (error) => thunkApi.rejectWithValue(error.response)
    )
);

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (patientDTO: PatientDTO, thunkApi) =>
    firstValueFrom(wrapper(() => api.newPatient({ patientDTO }))).catch(
      (error) => thunkApi.rejectWithValue(error.response)
    )
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (payload: UpdatePatientRequest, thunkApi) =>
    firstValueFrom(wrapper(() => api.updatePatient(payload))).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);

export const getEthnics = createAsyncThunk(
  "patients/GET_ETHNIICS",
  async (_, thunkApi) =>
    firstValueFrom(wrapper(() => api.getPatientEthnics())).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);

export const getCommunes = createAsyncThunk(
  "patients/GET_COMMUNES",
  async (_, thunkApi) =>
    firstValueFrom(wrapper(() => api.getPatientCommunes())).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);
