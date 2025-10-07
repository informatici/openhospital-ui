import { createAsyncThunk } from "@reduxjs/toolkit";
import { StockMovementsApi, MedicalsApi } from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";

const api = new StockMovementsApi(customConfiguration());
const medicalApi = new MedicalsApi(customConfiguration());

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

export const getMedicals = createAsyncThunk(
    "pharmacy/getMedicals",
    async (_, thunkApi) => {
      try {
        const result = await firstValueFrom(wrapper(() => medicalApi.getMedicals({})));
        return result;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.response);
      }
    }
  );

  export const getMedicalsMov = createAsyncThunk(
    "pharmacy/getMedicalsMov",
    async (_, thunkApi) => {
      try {
        const result = await firstValueFrom(wrapper(() => medicalApi.getMedicalsMov()));
        return result;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.response);
      }
    }
  );

