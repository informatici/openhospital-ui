import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { ExamTypeDTO, ExamTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new ExamTypesApi(customConfiguration());

export const getExamTypes = createAsyncThunk(
  "examTypes/getExamTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getExamTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createExamType = createAsyncThunk(
  "examTypes/createExamType",
  async (examTypeDTO: ExamTypeDTO, thunkApi) =>
    wrapper(() => api.newExamType({ examTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateExamType = createAsyncThunk(
  "examTypes/updateExamType",
  async (payload: { code: string; examTypeDTO: ExamTypeDTO }, thunkApi) =>
    wrapper(() => api.updateExamType(payload))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteExamType = createAsyncThunk(
  "examTypes/deleteExamType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteExamType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
