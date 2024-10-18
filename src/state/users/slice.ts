import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

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
    getUserByIdReset: (state) => {
      state.getById = initial.getById;
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
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getUsers.rejected, (state, action) => {
        state.userList = ApiResponse.error(action.payload);
      })
      // Get User by id
      .addCase(thunks.getUserById.pending, (state) => {
        state.getById = ApiResponse.loading();
      })
      .addCase(thunks.getUserById.fulfilled, (state, action) => {
        state.getById = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getUserById.rejected, (state, action) => {
        state.getById = ApiResponse.error(action.payload);
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
