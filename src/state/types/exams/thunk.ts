import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExamTypesApi, ExamTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new ExamTypesApi(customConfiguration());

export const getExamTypes = createAsyncThunk(
  "examTypes/getExamTypes",
  async (_, thunkApi) =>
    api
      .getExamTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createExamType = createAsyncThunk(
  "examTypes/createExamType",
  async (examTypeDTO: ExamTypeDTO, thunkApi) =>
    api
      .newExamType({ examTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateExamType = createAsyncThunk(
  "examTypes/updateExamType",
  async (payload: { code: string; examTypeDTO: ExamTypeDTO }, thunkApi) =>
    api
      .updateExamType(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteExamType = createAsyncThunk(
  "examTypes/deleteExamType",
  async (code: string, thunkApi) =>
    api
      .deleteExamType({ code })
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
