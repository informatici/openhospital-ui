import { createAsyncThunk } from "@reduxjs/toolkit";
import { StockMovementsApi } from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";

const api = new StockMovementsApi(customConfiguration());

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
