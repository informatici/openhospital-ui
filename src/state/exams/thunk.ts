import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExamDTO, ExamRowsApi, ExamsApi, UpdateExamsRequest } from "../../generated";
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

export const createExam = createAsyncThunk(
  "exams/createExam",
  async (examDTO: ExamDTO, thunkApi) =>
    api
      .newExam({ examDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateExam = createAsyncThunk(
  "exams/updateExam",
  async (payload: UpdateExamsRequest, thunkApi) =>
    api
      .updateExams(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteExam = createAsyncThunk(
  "exams/deleteExam",
  async (code: string, thunkApi) =>
    api
      .deleteExam1({code})
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
