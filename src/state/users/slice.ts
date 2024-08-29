import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const userSlice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {
    createUserReset: (state) => {
      state.create = initial.create;
    },
    updateUserReset: (state) => {
      state.update = initial.update;
    },
    deleteUserReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Users
      .addCase(thunks.getUsers.pending, (state) => {
        state.userList = ApiResponse.loading();
      })
      .addCase(thunks.getUsers.fulfilled, (state, action) => {
        state.userList = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getUsers.rejected, (state, action) => {
        state.userList = ApiResponse.error(action.payload);
      })
      // Create User
      .addCase(thunks.createUser.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createUser.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createUser.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update User
      .addCase(thunks.updateUser.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateUser.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateUser.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete User
      .addCase(thunks.deleteUser.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteUser.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteUser.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const { createUserReset, updateUserReset, deleteUserReset } =
  userSlice.actions;
