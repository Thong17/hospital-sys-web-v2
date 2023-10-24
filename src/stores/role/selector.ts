import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectRoleCreate = createSelector(
    (state: RootState) => state.role.create,
    (state) => state
)

export const selectRoleList = createSelector(
    (state: RootState) => state.role.list,
    (state) => state
)

export const selectRoleForm = createSelector(
    (state: RootState) => state.role.form,
    (state) => state
)

export const selectRoleDetail = createSelector(
    (state: RootState) => state.role.detail,
    (state) => state
)
