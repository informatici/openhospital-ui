import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const userGroupSlice = createSlice({
  name: "userGroups",
  initialState: initial,
  reducers: {
    createUserGroupReset: (state) => {
      state.create = initial.create;
    },
    updateUserGroupReset: (state) => {
      state.update = initial.update;
    },
    deleteUserGroupReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get User Groups
      .addCase(thunks.getUserGroups.pending, (state) => {
        state.groupList.status = "LOADING";
      })
      .addCase(thunks.getUserGroups.fulfilled, (state, action) => {
        state.groupList.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.groupList.data = action.payload;
      })
      .addCase(thunks.getUserGroups.rejected, (state, action) => {
        state.groupList.status = "FAIL";
        state.groupList.error = action.payload;
      })
      // Create User Group
      .addCase(thunks.createUserGroup.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createUserGroup.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createUserGroup.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update User Group
      .addCase(thunks.updateUserGroup.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateUserGroup.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateUserGroup.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete User Group
      .addCase(thunks.deleteUserGroup.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteUserGroup.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteUserGroup.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createUserGroupReset,
  updateUserGroupReset,
  deleteUserGroupReset,
} = userGroupSlice.actions;
