import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetMovementWardRequest,
  MedicalStockMovementTypeApi,
  MedicalStockWardApi,
  NewMultipleChargingMovementsRequest,
  StockMovementsApi,
} from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";

const api = new StockMovementsApi(customConfiguration());
const movementTypeApi = new MedicalStockMovementTypeApi(customConfiguration());
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

export const getMovementTypes = createAsyncThunk(
  "pharmacy/movementTypes",
  async (_, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => movementTypeApi.getMedicalDsrStockMovementType())
      );
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
            from: payload.to ?? new Date("2010-12-25T10:30:00Z"),
            to: payload.from ?? new Date(),
          } as any as GetMovementWardRequest)
        )
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getWardMedicals = createAsyncThunk(
  "pharmacy/getWardMedicals",
  async ({ wardCode }: { wardCode: string }, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() =>
          wardStockApi.getMedicalsWard({
            wardCode,
          })
        )
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const chargeMovements = createAsyncThunk(
  "pharmacy/chargeMovements",
  async (payload: NewMultipleChargingMovementsRequest, thunkApi) => {
    try {
      const result = await firstValueFrom(
        wrapper(() => api.newMultipleChargingMovements(payload))
      );
      return result;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
