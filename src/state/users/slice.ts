import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.userList.status = "LOADING";
      })
      .addCase(thunks.getUsers.fulfilled, (state, action) => {
        state.userList.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.userList.data = action.payload;
      })
      .addCase(thunks.getUsers.rejected, (state, action) => {
        state.userList.status = "FAIL";
        state.userList.error = action.payload;
      })
      // Create User
      .addCase(thunks.createUser.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createUser.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createUser.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update User
      .addCase(thunks.updateUser.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateUser.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateUser.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete User
      .addCase(thunks.deleteUser.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteUser.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteUser.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const { createUserReset, updateUserReset, deleteUserReset } =
  userSlice.actions;
