import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

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
        state.groupList = ApiResponse.loading();
      })
      .addCase(thunks.getUserGroups.fulfilled, (state, action) => {
        state.groupList = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getUserGroups.rejected, (state, action) => {
        state.groupList = ApiResponse.error(action.payload);
      })
      // Create User Group
      .addCase(thunks.createUserGroup.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createUserGroup.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createUserGroup.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update User Group
      .addCase(thunks.updateUserGroup.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateUserGroup.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateUserGroup.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete User Group
      .addCase(thunks.deleteUserGroup.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteUserGroup.fulfilled, (state) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteUserGroup.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createUserGroupReset,
  updateUserGroupReset,
  deleteUserGroupReset,
} = userGroupSlice.actions;
