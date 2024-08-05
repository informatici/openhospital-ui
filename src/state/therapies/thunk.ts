import { createAsyncThunk } from "@reduxjs/toolkit";
import { TherapyDTO, TherapiesApi, TherapyRowDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new TherapiesApi(customConfiguration());

export const getTherapiesByPatientId = createAsyncThunk(
  "therapies/getTherapiesByPatientId",
  async (codePatient: number | undefined, thunkApi) =>
    api
      .getTherapyRows({ codePatient: codePatient ?? -1 })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createTherapy = createAsyncThunk(
  "therapies/createTherapy",
  async (therapyRowDTO: TherapyRowDTO, thunkApi) =>
    api
      .newTherapy({ therapyRowDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateTherapy = createAsyncThunk(
  "therapies/updateTherapy",
  async (therapyRowDTO: TherapyRowDTO, thunkApi) =>
    api
      .replaceTherapies({ therapyRowDTO: [therapyRowDTO] })
      .toPromise()
      .then(() => therapyRowDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteTherapy = createAsyncThunk(
  "therapies/deleteTherapy",
  async (code: number | undefined, thunkApi) =>
    thunkApi.rejectWithValue({
      message: "Delete feature not yet available!!!",
    })
);
