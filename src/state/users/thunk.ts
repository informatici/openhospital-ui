import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUserRequest, UserDTO, UsersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new UsersApi(customConfiguration());

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (payload: GetUserRequest, thunkApi) =>
    api
      .getUser(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userDTO: UserDTO, thunkApi) =>
    api
      .newUser({ userDTO })
      .toPromise()
      .then(() => userDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userDTO: UserDTO, thunkApi) =>
    api
      .updateUser({ userDTO })
      .toPromise()
      .then(() => userDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (username: string, thunkApi) =>
    api
      .deleteUser({ username })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
