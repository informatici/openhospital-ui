import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PregnantTreatmentTypesApi,
  PregnantTreatmentTypeDTO,
} from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new PregnantTreatmentTypesApi(customConfiguration());

export const getPregnantTreatmentTypes = createAsyncThunk(
  "pregnantTreatmentTypes/getPregnantTreatmentTypes",
  async (_, thunkApi) =>
    api
      .getPregnantTreatmentTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createPregnantTreatmentType = createAsyncThunk(
  "pregnantTreatmentTypes/createPregnantTreatmentType",
  async (pregnantTreatmentTypeDTO: PregnantTreatmentTypeDTO, thunkApi) =>
    api
      .newPregnantTreatmentType({ pregnantTreatmentTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updatePregnantTreatmentType = createAsyncThunk(
  "pregnantTreatmentTypes/updatePregnantTreatmentType",
  async (
    payload: {
      code: string;
      pregnantTreatmentTypeDTO: PregnantTreatmentTypeDTO;
    },
    thunkApi
  ) =>
    api
      .updatePregnantTreatmentTypes(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deletePregnantTreatmentType = createAsyncThunk(
  "pregnantTreatmentTypes/deletePregnantTreatmentType",
  async (code: string, thunkApi) =>
    api
      .deletePregnantTreatmentType({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
