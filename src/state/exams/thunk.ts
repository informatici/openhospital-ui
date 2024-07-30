import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExamRowsApi, ExamsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new ExamsApi(customConfiguration());

const examRowsApi = new ExamRowsApi(customConfiguration());

export const getExams = createAsyncThunk(
  "exams/getExams",
  async (_, thunkApi) =>
    api
      .getExams()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getExamRows = createAsyncThunk(
  "exams/getExamRows",
  async (examCode: string, thunkApi) =>
    examRowsApi
      .getExamRowsByExamCode({ examCode })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
