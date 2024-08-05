import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OpdDTO,
  OpdWithOperationRowDTO,
  OpdsApi,
  UpdateOpdWithOperationRowRequest,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { isEmpty } from "lodash";
import moment from "moment";

const api = new OpdsApi(customConfiguration());

export const getOpds = createAsyncThunk(
  "opds/getOpds",
  async (patientCode: number | undefined, thunkApi) =>
    api
      .getOpdByPatient({
        pcode: patientCode ?? -1,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getOpdsWithOperationRows = createAsyncThunk(
  "opds/getOpdsWithOperationRows",
  async (patientCode: number | undefined, thunkApi) =>
    api
      .getOpdByPatient({
        pcode: patientCode ?? -1,
      })
      .toPromise()
      .then((result) =>
        result.map((item) =>
          item.opdDTO ? item : ({ opdDTO: item } as OpdWithOperationRowDTO)
        )
      )
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const searchOpds = createAsyncThunk(
  "opds/searchOpds",
  async (query: any, thunkApi) =>
    api
      .getOpdByDates({
        sex: isEmpty(query.sex) ? null : query.sex,
        newPatient: isEmpty(query.newPatient) ? null : query.newPatient,
        dateFrom: query.dateFrom ?? moment().add("-30", "days").toISOString(),
        dateTo: query.dateTo ?? moment().toISOString(),
        ageFrom: isNaN(query.ageFrom) ? null : query.ageFrom,
        ageTo: isNaN(query.ageTo) ? null : query.ageTo,
        diseaseCode: isEmpty(query.diseaseCode) ? null : query.diseaseCode,
        diseaseTypeCode: isEmpty(query.diseaseTypeCode)
          ? null
          : query.diseaseTypeCode,
        patientCode: isNaN(query.patientCode) ? null : query.patientCode,
        wardCode: isEmpty(query.wardCode) ? null : query.wardCode,
        paged: !!query.paged,
        page: isNaN(query.page) ? 0 : query.page,
        size: isNaN(query.size) ? 80 : query.size,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getLastOpd = createAsyncThunk(
  "opds/getLastOpd",
  async (patientCode: number | undefined, thunkApi) =>
    api
      .getLastOpd({
        patientCode: patientCode ?? -1,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createOpd = createAsyncThunk(
  "opds/createOpd",
  async (opdDTO: OpdDTO, thunkApi) =>
    api
      .newOpd({ opdDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createOpdWithOperationsRow = createAsyncThunk(
  "opds/createOpdWithOperationsRow",
  async (opdWithOperationRowDTO: OpdWithOperationRowDTO, thunkApi) =>
    api
      .newOpdWithOperationRow({ opdWithOperationRowDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

/**
 *
 * @param payload The update operation payload
 * @returns
 * @deprecated
 */
export const updateOpd = createAsyncThunk(
  "opds/updateOpd",
  async (payload: { code: number; opdDTO: OpdDTO }, thunkApi) =>
    api
      .updateOpd(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateOpdWithOperationRow = createAsyncThunk(
  "opds/updateOpdWithOperationRow",
  async (payload: UpdateOpdWithOperationRowRequest, thunkApi) =>
    api
      .updateOpdWithOperationRow(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteOpd = createAsyncThunk(
  "opds/deleteOpd",
  async (code: number, thunkApi) =>
    api
      .deleteOpd({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
