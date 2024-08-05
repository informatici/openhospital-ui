import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateVisitRequest, VisitApi, VisitDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new VisitApi(customConfiguration());

export const getVisits = createAsyncThunk(
  "visits/getVisits",
  async (patientCode: number, thunkApi) =>
    api
      .getVisit({
        patID: patientCode,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createVisit = createAsyncThunk(
  "visits/createVisit",
  async (visitDTO: VisitDTO, thunkApi) =>
    api
      .newVisit({ visitDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateVisit = createAsyncThunk(
  "visits/updateVisit",
  async (payload: UpdateVisitRequest, thunkApi) =>
    api
      .updateVisit(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteVisit = createAsyncThunk(
  "visits/deleteVisit",
  async (patientCode: number, thunkApi) =>
    api
      .deleteVisitsRelatedToPatient({ patID: patientCode })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
