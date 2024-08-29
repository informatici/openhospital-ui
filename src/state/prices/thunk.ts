import { createAsyncThunk } from "@reduxjs/toolkit";
import { PriceListDTO, PriceListsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new PriceListsApi(customConfiguration());

export const getPrices = createAsyncThunk(
  "prices/getPrices",
  async (_, thunkApi) =>
    api
      .getPrices()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPriceLists = createAsyncThunk(
  "prices/getPriceLists",
  async (_, thunkApi) =>
    api
      .getPriceLists()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createPriceList = createAsyncThunk(
  "prices/createPriceList",
  async (priceListDTO: PriceListDTO, thunkApi) =>
    api
      .newPriceList({ priceListDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updatePriceList = createAsyncThunk(
  "prices/updatePriceList",
  async (payload: { id: number; priceListDTO: PriceListDTO }, thunkApi) =>
    api
      .updatePriceLists(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deletePriceList = createAsyncThunk(
  "prices/deletePriceList",
  async (id: number, thunkApi) =>
    api
      .deletePriceList({ id })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
