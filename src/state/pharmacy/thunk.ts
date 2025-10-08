import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetMovementWardRequest,
  MedicalStockWardApi,
  StockMovementsApi,
} from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";

const api = new StockMovementsApi(customConfiguration());
const wardStockApi = new MedicalStockWardApi(customConfiguration());

export const getMovements = createAsyncThunk(
  "pharmacy/getMovements",
  async (_, thunkApi) => {
    try {
      const result = await firstValueFrom(wrapper(() => api.getMovements()));
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getWardMovements = createAsyncThunk(
  "pharmacy/getWardMovements",
  async (payload: { wardCode: string; from?: Date; to?: Date }, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() =>
          wardStockApi.getMovementWard({
            ...payload,
            to: payload.to ?? new Date("2010-12-25T10:30:00Z"),
            from: payload.from ?? new Date(),
          } as any as GetMovementWardRequest)
        )
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
