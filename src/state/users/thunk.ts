import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { GetUserRequest, UserDTO, UsersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new UsersApi(customConfiguration());

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (payload: GetUserRequest, thunkApi) =>
    wrapper(() => api.getUser(payload))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (username: string, thunkApi) =>
    wrapper(() => api.getUserByName({ username }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userDTO: UserDTO, thunkApi) =>
    wrapper(() => api.newUser({ userDTO }))
      .toPromise()
      .then(() => userDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userDTO: UserDTO, thunkApi) =>
    wrapper(() => api.updateUser({ username: userDTO.userName, userDTO }))
      .toPromise()
      .then(() => userDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (username: string, thunkApi) =>
    wrapper(() => api.deleteUser({ username }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
